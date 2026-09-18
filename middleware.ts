import { NextResponse, type NextRequest } from 'next/server';

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
 * Where a same-server rewrite has to point.
 *
 * A rewrite whose origin differs from the one the server actually listens on
 * is an EXTERNAL rewrite to Next, and it will really go and fetch that URL.
 * Behind Cloudflare and nginx the forwarded proto makes `nextUrl` https while
 * this process listens on plain http, so the obvious `nextUrl.clone()` turns
 * every unknown path into a TLS handshake against an http port: EPROTO, and a
 * 500 where the branded 404 belongs.
 *
 * So: when a proxy tells us it terminated TLS, target http, because that is
 * what this process speaks. With no proxy in front, `nextUrl` is already the
 * real origin and is used as is.
 */
export function rewriteTarget(request: NextRequest, pathname: string): URL {
  const behindTlsProxy = request.headers.get('x-forwarded-proto') === 'https';
  const origin = behindTlsProxy ? `http://${request.nextUrl.host}` : request.nextUrl.origin;
  return new URL(`${pathname}${request.nextUrl.search}`, origin);
}

function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'id';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Remember the language the reader is actually in, including a manual switch.
  const onLocalePath = /^\/(en|id)(\/|$)/.exec(pathname);
  if (onLocalePath) {
    const current = onLocalePath[1] as Locale;
    if (request.cookies.get(COOKIE)?.value !== current) {
      const response = NextResponse.next();
      response.cookies.set(COOKIE, current, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
      });
      return response;
    }
    return NextResponse.next();
  }

  const stored = request.cookies.get(COOKIE)?.value;
  const country = request.headers.get('cf-ipcountry');
  const locale: Locale = isLocale(stored) ? stored : country === 'ID' ? 'id' : 'en';

  // A page path outside both locales has no page. Render the branded 404 in
  // the reader's language (the URL stays as typed, the status stays 404).
  if (pathname !== '/') {
    return NextResponse.rewrite(rewriteTarget(request, `/${locale}${pathname}`));
  }

  const url = languageRedirectUrl(request.nextUrl, process.env.EFOLUSI_EXTERNAL_ORIGIN);
  url.pathname = `/${locale}`;
  // 307, not 308: the destination depends on who is asking, so it must never
  // be cached as a permanent fact about this URL.
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Skip assets and API routes; only pages need a language.
  matcher: ['/((?!_next/|api/|favicon|robots|sitemap|efolusi/|.*\\.).*)'],
};
