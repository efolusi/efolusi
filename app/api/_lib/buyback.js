/* Read-only token figures for the token page. The browser never talks to a
   chain RPC: this module does, with a timeout, a 30 second cache per isolate
   and a stale fallback. No key is involved. */
const CONTRACT = '0xb61a09e93b4f14585e9afbac3adaea626f25fb07';
const USDT_CONTRACT = '0x55d398326f99059fF775485246999027B3197955';
const DEV_WALLET = '0x23bb2435a859ec52736bab3180806b8c7ae85fc6';
const REVENUE_WALLET = '0x0297e732858a4d99f5e6aa5ec72fb9f715396f4e';
const BURN_ADDRESS = '0x000000000000000000000000000000000000dEaD';
const RPCS = ['https://bsc-dataseed.bnbchain.org', 'https://bsc-rpc.publicnode.com'];
const FRESH_MS = 30_000;
const TIMEOUT_MS = 4_000;

let cache = null;

export function resetBuybackCache() {
  cache = null;
}

function balanceOfCall(wallet, id, token = CONTRACT) {
  return {
    jsonrpc: '2.0',
    id,
    method: 'eth_call',
    params: [{ to: token, data: `0x70a08231${wallet.slice(2).toLowerCase().padStart(64, '0')}` }, 'latest']
  };
}

// hex wei -> whole EFO (18 decimals); safe well beyond total supply
function toEfo(hex) {
  return Number(BigInt(hex) / 10n ** 18n);
}

async function readFromRpc(fetchImpl) {
  let lastErr;
  for (const rpc of RPCS) {
    try {
      const res = await fetchImpl(rpc, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        body: JSON.stringify([
          balanceOfCall(BURN_ADDRESS, 1),
          balanceOfCall(DEV_WALLET, 2),
          balanceOfCall(REVENUE_WALLET, 3, USDT_CONTRACT)
        ])
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const out = await res.json();
      const byId = Object.fromEntries(out.map((r) => [r.id, r.result]));
      if (!byId[1] || !byId[2] || !byId[3]) throw new Error('bad RPC response');
      // USDT on BSC also uses 18 decimals; keep cents for the smaller number
      return { burned: toEfo(byId[1]), buyback: toEfo(byId[2]), revenue: Number(BigInt(byId[3]) / 10n ** 16n) / 100 };
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

export async function getBalances({ fetchImpl = fetch, now = Date.now } = {}) {
  if (cache && now() - cache.at < FRESH_MS) return cache.value;
  try {
    const value = await readFromRpc(fetchImpl);
    cache = { at: now(), value };
    return value;
  } catch {
    return cache ? { ...cache.value, stale: true } : null;
  }
}
