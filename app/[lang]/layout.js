import '@efolusi/meridian/styles.css';
import '../globals.css';
import { getDictionary, locales } from '../dictionaries/config.js';

const siteUrl = 'https://efolusi.com';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: d.home.meta.title,
    description: d.home.meta.description,
    icons: { icon: '/efolusi/logo-owl.png' },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        id: '/id',
        'x-default': '/en'
      }
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${lang}`,
      siteName: 'Efolusi',
      locale: d.ogLocale,
      title: d.home.meta.title,
      description: d.home.meta.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Efolusi' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: d.home.meta.title,
      description: d.home.meta.description,
      images: ['/og-image.png']
    }
  };
}

const themeInit = `try{var t=localStorage.getItem('efolusi-theme');if(!t&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)t='dark';if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PT. Efolusi Dunia Teknologi',
  alternateName: 'Efolusi',
  url: siteUrl,
  logo: `${siteUrl}/efolusi/logo-owl.png`,
  email: 'hi@efolusi.com',
  foundingLocation: { '@type': 'Country', name: 'Indonesia' },
  address: { '@type': 'PostalAddress', addressCountry: 'ID' },
  brand: [
    { '@type': 'Brand', name: 'ZOYYA', url: 'https://zoyya.xyz' },
    { '@type': 'Brand', name: 'Komando', url: 'https://komando.efolusi.com' },
    { '@type': 'Brand', name: 'Toolips', url: 'https://toolips.xyz' },
    { '@type': 'Brand', name: 'Trady', url: 'https://trady.efolusi.com' },
    { '@type': 'Brand', name: 'Kongkow', url: 'https://kongkow.xyz' },
    { '@type': 'Brand', name: 'Cuwan', url: 'https://cuwan.xyz' }
  ]
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const d = getDictionary(lang);

  return (
    <html lang={d.htmlLang} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        {children}
      </body>
    </html>
  );
}
