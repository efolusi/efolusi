import { describe, expect, it } from 'vitest';

import { robotsFor } from './robots.js';

describe('robots.txt by host', () => {
  it('keeps production indexable with its sitemap', () => {
    expect(robotsFor('efolusi.com')).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://efolusi.com/sitemap.xml',
      host: 'https://efolusi.com'
    });
  });

  it.each(['dev.efolusi.com', 'localhost:3000', 'www.efolusi.com.evil.test', '', undefined])(
    'disallows everything and advertises no sitemap on %s',
    (host) => {
      const robots = robotsFor(host);
      expect(robots.rules).toEqual({ userAgent: '*', disallow: '/' });
      expect(robots.sitemap).toBeUndefined();
      expect(robots.host).toBeUndefined();
    }
  );
});
