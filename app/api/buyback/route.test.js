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
    const res = await GET(new Request('https://efolusi.example/api/buyback'));
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toContain('s-maxage=30');
    expect(await res.json()).toEqual({ burned: 1, buyback: 1, revenue: 0.01 });
  });

  it('answers 503 without caching when nothing can be read', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('x', { status: 500 })));
    const res = await GET(new Request('https://efolusi.example/api/buyback'));
    expect(res.status).toBe(503);
    expect(res.headers.get('cache-control')).toBe('no-store');
  });

  it('serves from the edge cache when it holds the URL and skips the upstream', async () => {
    const hit = Response.json({ burned: 9, buyback: 9, revenue: 9 });
    const edge = { match: vi.fn(async () => hit), put: vi.fn() };
    vi.stubGlobal('caches', { default: edge });
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    const res = await GET(new Request('https://efolusi.example/api/buyback'));
    expect(await res.json()).toEqual({ burned: 9, buyback: 9, revenue: 9 });
    expect(f).not.toHaveBeenCalled();
  });

  it('puts a fresh answer into the edge cache, but never a 503', async () => {
    const edge = { match: vi.fn(async () => undefined), put: vi.fn(async () => {}) };
    vi.stubGlobal('caches', { default: edge });
    vi.stubGlobal('fetch', vi.fn(async () => ok()));
    await GET(new Request('https://efolusi.example/api/buyback'));
    expect(edge.put).toHaveBeenCalledTimes(1);
    resetBuybackCache();
    edge.put.mockClear();
    vi.stubGlobal('fetch', vi.fn(async () => new Response('x', { status: 500 })));
    await GET(new Request('https://efolusi.example/api/buyback'));
    expect(edge.put).not.toHaveBeenCalled();
  });
});
