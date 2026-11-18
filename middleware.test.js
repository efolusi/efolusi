import { existsSync, readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { languageRedirectUrl, rewriteTarget, withLocaleHeader } from './middleware';
import { LOCALE_HEADER } from './app/_lib/locale-header.js';

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

  it('has no deploy workflow, CI runs on main', () => {
    const ciWorkflow = readFileSync('.github/workflows/ci.yml', 'utf8');
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const nvmVersion = readFileSync('.nvmrc', 'utf8').trim();
    // The Worker deploys from the local gate (`pnpm deploy` on a v* tag), never from Actions.
    expect(existsSync('.github/workflows/deploy-native.yml')).toBe(false);
    expect(ciWorkflow).toContain('branches: [main]');
    expect(ciWorkflow).not.toContain('[main, dev]');
    // A pull request, from a fork or not, never reaches a self-hosted runner.
    expect(ciWorkflow).toContain(`runs-on: \${{ (github.event_name == 'push' && github.ref == 'refs/heads/main') && fromJSON('["self-hosted", "Linux", "X64", "efolusi-dev"]') || 'ubuntu-latest' }}`);
    expect(ciWorkflow.match(/runs-on:/g)).toHaveLength(1);
    expect(ciWorkflow).toContain('actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020');
    expect(ciWorkflow).toContain('node-version: 22.23.2');
    expect(packageJson.engines.node).toBe('22.23.2');
    expect(nvmVersion).toBe('22.23.2');
  });
});

describe('unknown-path rewrite target', () => {
  const request = (url, proto) => ({
    nextUrl: new URL(url),
    headers: { get: (name) => (name === 'x-forwarded-proto' ? proto : null) },
  });

  it('targets the http origin this process listens on when a proxy terminated TLS', () => {
    // nextUrl is https because nginx forwards the proto, but the server speaks
    // plain http. Cloning nextUrl here made Next treat the rewrite as external
    // and fetch https://localhost:13000, which fails the handshake and turns
    // every unknown path into a 500.
    const url = rewriteTarget(request('https://localhost:13000/nope', 'https'), '/en/nope');
    expect(url.href).toBe('http://localhost:13000/en/nope');
  });

  it('keeps the request origin when nothing is proxying', () => {
    const url = rewriteTarget(request('http://localhost:13000/nope', null), '/en/nope');
    expect(url.href).toBe('http://localhost:13000/en/nope');
  });

  it('carries the query string across the rewrite', () => {
    const url = rewriteTarget(request('https://localhost:13000/nope?q=1&b=2', 'https'), '/id/nope');
    expect(url.href).toBe('http://localhost:13000/id/nope?q=1&b=2');
  });
});

describe('locale header for the global 404', () => {
  it('tells the render which locale it is in and keeps the other headers', () => {
    const headers = withLocaleHeader(new Headers({ accept: 'text/html' }), 'id');
    expect(headers.get(LOCALE_HEADER)).toBe('id');
    expect(headers.get('accept')).toBe('text/html');
  });

  it('overwrites a value the client sent', () => {
    const headers = withLocaleHeader(new Headers({ [LOCALE_HEADER]: 'xx' }), 'en');
    expect(headers.get(LOCALE_HEADER)).toBe('en');
  });
});
