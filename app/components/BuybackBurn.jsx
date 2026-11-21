'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@efolusi/meridian';

const TOTAL_SUPPLY = 100_000_000_000;

async function readBalances() {
  const res = await fetch('/api/buyback');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
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
  const pct = (n) => `${((n / TOTAL_SUPPLY) * 100).toLocaleString(locale, { maximumFractionDigits: 2 })}%`;

  const rows =
    state.status === 'ready'
      ? [
          { label: t.bbBurned, value: state.burned, display: `${state.burned.toLocaleString(locale)} EFO`, sub: `· ${pct(state.burned)} ${t.bbOfSupply}`, mod: 'burned' },
          { label: t.bbBuyback, value: state.buyback, display: `${state.buyback.toLocaleString(locale)} EFO`, sub: `· ${pct(state.buyback)} ${t.bbOfSupply}`, mod: 'buyback' },
          { label: t.bbRevenue, value: state.revenue, display: `${state.revenue.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`, sub: '', mod: 'revenue' }
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
              {r.display} {r.sub && <span className="bb-pct">{r.sub}</span>}
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
