import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route.js';

describe('newsletter fail-closed ownership boundary', () => {
  const originalBypass = process.env.ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT;
  afterEach(() => {
    if (originalBypass === undefined) delete process.env.ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT;
    else process.env.ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT = originalBypass;
    vi.restoreAllMocks();
  });

  it('returns 503 without reading or forwarding form data when DOI is unconfigured', async () => {
    process.env.ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT = 'true';
    const provider = vi.fn(); vi.stubGlobal('fetch', provider);
    const json = vi.fn(async () => ({ email: 'target@example.com' }));
    const response = await POST({ url: 'https://efolusi.example/api/newsletter', headers: new Headers(), json });
    expect(response.status).toBe(503);
    expect(json).not.toHaveBeenCalled();
    expect(provider).not.toHaveBeenCalled();
  });

  it('still rejects cross-origin requests before the disabled mutation boundary', async () => {
    process.env.ALLOW_UNBOUND_RATE_LIMIT_IN_DEVELOPMENT = 'true';
    const response = await POST({ url: 'https://efolusi.example/api/newsletter', headers: new Headers({ origin: 'https://evil.example' }) });
    expect(response.status).toBe(403);
  });
});
