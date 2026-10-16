import LegalDocument from '../../components/LegalDocument.jsx';
import { getDictionary } from '../../dictionaries/config.js';
import { socialMeta } from '../../lib/page-meta.js';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: d.privacy.meta.title,
    description: d.privacy.meta.description,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { en: '/en/privacy', id: '/id/privacy', 'x-default': '/en/privacy' }
    },
    ...socialMeta(lang, '/privacy', d.privacy.meta.title, d.privacy.meta.description)
  };
}

export default async function PrivacyPage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <LegalDocument doc={d.privacy} lang={d.htmlLang} />;
}
