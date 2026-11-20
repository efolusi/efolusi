import { NextResponse, type NextRequest } from 'next/server';

import { LOCALE_HEADER } from './app/_lib/locale-header.js';

/**
 * The language gateway.
 *
 * A visitor landing on `/` is sent to the language their location suggests:
 * Indonesia gets `/id`, everywhere else gets `/en`. Cloudflare resolves the
 * country at the edge and puts it in `cf-ipcountry`, so this costs no lookup
 * and no third-party call.
 *
 * A CHOICE ALWAYS BEATS A GUESS. Every visit to a language path writes
 * `lang`, and this handler reads that cookie first — so someone in Jakarta who
 * switched to English stays in English on their next visit, and the guess only
 * runs for people who have never expressed one.
 *
 * This lives in middleware rather than next.config's redirects because those
 * run BEFORE middleware and cannot see a header or a cookie.
 */

const LOCALES = ['en', 'id'] as const;
type Locale = (typeof LOCALES)[number];

const COOKIE = 'lang';
/** A year: long enough that the choice survives, short enough to lapse. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function externalOrigin(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;

  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error('EFOLUSI_EXTERNAL_ORIGIN must be an HTTPS origin without credentials, path, query, or fragment');
  }
  return url.origin;
}

/** Keep Cloudflare's request origin by default; native dev pins its public proxy origin. */
export function languageRedirectUrl(requestUrl: URL, configuredOrigin: string | undefined): URL {
  const origin = externalOrigin(configuredOrigin);
  if (!origin) return new URL(requestUrl.href);
  return new URL(`${requestUrl.pathname}${requestUrl.search}`, origin);
}

/**
 * The request headers a page render receives, with the locale it renders in.
 * app/global-not-found.js gets no params, so this is how an unknown URL's 404
 * learns its language. Any incoming value is overwritten, never trusted.
 */
export function withLocaleHeader(source: Headers, locale: Locale): Headers {
  const headers = new Headers(source);
  headers.set(LOCALE_HEADER, locale);
  return headers;
}

/** www.efolusi.com serves nothing of its own: every page moves to the apex. */
export function apexRedirectUrl(requestUrl: URL): URL | null {
  if (requestUrl.hostname !== 'www.efolusi.com') return null;
  // Change only the host. Joining the path onto a base would read "//host" as a new host.
  const url = new URL(requestUrl.href);
  url.protocol = 'https:';
  url.hostname = 'efolusi.com';
  url.port = '';
  return url;
}

/**
 * The page CSP, with a fresh nonce per request. Next reads the nonce from this
 * header on the request and puts it on its own scripts.
 *
 * No 'strict-dynamic': with it, browsers ignore the host list, and Cloudflare
 * injects its beacon as a parser-inserted <script> without a nonce, so the
 * beacon would be blocked. Next's chunks load from 'self'.
 */
export function contentSecurityPolicy(nonce: string, dev = process.env.NODE_ENV === 'development'): string {
  // Next's dev tooling needs eval for source maps; production stays strict.
  const scriptSrc = dev
    ? `'self' 'nonce-${nonce}' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' https://static.cloudflareinsights.com`;
  return `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://cloudflareinsights.com https://bsc-dataseed.bnbchain.org https://bsc-rpc.publicnode.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`;
}

function newNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

/** Request headers for the render: the nonce, the policy, and the locale when known. */
function renderHeaders(source: Headers, nonce: string, policy: string, locale?: Locale): Headers {
  const headers = locale ? withLocaleHeader(source, locale) : new Headers(source);
  headers.set('x-nonce', nonce);
  headers.set('Content-Security-Policy', policy);
  return headers;
}

function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'id';
}

export function middleware(request: NextRequest) {
  const apex = apexRedirectUrl(new URL(request.url));
  if (apex) return NextResponse.redirect(apex, 301);

  const nonce = newNonce();
  const policy = contentSecurityPolicy(nonce);
  const withPolicy = (response: NextResponse) => {
    response.headers.set('Content-Security-Policy', policy);
    return response;
  };

  const { pathname } = request.nextUrl;

  // Files and dotted paths take no locale. Public files are served before the
  // Worker runs, so what reaches here is the global 404 (/nope.php), which needs the policy.
  if (/^\/(favicon|robots|sitemap|efolusi\/)/.test(pathname) || /\.[^/]*$/.test(pathname)) {
    return withPolicy(NextResponse.next({ request: { headers: renderHeaders(request.headers, nonce, policy) } }));
  }

  // Remember the language the reader is actually in, including a manual switch.
  const onLocalePath = /^\/(en|id)(\/|$)/.exec(pathname);
  if (onLocalePath) {
    const current = onLocalePath[1] as Locale;
    const next = { request: { headers: renderHeaders(request.headers, nonce, policy, current) } };
    const response = withPolicy(NextResponse.next(next));
    if (request.cookies.get(COOKIE)?.value !== current) {
      response.cookies.set(COOKIE, current, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
      });
      // A shared cache must never store a response that sets a cookie.
      response.headers.set('Cache-Control', 'private, no-store');
    }
    return response;
  }

  const stored = request.cookies.get(COOKIE)?.value;
  const country = request.headers.get('cf-ipcountry');
  const locale: Locale = isLocale(stored) ? stored : country === 'ID' ? 'id' : 'en';

  // A page path outside both locales has no page. Render the branded 404 in
  // the reader's language (the URL stays as typed, the status stays 404).
  if (pathname !== '/') {
    // Same origin, path set on a copy: the Worker serves the rewrite itself.
    const target = request.nextUrl.clone();
    target.pathname = `/${locale}${pathname}`;
    return withPolicy(
      NextResponse.rewrite(target, {
        request: { headers: renderHeaders(request.headers, nonce, policy, locale) },
      }),
    );
  }

  const url = languageRedirectUrl(request.nextUrl, process.env.EFOLUSI_EXTERNAL_ORIGIN);
  url.pathname = `/${locale}`;
  // 307, not 308: the destination depends on who is asking, so it must never
  // be cached as a permanent fact about this URL.
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Every page and the global 404 need the CSP; built assets and API routes do not.
  matcher: ['/((?!_next/static|_next/image|api/).*)'],
};
