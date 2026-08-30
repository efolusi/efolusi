import { describe, it, expect } from 'vitest';
import { isSameOrigin, passesRateLimit, tooLong, validateEmail } from './guard.js';

function req(headers, url = 'https://efolusi.com/api/contact') {
  return { url, headers: new Headers(headers) };
}

describe('isSameOrigin', () => {
  it('passes requests with no Origin (same-origin / non-browser)', () => {
    expect(isSameOrigin(req({}))).toBe(true);
  });

  it('passes a matching Origin host', () => {
    expect(isSameOrigin(req({ origin: 'https://efolusi.com' }))).toBe(true);
  });

  it('rejects a cross-origin host', () => {
    expect(isSameOrigin(req({ origin: 'https://evil.example' }))).toBe(false);
  });

  it('rejects a malformed Origin', () => {
    expect(isSameOrigin(req({ origin: 'not a url' }))).toBe(false);
  });
});

describe('tooLong', () => {
  it('is true past the limit', () => {
    expect(tooLong('abcd', 3)).toBe(true);
  });

  it('is false at or under the limit', () => {
    expect(tooLong('abc', 3)).toBe(false);
  });

  it('is false for non-strings', () => {
    expect(tooLong(undefined, 3)).toBe(false);
  });
});

describe('validateEmail', () => {
  it('accepts a normal address', () => {
    expect(validateEmail('hello@efolusi.com')).toBe(true);
  });

  it.each(['plainaddress', 'no@domain', 'two@@at.com', 'space @efolusi.com', ''])(
    'rejects %j',
    (bad) => expect(validateEmail(bad)).toBe(false)
  );
});

describe('passesRateLimit', () => {
  const request = req({ 'x-forwarded-for': '192.0.2.1, 127.0.0.1' });

  it('passes only counts inside the shared Valkey window', async () => {
    expect(await passesRateLimit(request, 'contact', { nodeEnv: 'production', increment: async () => 1 })).toBe(true);
    expect(await passesRateLimit(request, 'contact', { nodeEnv: 'production', increment: async () => 5 })).toBe(true);
    expect(await passesRateLimit(request, 'contact', { nodeEnv: 'production', increment: async () => 6 })).toBe(false);
  });

  it('uses the canonical namespace, client address, and window', async () => {
    let observed;
    await passesRateLimit(request, 'CONTACT_RATE_LIMIT', {
      nodeEnv: 'production',
      increment: async (...args) => { observed = args; return 1; },
    });
    expect(observed).toEqual(['efolusi:rate-limit:CONTACT_RATE_LIMIT:192.0.2.1', 60_000]);
  });

  it('fails closed in production when shared Valkey enforcement throws', async () => {
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', increment: async () => { throw new Error('Valkey unavailable'); } })).toBe(false);
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', increment: async () => 0 })).toBe(false);
  });

  it('allows a failed store only with explicit non-production bypass', async () => {
    const failure = async () => { throw new Error('Valkey unavailable'); };
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'development', allowDevelopmentBypass: 'true', increment: failure })).toBe(true);
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'test', allowDevelopmentBypass: 'false', increment: failure })).toBe(false);
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', allowDevelopmentBypass: 'true', increment: failure })).toBe(false);
  });
});
