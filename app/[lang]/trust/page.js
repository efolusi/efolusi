import LegalDocument from '../../components/LegalDocument.jsx';
import { getDictionary } from '../../dictionaries/config.js';
import { legalMetadata } from '../../lib/page-meta.js';

export function generateMetadata({ params }) {
  return legalMetadata('trust', params);
}

export default async function TrustPage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <LegalDocument doc={d.trust} lang={d.htmlLang} t={d.common} />;
}
