import LegalDocument from '../../components/LegalDocument.jsx';
import { getDictionary } from '../../dictionaries/config.js';
import { legalMetadata } from '../../lib/page-meta.js';

export function generateMetadata({ params }) {
  return legalMetadata('cookie', params);
}

export default async function CookiePage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <LegalDocument doc={d.cookie} lang={d.htmlLang} t={d.common} />;
}
