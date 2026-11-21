import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { NextRequest } from 'next/server';

import { apexRedirectUrl, languageRedirectUrl, middleware, withLocaleHeader } from './middleware';
import { LOCALE_HEADER } from './app/_lib/locale-header.js';

describe('www to apex redirect', () => {
  it('moves a www page to the apex, keeping path and query', () => {
    expect(apexRedirectUrl(new URL('https://www.efolusi.com/en/about?x=1'))?.href).toBe('https://efolusi.com/en/about?x=1');
  });

  it.each(['//evil.example/x?y=1', '/\\evil.example/x', '/%2F%2Fevil.example'])('never leaves efolusi.com: %s', (path) => {
    const url = apexRedirectUrl(new URL(`https://www.efolusi.com${path}`));
    expect(url?.origin).toBe('https://efolusi.com');
  });

  it('leaves the apex and other hosts alone', () => {
    expect(apexRedirectUrl(new URL('https://efolusi.com/en'))).toBeNull();
    expect(apexRedirectUrl(new URL('http://localhost:3000/en'))).toBeNull();
  });
});

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

  it('deploys only from a v* tag on main, CI runs on main', () => {
    const ciWorkflow = readFileSync('.github/workflows/ci.yml', 'utf8');
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const nvmVersion = readFileSync('.nvmrc', 'utf8').trim();
    // The Worker deploys only from a v* tag on main, on a GitHub-hosted runner.
    const deploy = readFileSync('.github/workflows/deploy.yml', 'utf8');
    const on = deploy.slice(deploy.indexOf('\non:\n'), deploy.indexOf('\npermissions:'));
    expect(on).toContain("tags: ['v*']");
    expect(on).toContain('workflow_dispatch:');
    expect(on).not.toMatch(/branches:|pull_request/);
    expect(deploy).toContain('[[ "$GITHUB_REF" == refs/tags/v* ]]');
    expect(deploy).toContain('git merge-base --is-ancestor "$GITHUB_SHA" FETCH_HEAD');
    expect(deploy).toContain('runs-on: ubuntu-latest');
    // The Worker secrets come from the production environment and go up with the deploy.
    expect(deploy).not.toMatch(/SENTRY/);
    expect(deploy).toContain('pnpm exec opennextjs-cloudflare deploy --secrets-file "$RUNNER_TEMP/worker-secrets.json"');
    expect(deploy.indexOf('opennextjs-cloudflare build')).toBeLessThan(deploy.indexOf('worker-secrets.json'));
    for (const name of ['BREVO_API_KEY', 'EMAIL_FROM', 'EMAIL_TO']) {
      expect(deploy).toContain(`${name}: \${{ secrets.${name} }}`);
    }
    // The Worker has the repo's name and serves the custom domains.
    const wrangler = readFileSync('wrangler.jsonc', 'utf8');
    expect(wrangler).toContain('"name": "efolusi",');
    expect(wrangler).toContain('{ "pattern": "efolusi.com", "custom_domain": true }');
    expect(wrangler).toContain('{ "pattern": "www.efolusi.com", "custom_domain": true }');
    expect(deploy).toContain("if: github.repository == 'efolusi/efolusi' && startsWith(github.ref, 'refs/tags/v')");
    expect(ciWorkflow).toContain('branches: [main]');
    expect(ciWorkflow).not.toContain('[main, dev]');
    // The repo is public: every job runs on a GitHub-hosted runner.
    expect(ciWorkflow).toContain('runs-on: ubuntu-latest');
    expect(ciWorkflow.match(/runs-on:/g)).toHaveLength(1);
    expect(ciWorkflow).not.toContain('self-hosted');
    expect(deploy).not.toContain('self-hosted');
    expect(ciWorkflow).toContain('actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020');
    expect(ciWorkflow).toContain('node-version: 26.13.1');
    expect(packageJson.engines.node).toBe('26.13.1');
    expect(nvmVersion).toBe('26.13.1');
  });
});

describe('unknown-path rewrite', () => {
  const run = (path) => middleware(new NextRequest(`https://efolusi.com${path}`, { headers: { 'cf-ipcountry': 'ID' } }));

  it('renders the 404 page of the reader\'s language on the same origin, keeping the query', () => {
    const target = run('/nope?q=1&b=2').headers.get('x-middleware-rewrite');
    expect(target).toBe('https://efolusi.com/id/nope?q=1&b=2');
  });

  it('never rewrites to another host', () => {
    const target = new URL(run('//evil.example/x').headers.get('x-middleware-rewrite') ?? '');
    expect(target.origin).toBe('https://efolusi.com');
  });
});

