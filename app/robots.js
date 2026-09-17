import { headers } from 'next/headers';

export const PRODUCTION_HOST = 'efolusi.com';

/* Only the production host is indexable. dev.efolusi.com and any other host
   (previews, localhost) tell crawlers to stay out and never advertise the
   production sitemap. Decided per request from Host, since dev and prod run
   the same build. */
export function robotsFor(host) {
  const hostname = String(host || '').split(':')[0].toLowerCase();
  if (hostname === PRODUCTION_HOST) {
    return {
      rules: { userAgent: '*', allow: '/' },
      sitemap: `https://${PRODUCTION_HOST}/sitemap.xml`,
      host: `https://${PRODUCTION_HOST}`
    };
  }
  return { rules: { userAgent: '*', disallow: '/' } };
}

export default async function robots() {
  const h = await headers();
  return robotsFor(h.get('x-forwarded-host') || h.get('host'));
}
