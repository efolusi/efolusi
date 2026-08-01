'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@efolusi/meridian';

const CONTRACT = '0xb61a09e93b4f14585e9afbac3adaea626f25fb07';
const DEV_WALLET = '0x23bb2435a859ec52736bab3180806b8c7ae85fc6';
const BURN_ADDRESS = '0x000000000000000000000000000000000000dEaD';
const TOTAL_SUPPLY = 100_000_000_000;
const RPCS = ['https://bsc-dataseed.bnbchain.org', 'https://bsc-rpc.publicnode.com'];

function balanceOfCall(wallet, id) {
  return {
    jsonrpc: '2.0',
    id,
    method: 'eth_call',
    params: [{ to: CONTRACT, data: `0x70a08231${wallet.slice(2).toLowerCase().padStart(64, '0')}` }, 'latest']
  };
}

// hex wei -> whole EFO (18 decimals); safe well beyond total supply
function toEfo(hex) {
  return Number(BigInt(hex) / 10n ** 18n);
}

async function readBalances() {
  let lastErr;
  for (const rpc of RPCS) {
    try {
      const res = await fetch(rpc, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify([balanceOfCall(BURN_ADDRESS, 1), balanceOfCall(DEV_WALLET, 2)])
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const out = await res.json();
      const byId = Object.fromEntries(out.map((r) => [r.id, r.result]));
      if (!byId[1] || !byId[2]) throw new Error('bad RPC response');
      return { burned: toEfo(byId[1]), buyback: toEfo(byId[2]) };
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

export default function BuybackBurn({ t, lang }) {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let alive = true;
    const load = () =>
      readBalances()
        .then((b) => alive && setState({ status: 'ready', ...b }))
        .catch(() => alive && setState((s) => (s.status === 'ready' ? s : { status: 'error' })));
    load();
    const timer = setInterval(load, 30000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  const locale = lang === 'id' ? 'id-ID' : 'en-US';
  const fmt = (n) => `${n.toLocaleString(locale)} EFO`;
  const pct = (n) => `${((n / TOTAL_SUPPLY) * 100).toLocaleString(locale, { maximumFractionDigits: 2 })}%`;

  const rows =
    state.status === 'ready'
      ? [
          { label: t.bbBurned, value: state.burned, mod: 'burned' },
          { label: t.bbBuyback, value: state.buyback, mod: 'buyback' }
        ]
      : [];
  const scale = Math.max(1, ...rows.map((r) => r.value));

  return (
    <div className="bb" style={{ maxWidth: 760, margin: '36px auto 0' }}>
      {state.status === 'loading' && <p className="bb-note">{t.bbLoading}</p>}
      {state.status === 'error' && <p className="bb-note">{t.bbError}</p>}
      {rows.map((r) => (
        <div className="bb-row" key={r.mod}>
          <div className="bb-row-head">
            <span className="bb-label">{r.label}</span>
            <span className="bb-value">
              {fmt(r.value)} <span className="bb-pct">· {pct(r.value)} {t.bbOfSupply}</span>
            </span>
          </div>
          <div className="bb-track">
            <div className={`bb-fill bb-fill--${r.mod}`} style={{ width: `${Math.max(1.5, (r.value / scale) * 100)}%` }} />
          </div>
        </div>
      ))}
      {state.status === 'ready' && <p className="bb-note">{t.bbUpdated}</p>}

      <div className="token-facts" style={{ marginTop: 28 }}>
        {t.bbWallets.map(([label, addr]) => (
          <div className="token-fact" key={addr}>
            <div className="k">{label}</div>
            <div className="v v--address">
              <a href={`https://bscscan.com/address/${addr}`} target="_blank" rel="noopener noreferrer" className="bb-addr">
                {addr} <Icon name="arrow-up-right" size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
