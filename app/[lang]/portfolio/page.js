import { getDictionary } from '../../dictionaries/config.js';
import SiteHeader from '../../components/SiteHeader.jsx';
import SiteFooter from '../../components/SiteFooter.jsx';
import ProductPortfolio from '../../components/ProductPortfolio.jsx';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: lang === 'id' ? 'Portofolio — Efolusi' : 'Portfolio — Efolusi', alternates: { canonical: `/${lang}/portfolio`, languages: { en: '/en/portfolio', id: '/id/portfolio' } } };
}

export default async function PortfolioPage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <><SiteHeader lang={lang} t={d.common} /><main><section className="page-hero"><div className="wrap"><h1>{lang === 'id' ? 'Temukan tools untuk ide berikutnya.' : 'Tools for your next idea.'}</h1><p className="page-lede">{d.home.portfolio.lede}</p></div></section><section className="csec csec--rule"><div className="wrap"><ProductPortfolio products={d.home.products} lang={lang} full /></div></section></main><SiteFooter lang={lang} t={d.common} /></>;
}
