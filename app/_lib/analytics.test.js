import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { AnalyticsBeacon } from './analytics.js';

describe('Cloudflare Web Analytics beacon', () => {
  it('renders nothing without a site token', () => {
    expect(renderToStaticMarkup(AnalyticsBeacon({ token: '' }) ?? null)).toBe('');
  });

  it('loads the beacon from Cloudflare with the site token', () => {
    const html = renderToStaticMarkup(AnalyticsBeacon({ token: '0123456789abcdef0123456789abcdef' }));
    expect(html).toBe('<script defer="" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon="{&quot;token&quot;:&quot;0123456789abcdef0123456789abcdef&quot;}"></script>');
  });

  it('refuses anything but a 32-character hex token', () => {
    expect(renderToStaticMarkup(AnalyticsBeacon({ token: '"><script>' }) ?? null)).toBe('');
  });
});
