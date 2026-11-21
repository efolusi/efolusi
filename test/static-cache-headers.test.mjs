import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('static asset cache headers (EF07)', () => {
  const headers = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8');

  it('serves the content-hashed build files as immutable for a year', () => {
    expect(headers).toMatch(/^\/_next\/static\/\*\n\s+Cache-Control: public, max-age=31536000, immutable$/m);
  });

  it('does not touch pages or other paths', () => {
    const rules = headers.split('\n').filter((l) => l.startsWith('/'));
    expect(rules).toEqual(['/_next/static/*']);
  });
});
