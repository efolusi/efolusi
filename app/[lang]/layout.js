import '@efolusi/meridian/styles.css';
import '../globals.css';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { themeInitScript } from '@efolusi/meridian/theme';
import { getDictionary, locales } from '../dictionaries/config.js';
import { RELEASE_SHA } from '../lib/release.js';

const siteUrl = 'https://efolusi.com';

/* Only the two locales exist. Anything else in the first segment
   (favicon.ico, typos) is a 404 instead of a copy of the English page.
   The layout checks this itself: `dynamicParams = false` makes OpenNext on
   Workers answer 404 even for the prerendered locales. */

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9F6' },
    { media: '(prefers-color-scheme: dark)', color: '#191512' }
  ]
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    other: { release: RELEASE_SHA },
    title: d.home.meta.title,
    description: d.home.meta.description,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/efolusi/logo-owl-240.png', type: 'image/png', sizes: '240x240' }
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }]
    },
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

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PT Efolusi Dunia Teknologi',
  alternateName: 'Efolusi',
  url: siteUrl,
  logo: `${siteUrl}/efolusi/logo-owl-240.png`,
  email: 'hi@efolusi.com',
  foundingLocation: { '@type': 'Country', name: 'Indonesia' },
  address: { '@type': 'PostalAddress', addressCountry: 'ID' },
  brand: [
    { '@type': 'Brand', name: 'Trady', url: 'https://trady.efolusi.com' },
    { '@type': 'Brand', name: 'Toolips', url: 'https://toolips.xyz' },
    { '@type': 'Brand', name: 'Cuwan', url: 'https://cuwan.xyz' },
    { '@type': 'Brand', name: 'Kongkow', url: 'https://kongkow.xyz' },
    { '@type': 'Brand', name: 'Komando', url: 'https://komando.efolusi.com' },
    { '@type': 'Brand', name: 'Meridian', url: 'https://meridian.efolusi.com' }
  ]
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!locales.includes(lang)) notFound();
  const d = getDictionary(lang);
  // middleware.ts sets the nonce; reading it renders every page per request.
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang={d.htmlLang} suppressHydrationWarning>
      <body>
        <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        {/* JSON-LD is a data block the browser never runs, so script-src and the nonce do not apply. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        {children}
      </body>
    </html>
  );
}
