import LegalDocument from '../../components/LegalDocument.jsx';
import { getDictionary } from '../../dictionaries/config.js';
import { legalMetadata } from '../../lib/page-meta.js';

export function generateMetadata({ params }) {
  return legalMetadata('aup', params);
}

export default async function AupPage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <LegalDocument doc={d.aup} lang={d.htmlLang} t={d.common} />;
}
