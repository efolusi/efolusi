import { getDictionary } from '../../dictionaries/config.js';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.terms.meta.title,
    description: d.terms.meta.description,
    alternates: {
      canonical: `/${lang}/terms`,
      languages: { en: '/en/terms', id: '/id/terms', 'x-default': '/en/terms' }
    }
  };
}

export default async function TermsPage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang).terms;

  return (
    <main className="legal-page">
      <a className="back-home" href={`/${lang}`}>
        {d.back}
      </a>
      <h1>{d.title}</h1>
      <p className="legal-meta">{d.metaLine}</p>

      <p>{d.intro}</p>

      <h2>{d.productsHead}</h2>
      <p>{d.products}</p>

      <h2>{d.trademarksHead}</h2>
      <p>
        {d.trademarksA}
        <a href="https://github.com/efolusi/efolusi" target="_blank" rel="noopener noreferrer">
          github.com/efolusi/efolusi
        </a>
        {d.trademarksB}
      </p>

      <h2>{d.tokenHead}</h2>
      <p>{d.tokenP1}</p>
      <p>{d.tokenP2}</p>
      <p>
        {d.tokenP3a}
        <a href={`/${lang}/token`}>{d.tokenP3link}</a>
        {d.tokenP3b}
      </p>

      <h2>{d.liabilityHead}</h2>
      <p>{d.liability}</p>

      <h2>{d.contactHead}</h2>
      <p>
        {d.contactA}
        <a href="mailto:hi@efolusi.com">hi@efolusi.com</a>.
      </p>
    </main>
  );
}
