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
});
