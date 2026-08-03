import { Accordion, Badge, Icon } from '@efolusi/meridian';
import { getDictionary } from '../../dictionaries/config.js';
import SiteHeader from '../../components/SiteHeader.jsx';
import SiteFooter from '../../components/SiteFooter.jsx';
import BuybackBurn from '../../components/BuybackBurn.jsx';

const CONTRACT = '0xb61a09e93b4f14585e9afbac3adaea626f25fb07';
const POOL = '0xd604ddcd9aed73a761afe65ccc931a608fe36ede3478e71128b6633c5ec503f4';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.token.meta.title,
    description: d.token.meta.description,
    alternates: {
      canonical: `/${lang}/token`,
      languages: { en: '/en/token', id: '/id/token', 'x-default': '/en/token' }
    }
  };
}

export default async function TokenPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const d = dict.token;

  return (
    <>
      <SiteHeader lang={lang} t={dict.common} />
    <main>
      <section className="page-hero">
        <div className="wrap">
          <h1>
            <span className="accent">$EFO</span>, {d.heroA} <span className="script accent">{d.heroEm}</span>
            {d.heroB}
          </h1>
          <p className="page-lede">{d.lede}</p>
          <div className="token-status">
            <Badge tone="success">{d.tradable}</Badge>
            <Badge tone="neutral">{d.bep20}</Badge>
          </div>
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="csec-head">
            <h2>
              {d.addrTitleA} <span className="script accent">{d.addrTitleEm}</span>
              {d.addrTitleB}
            </h2>
            <p className="section-lede">{d.addrLede}</p>
          </div>

          <div className="token-facts" style={{ maxWidth: 760, margin: '36px auto 0' }}>
            {d.facts.map(([k, v], index) => (
              <div className="token-fact" key={k}>
                <div className="k">{k}</div>
                <div className={`v${index === 0 ? ' v--address' : ''}`}>{v}</div>
              </div>
            ))}
          </div>

          <div className="fact-foot">
            <span className="eco-note">{d.readNote}</span>
            <a className="ca-link" href={`https://bscscan.com/token/${CONTRACT}`} target="_blank" rel="noopener noreferrer">
              {d.viewBscscan} <Icon name="arrow-up-right" size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="csec-head">
            <h2>
              {d.poolTitleA} <span className="script accent">{d.poolTitleEm}</span>
              {d.poolTitleB}
            </h2>
            <p className="section-lede">{d.poolLede}</p>
          </div>

          <div className="ruled-cells trade-cells" data-cols="3" style={{ marginTop: 40 }}>
            <a
              className="trade-link"
              href={`https://app.uniswap.org/swap?chain=bnb&outputCurrency=${CONTRACT}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="nm">{d.trade.swapTitle}</div>
                <div className="ro">{d.trade.swapDesc}</div>
              </div>
              <Icon name="arrow-up-right" size={16} />
            </a>
            <a className="trade-link" href={`https://www.geckoterminal.com/bsc/pools/${POOL}`} target="_blank" rel="noopener noreferrer">
              <div>
                <div className="nm">{d.trade.chartTitle}</div>
                <div className="ro">{d.trade.chartDesc}</div>
              </div>
              <Icon name="arrow-up-right" size={16} />
            </a>
            <a className="trade-link" href={`https://bscscan.com/token/${CONTRACT}`} target="_blank" rel="noopener noreferrer">
              <div>
                <div className="nm">{d.trade.contractTitle}</div>
                <div className="ro">{d.trade.contractDesc}</div>
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
              {d.nomicsTitleA} <span className="script accent">{d.nomicsTitleEm}</span>
              {d.nomicsTitleB}
            </h2>
            <p className="section-lede">{d.nomicsLede}</p>
          </div>

          <div className="nomics" style={{ maxWidth: 760, margin: '36px auto 0' }}>
            {d.allocations.map(([label, share, note]) => (
              <div className="nomics-row" key={label}>
                <div className="nomics-head">
                  <span className="nomics-label">{label}</span>
                  <span className="nomics-share">{share}%</span>
                </div>
                <div className="nomics-track">
                  <div className="nomics-fill" style={{ width: `${share}%` }} />
                </div>
                <p className="nomics-note">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="csec-head">
            <h2>
              {d.bbTitleA} <span className="script accent">{d.bbTitleEm}</span>
              {d.bbTitleB}
            </h2>
            <p className="section-lede">{d.bbLede}</p>
          </div>

          <BuybackBurn t={d} lang={lang} />
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="csec-head">
            <h2>
              {d.utilTitleA} <span className="script accent">{d.utilTitleEm}</span>
              {d.utilTitleB}
            </h2>
            <p className="section-lede">{d.utilLede}</p>
          </div>

          <div className="ruled-cells flywheel-cells" data-cols="3" style={{ marginTop: 40 }}>
            {d.flywheel.map(([title, body], i) => (
              <div className="flywheel-cell" key={title}>
                <div className="flywheel-step">{i + 1}</div>
                <div>
                  <div className="nm">{title}</div>
                  <div className="ro">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="csec csec--rule">
        <div className="wrap">
          <div className="csec-head">
            <h2>
              {d.faqTitleA} <span className="script accent">{d.faqTitleEm}</span>
              {d.faqTitleB}
            </h2>
          </div>
          <div style={{ maxWidth: 760, margin: '36px auto 0' }}>
            <Accordion
              items={d.faq.map(([question, answer], index) => ({
                id: `token-faq-${index}`,
                title: question,
                content: answer
              }))}
            />
          </div>
        </div>
      </section>

      <section className="band closer">
        <div className="wrap">
          <h2>
            {d.closerA} <span className="script" style={{ color: 'var(--brand-300)' }}>{d.closerEm}</span>
            {d.closerB}
          </h2>
          <p>{d.closerBody}</p>
          <div className="closer-actions">
            <a className="pill pill--cream" href={`/${lang}/#contact`}>
              {d.closerCta}
              <span className="pill-arrow">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>

      <SiteFooter lang={lang} t={dict.common} />
    </>
  );
}
