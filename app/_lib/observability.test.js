/* What leaves the process. The envelope is built by hand so this is
   assertable: a report must not carry a cookie, a header, a request body or
   the query string, and nothing is sent at all without SENTRY_DSN. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { initErrorReporting, parseDsn, parseStack, reportError, stripQuery } from './observability.js';
import { onRequestError, register } from '../../instrumentation';

const DSN = 'https://abc123@o4510384640622592.ingest.us.sentry.io/4511825747050496';

describe('DSN parsing', () => {
  it('builds the envelope endpoint for the project', () => {
    expect(parseDsn(DSN)?.envelopeUrl).toBe(
      'https://o4510384640622592.ingest.us.sentry.io/api/4511825747050496/envelope/?sentry_key=abc123&sentry_version=7',
    );
  });

  it('refuses anything that is not a usable DSN', () => {
    expect(parseDsn('not a url')).toBeNull();
    expect(parseDsn('https://sentry.example.com/123'), 'no public key').toBeNull();
    expect(parseDsn('https://key@sentry.example.com'), 'no project').toBeNull();
  });
});

describe('stack parsing', () => {
  it("keeps frames in Sentry's order and marks our own code", () => {
    const stack = [
      'Error: boom',
      '    at handler (/srv/app/app/api/contact/route.js:12:5)',
      '    at /srv/app/node_modules/next/dist/server/base-server.js:99:1',
    ].join('\n');
    const frames = parseStack(stack);
    expect(frames.map((f) => f.filename)).toEqual([
      '/srv/app/node_modules/next/dist/server/base-server.js',
      '/srv/app/app/api/contact/route.js',
    ]);
    expect(frames.at(-1)).toMatchObject({ function: 'handler', lineno: 12, colno: 5, in_app: true });
    expect(frames[0].in_app, 'dependency frames are not our code').toBe(false);
  });

  it('survives a stack it cannot read', () => {
    expect(parseStack(undefined)).toEqual([]);
    expect(parseStack('Error: no frames at all')).toEqual([]);
  });

  it('strips the query string and fragment from a path', () => {
    expect(stripQuery('/en/about?token=x&code=y#top')).toBe('/en/about');
    expect(stripQuery(undefined)).toBeUndefined();
  });
});

describe('what a report contains', () => {
  const sent = [];
  const env = { ...process.env };

  beforeEach(() => {
    sent.length = 0;
    vi.stubGlobal('fetch', async (url, init) => {
      sent.push({ url: String(url), body: String(init.body) });
      return new Response('{}', { status: 200 });
    });
    process.env.SENTRY_DSN = DSN;
    process.env.SENTRY_ENVIRONMENT = 'dev';
    expect(initErrorReporting(), 'reporting must be on for these assertions to mean anything').toBe(true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = { ...env };
    initErrorReporting();
  });

  const eventOf = (body) => JSON.parse(body.split('\n')[2]);

  it('carries the error, where it happened and the environment', async () => {
    reportError(new Error('it fell over'), { route: '/api/contact', method: 'POST' });
    await vi.waitFor(() => expect(sent).toHaveLength(1));

    expect(sent[0].url).toContain('/api/4511825747050496/envelope/');
    const event = eventOf(sent[0].body);
    expect(event.exception.values[0]).toMatchObject({ type: 'Error', value: 'it fell over' });
    expect(event.tags).toMatchObject({ route: '/api/contact', method: 'POST' });
    expect(event.environment).toBe('dev');
    expect(typeof event.server_name).toBe('string');
  });

  it('reports through the Next hook with no cookie, header, body or query string', async () => {
    process.env.NEXT_RUNTIME = 'nodejs';
    await register();

    await onRequestError(
      new Error('boom'),
      {
        path: '/id/about?token=SECRET_TOKEN&code=SECRET_CODE',
        method: 'POST',
        headers: {
          cookie: 'lang=SECRET_COOKIE',
          authorization: 'Bearer SECRET_BEARER',
          'x-forwarded-for': '203.0.113.9',
          'cf-connecting-ip': '203.0.113.9',
        },
        body: JSON.stringify({ email: 'someone@example.com', message: 'SECRET_BODY' }),
      },
      { routerKind: 'App Router', routePath: '/[lang]/about', routeType: 'render' },
    );

    await vi.waitFor(() => expect(sent).toHaveLength(1));
    const payload = sent[0].body;
    for (const secret of [
      'SECRET_TOKEN',
      'SECRET_CODE',
      'SECRET_COOKIE',
      'SECRET_BEARER',
      'SECRET_BODY',
      'someone@example.com',
      '203.0.113.9',
      '?',
    ]) {
      expect(payload, `${secret} must never reach the reporting service`).not.toContain(secret);
    }
    const event = eventOf(payload);
    expect(event.exception.values[0].value).toBe('boom');
    expect(event.tags).toEqual({ route: '/[lang]/about', method: 'POST', path: '/id/about' });
  });

  it('does not throw when reporting itself fails', () => {
    vi.stubGlobal('fetch', async () => {
      throw new Error('sentry unreachable');
    });
    expect(() => reportError(new Error('still fine'))).not.toThrow();
  });
});

describe('when no DSN is configured', () => {
  it('stays off and sends nothing', async () => {
    const sent = [];
    vi.stubGlobal('fetch', async () => {
      sent.push(1);
      return new Response('{}');
    });
    delete process.env.SENTRY_DSN;
    expect(initErrorReporting()).toBe(false);
    reportError(new Error('nobody hears this'));
    await onRequestError(new Error('nor this'), { path: '/', method: 'GET' }, {});
    await new Promise((resolve) => setTimeout(resolve, 10));
    vi.unstubAllGlobals();
    expect(sent).toHaveLength(0);
  });
});
