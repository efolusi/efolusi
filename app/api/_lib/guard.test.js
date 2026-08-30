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
  const request = req({ 'cf-connecting-ip': '192.0.2.1' });
  const context = (binding) => () => ({ env: { TEST_LIMIT: binding } });

  it('passes only an explicit successful binding result', async () => {
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', getContext: context({ limit: async () => ({ success: true }) }) })).toBe(true);
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', getContext: context({ limit: async () => ({ success: false }) }) })).toBe(false);
  });

  it('fails closed in production when binding is missing or throws', async () => {
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', getContext: context(undefined) })).toBe(false);
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', getContext: () => { throw new Error('binding unavailable'); } })).toBe(false);
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', getContext: context({ limit: async () => { throw new Error('provider failure'); } }) })).toBe(false);
  });

  it('allows missing binding only with explicit non-production bypass', async () => {
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'development', allowDevelopmentBypass: 'true', getContext: context(undefined) })).toBe(true);
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'test', allowDevelopmentBypass: 'false', getContext: context(undefined) })).toBe(false);
    expect(await passesRateLimit(request, 'TEST_LIMIT', { nodeEnv: 'production', allowDevelopmentBypass: 'true', getContext: context(undefined) })).toBe(false);
  });
});
