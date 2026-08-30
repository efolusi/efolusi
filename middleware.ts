import { NextResponse, type NextRequest } from 'next/server';

/**
 * The language gateway.
 *
 * A visitor landing on `/` is sent to the language their location suggests:
 * Indonesia gets `/id`, everywhere else gets `/en`. When the Cloudflare DNS
 * proxy is enabled it supplies `cf-ipcountry`; otherwise the safe default is
 * English. Application execution stays on the native VPS in both cases.
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

/** Keep the request origin by default; native PM2 pins its public proxy origin. */
export function languageRedirectUrl(requestUrl: URL, configuredOrigin: string | undefined): URL {
  const origin = externalOrigin(configuredOrigin);
  if (!origin) return new URL(requestUrl.href);
  return new URL(`${requestUrl.pathname}${requestUrl.search}`, origin);
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

  if (pathname !== '/') return NextResponse.next();

  const stored = request.cookies.get(COOKIE)?.value;
  const country = request.headers.get('cf-ipcountry');
  const locale: Locale = isLocale(stored) ? stored : country === 'ID' ? 'id' : 'en';

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
