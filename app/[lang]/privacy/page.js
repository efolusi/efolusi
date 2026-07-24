import { getDictionary } from '../../dictionaries/config.js';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.privacy.meta.title,
    description: d.privacy.meta.description,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { en: '/en/privacy', id: '/id/privacy', 'x-default': '/en/privacy' }
    }
  };
}

export default async function PrivacyPage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang).privacy;

  return (
    <main className="legal-page">
      <a className="back-home" href={`/${lang}`}>
        {d.back}
      </a>
      <h1>{d.title}</h1>
      <p className="legal-meta">{d.metaLine}</p>

      <p>{d.intro}</p>

      <h2>{d.collectHead}</h2>
      <ul>
        {d.collect.map(([label, rest]) => (
          <li key={label}>
            <strong>{label}</strong>
            {rest}
          </li>
        ))}
      </ul>

      <h2>{d.notHead}</h2>
      <ul>
        {d.not.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{d.retentionHead}</h2>
      <p>
        {d.retention}
        <a href="mailto:hi@efolusi.com">hi@efolusi.com</a>.
      </p>

      <h2>{d.changesHead}</h2>
      <p>{d.changes}</p>
    </main>
  );
}
