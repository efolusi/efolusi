import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from './route.js';
import { resetBuybackCache } from '../_lib/buyback.js';

const hex = (n) => '0x' + BigInt(n).toString(16);
const ok = () =>
  new Response(JSON.stringify([{ id: 1, result: hex(10n ** 18n) }, { id: 2, result: hex(10n ** 18n) }, { id: 3, result: hex(10n ** 16n) }]));

describe('GET /api/buyback', () => {
  beforeEach(() => resetBuybackCache());
  afterEach(() => vi.unstubAllGlobals());

  it('returns the figures with a short cache header', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ok()));
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toContain('s-maxage=30');
    expect(await res.json()).toEqual({ burned: 1, buyback: 1, revenue: 0.01 });
  });

  it('answers 503 without caching when nothing can be read', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('x', { status: 500 })));
    const res = await GET();
    expect(res.status).toBe(503);
    expect(res.headers.get('cache-control')).toBe('no-store');
  });
});
