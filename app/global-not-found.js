import '@efolusi/meridian/styles.css';
import './globals.css';
import { cookies, headers } from 'next/headers';
import { defaultLocale, getDictionary, isLocale } from './dictionaries/config.js';
import NotFoundView from './components/NotFoundView.jsx';
import { LOCALE_HEADER } from './_lib/locale-header.js';
import { themeInit } from './_lib/theme-init.js';

/*
 * Every URL no page claims ends here, with a real 404 status.
 *
 * The root layout lives under the dynamic [lang] segment, so there is no
 * app/layout.js above it. Without this file Next answered unknown URLs with an
 * empty <html id="__next_error__"> shell that only filled in after JavaScript
 * ran. It needs experimental.globalNotFound in next.config.mjs.
 *
 * The locale comes from the header middleware sets (the /en or /id prefix, or
 * the language it would redirect an unprefixed path to). Paths middleware
 * skips, such as /nope.php, fall back to the lang cookie, then English.
 */
async function resolveLang() {
  const fromHeader = (await headers()).get(LOCALE_HEADER);
  if (isLocale(fromHeader)) return fromHeader;
  const fromCookie = (await cookies()).get('lang')?.value;
  return isLocale(fromCookie) ? fromCookie : defaultLocale;
}

export async function generateMetadata() {
  const lang = await resolveLang();
  return { title: getDictionary(lang).common.notFound.meta, robots: { index: false } };
}

export default async function GlobalNotFound() {
  const lang = await resolveLang();
  return (
    <html lang={getDictionary(lang).htmlLang} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <NotFoundView lang={lang} />
      </body>
    </html>
  );
}
