import { createElement } from 'react';

/* Cloudflare Web Analytics, the only analytics on Efolusi pages (AGENTS.md):
   cookieless, no personal data. Cloudflare does not inject the beacon into a
   Worker's responses, so the page carries the snippet itself. One site covers
   efolusi.com and its subdomains. The token is public (it is in every page);
   until it is set, no beacon is sent. */
export const CF_ANALYTICS_TOKEN = '';

export function AnalyticsBeacon({ token = CF_ANALYTICS_TOKEN } = {}) {
  if (!/^[0-9a-f]{32}$/.test(token)) return null;
  return createElement('script', {
    defer: true,
    src: 'https://static.cloudflareinsights.com/beacon.min.js',
    'data-cf-beacon': JSON.stringify({ token }),
  });
}