describe('the lang cookie and shared caches', () => {
  it('marks a response that sets the cookie as private', () => {
    const res = middleware(new NextRequest(new URL('https://efolusi.com/id/about')));
    expect(res.headers.get('set-cookie')).toMatch(/^lang=id/);
    expect(res.headers.get('cache-control')).toBe('private, no-store');
  });

  it('leaves a page that sets no cookie to the shared cache rule', () => {
    const res = middleware(new NextRequest(new URL('https://efolusi.com/id/about'), { headers: { cookie: 'lang=id' } }));
    expect(res.headers.get('set-cookie')).toBeNull();
    expect(res.headers.get('cache-control')).toBeNull();
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

describe('no shared cache for pages', () => {
  it('next.config.mjs gives no page a shared-cache header (each page carries its own nonce)', async () => {
    const { default: config } = await import('./next.config.mjs');
    const rules = (await config.headers()).filter((rule) => rule.headers.some((h) => h.key === 'Cache-Control'));
    expect(rules).toEqual([]);
  });
});

describe('content security policy', () => {
  const csp = (res) => res.headers.get('content-security-policy') ?? '';
  const scriptSrc = (policy) => /script-src ([^;]*)/.exec(policy)?.[1] ?? '';

  it('puts a per-request nonce in script-src of a page response', () => {
    const res = middleware(new NextRequest(new URL('https://efolusi.com/en'), { headers: { cookie: 'lang=en' } }));
    expect(scriptSrc(csp(res))).toMatch(/^'self' 'nonce-[A-Za-z0-9+/=]{24}' https:\/\/static\.cloudflareinsights\.com$/);
  });

  it('hands the same policy to the render so Next nonces its own scripts', () => {
    const res = middleware(new NextRequest(new URL('https://efolusi.com/en'), { headers: { cookie: 'lang=en' } }));
    expect(res.headers.get('x-middleware-request-content-security-policy')).toBe(csp(res));
  });

  it('gives two requests different nonces', () => {
    const one = csp(middleware(new NextRequest(new URL('https://efolusi.com/en'))));
    const two = csp(middleware(new NextRequest(new URL('https://efolusi.com/en'))));
    expect(one).not.toBe(two);
  });

  it('keeps no unsafe-inline in script-src', () => {
    for (const path of ['/en', '/id/about', '/nope', '/nope.php']) {
      expect(scriptSrc(csp(middleware(new NextRequest(new URL(`https://efolusi.com${path}`)))))).not.toContain("'unsafe-inline'");
    }
  });

  it('sends an unknown dotted path to the branded 404 in the reader language', () => {
    const res = middleware(new NextRequest(new URL('https://efolusi.com/nope.php')));
    expect(csp(res)).toContain("'nonce-");
    expect(res.headers.get('x-middleware-rewrite')).toBe('https://efolusi.com/en/nope.php');
    const id = middleware(new NextRequest(new URL('https://efolusi.com/nope.php'), { headers: { cookie: 'lang=id' } }));
    expect(id.headers.get('x-middleware-rewrite')).toBe('https://efolusi.com/id/nope.php');
  });

  it('leaves the metadata routes without a locale rewrite', () => {
    for (const path of ['/robots.txt', '/sitemap.xml', '/favicon.ico', '/llms.txt']) {
      const res = middleware(new NextRequest(new URL(`https://efolusi.com${path}`)));
      expect(csp(res)).toContain("'nonce-");
      expect(res.headers.get('x-middleware-rewrite')).toBeNull();
    }
  });

  it('gives look-alikes of the metadata routes the branded 404', () => {
    for (const path of ['/sitemap.php', '/robots-x', '/favicon.evil', '/llms.txt.bak']) {
      const res = middleware(new NextRequest(new URL(`https://efolusi.com${path}`)));
      expect(res.headers.get('x-middleware-rewrite'), path).toBe(`https://efolusi.com/en${path}`);
    }
  });

  it('exempts every dotted route under app/ from the locale rewrite (found by scanning, not by memory)', () => {
    const found = ['/llms.txt', '/robots.txt', '/sitemap.xml'];
    const dotted = [];
    // Next metadata files at the root serve fixed or dotted URLs (robots.txt, manifest.webmanifest, icon.png ...).
    const METADATA = /^(robots|sitemap|manifest|icon|apple-icon|opengraph-image|twitter-image)(\.[^.]+)+$/;
    const urlOf = (name) => {
      const base = name.replace(/\.[jt]sx?$/, '');
      if (base === 'robots') return '/robots.txt';
      if (base === 'sitemap') return '/sitemap.xml';
      if (base === 'manifest') return '/manifest.webmanifest';
      return `/${/\.[^.]+$/.test(base) ? base : name}`;
    };
    const walk = (dir, url) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.isDirectory()) {
          // _private and [dynamic] folders serve no fixed dotted URL; (group) folders add no URL segment.
          if (e.name.startsWith('_') || e.name.startsWith('[')) continue;
          const next = e.name.startsWith('(') ? url : `${url}/${e.name}`;
          if (!e.name.startsWith('(') && e.name.includes('.') && readdirSync(join(dir, e.name)).some((f) => /^route\.[jt]sx?$/.test(f))) dotted.push(next);
          walk(join(dir, e.name), next);
        } else if (url === '' && !/\.test\./.test(e.name) && METADATA.test(e.name)) {
          dotted.push(urlOf(e.name));
        }
      }
    };
    walk(fileURLToPath(new URL('./app', import.meta.url)), '');
    expect(dotted.sort()).toEqual(found);
    for (const path of dotted) {
      const res = middleware(new NextRequest(new URL(`https://efolusi.com${path}`)));
      expect(res.headers.get('x-middleware-rewrite'), path).toBeNull();
    }
  });

  it('keeps the other directives', () => {
    const policy = csp(middleware(new NextRequest(new URL('https://efolusi.com/en'))));
    expect(policy).toContain("connect-src 'self' https://cloudflareinsights.com;");
    expect(policy).toContain("default-src 'self'; ");
    expect(policy).toContain("style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';");
    expect(policy).toMatch(/frame-ancestors 'none'; base-uri 'self'; form-action 'self'$/);
  });
});
