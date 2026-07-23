import { Alert, Badge, Icon } from '@efolusi/meridian';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

const CONTRACT = '0xb61a09e93b4f14585e9afbac3adaea626f25fb07';
const POOL = '0xd604ddcd9aed73a761afe65ccc931a608fe36ede3478e71128b6633c5ec503f4';

export const metadata = {
  title: '$EFO token · Efolusi',
  description:
    '$EFO is the ecosystem token of Efolusi on BNB Smart Chain, tradable on Uniswap. The official contract address, on-chain facts, trading links and safety notes live on this page.',
  alternates: { canonical: '/token' }
};

const facts = [
  ['Contract address', CONTRACT],
  ['Token name', 'EFOLUSI'],
  ['Symbol', 'EFO'],
  ['Network', 'BNB Smart Chain (BEP-20)'],
  ['Decimals', '18'],
  ['Total supply', '100,000,000,000 EFO'],
  ['Pool', 'EFO/USDT on Uniswap v4']
];

const tokenFaq = [
  [
    'Is EFO tradable right now?',
    'Yes, in the EFO/USDT pool on Uniswap v4. Start from the links in the Trading section above rather than searching, so you end up in the real pool.'
  ],
  [
    'Where does official token information live?',
    'Right here. This page is the single source of truth for the $EFO contract address and token announcements. Treat any other address or claim as unofficial.'
  ],
  [
    'How do I avoid scams?',
    'Verify the contract address on this page character by character before interacting with anything. We never DM first, we never ask for your seed phrase, and we never run surprise airdrops or presales announced outside this site.'
  ]
];

export default function TokenPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <h1>
              <span className="accent">$EFO</span>, the Efolusi ecosystem{' '}
              <span className="script accent">token</span>.
            </h1>
            <p className="page-lede">
              EFO is the token of the Efolusi ecosystem, live on BNB Smart Chain. This page is the official home for its contract address, on-chain facts and announcements.
            </p>
            <div className="token-status">
              <Badge tone="success">Tradable on Uniswap v4</Badge>
              <Badge tone="neutral">BEP-20</Badge>
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                One address. Verify it <span className="script accent">every time</span>.
              </h2>
              <p className="section-lede">
                This is the only official $EFO contract address. Anything else that calls itself EFO is not ours.
              </p>
            </div>

            <div className="token-facts" style={{ maxWidth: 760, margin: '36px auto 0' }}>
              {facts.map(([k, v]) => (
                <div className="token-fact" key={k}>
                  <div className="k">{k}</div>
                  <div className={`v${k === 'Contract address' ? ' v--address' : ''}`}>{v}</div>
                </div>
              ))}
            </div>

            <div className="fact-foot">
              <span className="eco-note">Read from the contract on 22 July 2026.</span>
              <a
                className="ca-link"
                href={`https://bscscan.com/token/${CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on BscScan <Icon name="arrow-up-right" size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                One pool, <span className="script accent">linked from here</span>.
              </h2>
              <p className="section-lede">
                Prices and liquidity move constantly, so we link the live sources instead of printing numbers that go stale.
              </p>
            </div>

            <div className="ruled-cells trade-cells" data-cols="3" style={{ marginTop: 40 }}>
              <a
                className="trade-link"
                href={`https://app.uniswap.org/swap?chain=bnb&outputCurrency=${CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <div className="nm">Swap on Uniswap</div>
                  <div className="ro">Opens the swap with EFO pre-selected on BNB Chain</div>
                </div>
                <Icon name="arrow-up-right" size={16} />
              </a>
              <a
                className="trade-link"
                href={`https://www.geckoterminal.com/bsc/pools/${POOL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <div className="nm">Live chart on GeckoTerminal</div>
                  <div className="ro">Price, liquidity and trades for the EFO/USDT pool</div>
                </div>
                <Icon name="arrow-up-right" size={16} />
              </a>
              <a
                className="trade-link"
                href={`https://bscscan.com/token/${CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <div className="nm">Contract on BscScan</div>
                  <div className="ro">Holders, transfers and the verified source</div>
                </div>
                <Icon name="arrow-up-right" size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                Utility, documented <span className="script accent">before it ships</span>.
              </h2>
              <p className="section-lede">
                EFO is being wired into the Efolusi ecosystem step by step. We publish utility, tokenomics and documentation here as each piece goes live, not before. No promises ahead of working software; that is the same standard our products are held to.
              </p>
            </div>

            <div className="token-alert" style={{ margin: '36px auto 0' }}>
              <Alert
                tone="warning"
                title="Please read before doing anything with EFO"
                description="EFO is not an investment product and nothing on this site is financial advice. Digital assets are volatile and you can lose everything you put in. Do your own research, use only the contract address above, and never share your seed phrase with anyone."
              />
            </div>
          </div>
        </section>

        <section className="csec csec--rule">
          <div className="wrap">
            <div className="csec-head">
              <h2>
                Straight <span className="script accent">answers</span>.
              </h2>
            </div>
            <div className="token-faq" style={{ maxWidth: 760, margin: '36px auto 0' }}>
              {tokenFaq.map(([q, a]) => (
                <div className="token-faq-item" key={q}>
                  <h3>{q}</h3>
                  <p>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band closer">
          <div className="wrap">
            <h2>
              Questions about the <span className="script" style={{ color: 'var(--brand-300)' }}>ecosystem</span>?
            </h2>
            <p>Partnerships, integrations, or anything about $EFO. We read everything.</p>
            <div className="closer-actions">
              <a className="pill pill--cream" href="/#contact">
                Get in touch
                <span className="pill-arrow">
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
