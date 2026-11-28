import { getDictionary } from '../dictionaries/config.js';

const siteUrl = 'https://efolusi.com';

/* Subpages set their own title and description; without this they inherited
   the home page's og:title, og:url and twitter card. */
export function socialMeta(lang, path, title, description) {
  const image = { url: '/og-image.png', width: 1200, height: 630, alt: 'Efolusi' };
  return {
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}${path}`,
      siteName: 'Efolusi',
      locale: getDictionary(lang).ogLocale,
      title,
      description,
      images: [image]
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] }
  };
}

/* Metadata of one legal document (terms, privacy, dpa, sla, aup, cookie, trust): title, canonical, hreflang. */
export async function legalMetadata(kind, params) {
  const { lang } = await params;
  const { meta } = getDictionary(lang)[kind];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/${kind}`,
      languages: { en: `/en/${kind}`, id: `/id/${kind}`, 'x-default': `/en/${kind}` }
    },
    ...socialMeta(lang, `/${kind}`, meta.title, meta.description)
  };
}
