import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getBalances, resetBuybackCache } from './buyback.js';

const hex = (n) => '0x' + BigInt(n).toString(16);
const EFO = 10n ** 18n;
const rpcOk = () =>
  new Response(
    JSON.stringify([
      { id: 1, result: hex(5n * EFO) },
      { id: 2, result: hex(7n * EFO) },
      { id: 3, result: hex(12345n * 10n ** 16n) }
    ])
  );

describe('buyback balances', () => {
  beforeEach(() => resetBuybackCache());

  it('reads whole EFO and USDT cents from the RPC', async () => {
    const f = vi.fn(async () => rpcOk());
    const b = await getBalances({ fetchImpl: f, now: () => 0 });
    expect(b).toEqual({ burned: 5, buyback: 7, revenue: 123.45 });
  });

  it('serves the cache inside 30 seconds', async () => {
    const f = vi.fn(async () => rpcOk());
    await getBalances({ fetchImpl: f, now: () => 0 });
    await getBalances({ fetchImpl: f, now: () => 29_000 });
    expect(f).toHaveBeenCalledTimes(1);
  });

  it('falls back to the second RPC', async () => {
    const f = vi.fn().mockRejectedValueOnce(new Error('down')).mockResolvedValueOnce(rpcOk());
    const b = await getBalances({ fetchImpl: f, now: () => 0 });
    expect(b.burned).toBe(5);
    expect(f).toHaveBeenCalledTimes(2);
  });

  it('passes a timeout signal to every upstream call', async () => {
    const f = vi.fn(async () => rpcOk());
    await getBalances({ fetchImpl: f, now: () => 0 });
    expect(f.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });

  it('serves stale data when every RPC fails after the cache expired', async () => {
    const ok = vi.fn(async () => rpcOk());
    await getBalances({ fetchImpl: ok, now: () => 0 });
    const bad = vi.fn(async () => new Response('x', { status: 500 }));
    const b = await getBalances({ fetchImpl: bad, now: () => 60_000 });
    expect(b).toEqual({ burned: 5, buyback: 7, revenue: 123.45, stale: true });
  });

  it('returns null when nothing was ever read and the RPCs fail', async () => {
    const bad = vi.fn(async () => new Response('x', { status: 500 }));
    expect(await getBalances({ fetchImpl: bad, now: () => 0 })).toBeNull();
  });

  it('rejects a malformed RPC answer', async () => {
    const bad = vi.fn(async () => new Response(JSON.stringify([{ id: 1, result: '0x1' }])));
    expect(await getBalances({ fetchImpl: bad, now: () => 0 })).toBeNull();
  });

  it('does not stampede a failing upstream: two calls inside 30 s hit each RPC once', async () => {
    const bad = vi.fn(async () => new Response('x', { status: 500 }));
    await getBalances({ fetchImpl: bad, now: () => 0 });
    await getBalances({ fetchImpl: bad, now: () => 10_000 });
    expect(bad).toHaveBeenCalledTimes(2);
  });

  it('shares one in-flight read between concurrent callers', async () => {
    const f = vi.fn(async () => rpcOk());
    await Promise.all([getBalances({ fetchImpl: f, now: () => 0 }), getBalances({ fetchImpl: f, now: () => 0 })]);
    expect(f).toHaveBeenCalledTimes(1);
  });

  it('retries after the 30 s failure pause', async () => {
    const bad = vi.fn(async () => new Response('x', { status: 500 }));
    await getBalances({ fetchImpl: bad, now: () => 0 });
    await getBalances({ fetchImpl: bad, now: () => 31_000 });
    expect(bad).toHaveBeenCalledTimes(4);
  });

  it.each([
    ['not an array', { id: 1 }],
    ['non-hex result', [{ id: 1, result: 'nope' }, { id: 2, result: '0x1' }, { id: 3, result: '0x1' }]],
    ['result too long', [{ id: 1, result: '0x' + '1'.repeat(65) }, { id: 2, result: '0x1' }, { id: 3, result: '0x1' }]],
    ['null entries', [null, { id: 2, result: '0x1' }, { id: 3, result: '0x1' }]]
  ])('returns null for a malformed answer: %s', async (_n, body) => {
    const f = vi.fn(async () => new Response(JSON.stringify(body)));
    expect(await getBalances({ fetchImpl: f, now: () => 0 })).toBeNull();
  });

  it('refuses an oversized upstream answer by content-length', async () => {
    const f = vi.fn(async () => new Response('[]', { headers: { 'content-length': '5000' } }));
    expect(await getBalances({ fetchImpl: f, now: () => 0 })).toBeNull();
  });
});
