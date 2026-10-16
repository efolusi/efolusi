import LegalDocument from '../../components/LegalDocument.jsx';
import { getDictionary } from '../../dictionaries/config.js';
import { socialMeta } from '../../lib/page-meta.js';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.terms.meta.title,
    description: d.terms.meta.description,
    alternates: {
      canonical: `/${lang}/terms`,
      languages: { en: '/en/terms', id: '/id/terms', 'x-default': '/en/terms' }
    },
    ...socialMeta(lang, '/terms', d.terms.meta.title, d.terms.meta.description)
  };
}

export default async function TermsPage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <LegalDocument doc={d.terms} lang={d.htmlLang} />;
}
