import { Alert, Badge, CopyField, Icon } from '@efolusi/meridian';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

const CONTRACT = '0xb61a09e93b4f14585e9afbac3adaea626f25fb07';

export const metadata = {
  title: '$EFO token · Efolusi',
  description:
    '$EFO is the ecosystem token of Efolusi on BNB Smart Chain. The official contract address, on-chain facts, and safety notes live on this page.',
  alternates: { canonical: '/token' }
};

const facts = [
  ['Token name', 'EFOLUSI'],
  ['Symbol', 'EFO'],
  ['Network', 'BNB Smart Chain (BEP-20)'],
  ['Decimals', '18'],
  ['Total supply', '100,000,000,000 EFO']
];

const tokenFaq = [
  [
    'Is EFO tradable right now?',
    'Not yet. There is no official liquidity pool or exchange listing at the moment. When that changes, this page and our official channels will say so first.'
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
      <SiteHeader active="token" />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow eyebrow--mono">Ecosystem</span>
            <h1>
              <span className="accent">$EFO</span>, the Efolusi ecosystem token.
            </h1>
            <p className="page-lede">
              EFO is the token of the Efolusi ecosystem, live on BNB Smart Chain. This page is the official home for its contract address, on-chain facts and announcements.
            </p>
            <div className="token-status">
              <Badge tone="warning">Not yet publicly traded</Badge>
              <Badge tone="neutral">BEP-20</Badge>
            </div>
          </div>
        </section>

        <section className="section section--rule">
          <div className="wrap">
            <div className="token-grid">
              <div>
                <span className="eyebrow eyebrow--mono">01 / Official contract</span>
                <h2 className="section-title">One address. Verify it every time.</h2>
                <p className="section-lede">
                  This is the only official $EFO contract address. Anything else that calls itself EFO is not ours.
                </p>

                <div className="ca-card">
                  <CopyField label="Contract address (BNB Smart Chain)" value={CONTRACT} />
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

              <div>
                <span className="eyebrow eyebrow--mono">02 / On-chain facts</span>
                <div className="token-facts">
                  {facts.map(([k, v]) => (
                    <div className="token-fact" key={k}>
                      <div className="k">{k}</div>
                      <div className="v">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--rule">
          <div className="wrap">
            <span className="eyebrow eyebrow--mono">03 / What comes next</span>
            <h2 className="section-title">Utility, documented before it ships.</h2>
            <p className="section-lede">
              EFO is being wired into the Efolusi ecosystem step by step. We publish utility, tokenomics and documentation here as each piece goes live, not before. No promises ahead of working software; that is the same standard our products are held to.
            </p>

            <div className="token-alert">
              <Alert
                tone="warning"
                title="Please read before doing anything with EFO"
                description="EFO is not an investment product and nothing on this site is financial advice. Digital assets are volatile and you can lose everything you put in. Do your own research, use only the contract address above, and never share your seed phrase with anyone."
              />
            </div>
          </div>
        </section>

        <section className="section section--rule">
          <div className="wrap">
            <div className="token-grid">
              <div>
                <span className="eyebrow eyebrow--mono">04 / Token FAQ</span>
                <h2 className="section-title">Straight answers.</h2>
              </div>
              <div className="token-faq">
                {tokenFaq.map(([q, a]) => (
                  <div className="token-faq-item" key={q}>
                    <h3>{q}</h3>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="band closer">
          <div className="wrap">
            <h2>Questions about the ecosystem?</h2>
            <p>Partnerships, integrations, or anything about $EFO. We read everything.</p>
            <div className="closer-actions">
              <a className="band-btn" href="/#contact">
                Get in touch <Icon name="arrow-right" size={16} />
              </a>
              <a className="band-link" href="/">
                Back to efolusi.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
