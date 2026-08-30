import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { languageRedirectUrl } from './middleware';

describe('language redirect external origin', () => {
  it('preserves the request origin when no override is configured', () => {
    const url = languageRedirectUrl(new URL('https://efolusi.com/?source=direct'), undefined);
    expect(url.href).toBe('https://efolusi.com/?source=direct');
  });

  it('uses the canonical HTTPS origin behind the native reverse proxy', () => {
    const url = languageRedirectUrl(
      new URL('http://localhost:13000/?source=proxy'),
      'https://dev-efolusi.efolusi.com',
    );
    expect(url.href).toBe('https://dev-efolusi.efolusi.com/?source=proxy');
  });

  it.each([
    'http://dev-efolusi.efolusi.com',
    'https://user@example.com',
    'https://dev-efolusi.efolusi.com/path',
    'https://dev-efolusi.efolusi.com/?query=1',
  ])('rejects an unsafe external origin: %s', (origin) => {
    expect(() => languageRedirectUrl(new URL('http://localhost:13000/'), origin)).toThrow(
      'EFOLUSI_EXTERNAL_ORIGIN must be an HTTPS origin',
    );
  });

  it('binds the canonical dev origin during build and in the PM2 runtime', () => {
    const workflow = readFileSync('.github/workflows/deploy-native-dev.yml', 'utf8');
    expect(workflow).toContain('EFOLUSI_EXTERNAL_ORIGIN: https://dev-efolusi.efolusi.com');
    expect(workflow).toContain('EFOLUSI_EXTERNAL_ORIGIN="$EFOLUSI_EXTERNAL_ORIGIN"');
  });
});
