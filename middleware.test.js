import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { languageRedirectUrl, middleware } from './middleware';

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
    const ciWorkflow = readFileSync('.github/workflows/ci.yml', 'utf8');
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const nvmVersion = readFileSync('.nvmrc', 'utf8').trim();
    expect(workflow).toContain('branches: [dev, main]');
    expect(workflow).toContain('/usr/local/sbin/efolusi-landing-deploy');
    expect(workflow).toContain('/usr/local/sbin/efolusi-landing-deploy');
    expect(workflow).not.toContain('sudo');
    expect(workflow).toContain(`runs-on: \${{ github.ref_name == 'main' && fromJSON('["self-hosted", "Linux", "X64", "efolusi-prod"]') || fromJSON('["self-hosted", "Linux", "X64", "efolusi-dev"]') }}`);
    expect(ciWorkflow).toContain('runs-on: [self-hosted, Linux, X64, efolusi-dev]');
    expect(ciWorkflow).toContain('actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020');
    expect(ciWorkflow).toContain('node-version: 22.23.2');
    expect(packageJson.engines.node).toBe('22.23.2');
    expect(nvmVersion).toBe('22.23.2');
  });
});

describe('paths outside a locale', () => {
  /* Behind nginx every request carries X-Forwarded-Proto: https, so nextUrl
     resolves to an https origin while the server speaks plain http on that
     port. A rewrite would then be treated as external, fetched over TLS, and
     fail with EPROTO — answering 500 instead of the branded 404. A redirect
     into the locale keeps that impossible. */
  const requestFor = (href, cookie) => ({
    nextUrl: new URL(href),
    cookies: { get: (name) => (name === 'lang' && cookie ? { value: cookie } : undefined) },
    headers: new Headers(),
  });

  it('redirects an unknown path into the reader language instead of rewriting', () => {
    const response = middleware(requestFor('https://localhost:13000/nope', 'id'));
    expect(response.status).toBe(307);
    expect(new URL(response.headers.get('location')).pathname).toBe('/id/nope');
  });

  it('keeps the query string and defaults to English without a cookie', () => {
    const response = middleware(requestFor('https://localhost:13000/blog?ref=x'));
    const location = new URL(response.headers.get('location'));
    expect(response.status).toBe(307);
    expect(location.pathname).toBe('/en/blog');
    expect(location.search).toBe('?ref=x');
  });
});
