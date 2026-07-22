import '@efolusi/meridian/styles.css';
import './globals.css';

const siteUrl = 'https://efolusi.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Efolusi · A general software studio building independent products',
  description:
    'Efolusi (PT. Efolusi Dunia Teknologi) is a general software studio in Indonesia. We build and operate independent software products across AI, cloud infrastructure, productivity, content, social media and automated trading.',
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/efolusi/logo-owl.png'
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Efolusi',
    locale: 'en_US',
    title: 'Efolusi · A general software studio building independent products',
    description:
      'A general software studio in Indonesia, building and operating independent software products held to one standard of craft.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Efolusi'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Efolusi · A general software studio building independent products',
    description:
      'A general software studio in Indonesia, building and operating independent software products held to one standard of craft.',
    images: ['/og-image.png']
  }
};

const themeInit = `try{var t=localStorage.getItem('efolusi-theme');if(!t&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)t='dark';if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PT. Efolusi Dunia Teknologi',
  alternateName: 'Efolusi',
  url: siteUrl,
  logo: `${siteUrl}/efolusi/logo-owl.png`,
  email: 'hi@efolusi.com',
  foundingLocation: {
    '@type': 'Country',
    name: 'Indonesia'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID'
  },
  brand: [
    { '@type': 'Brand', name: 'ZOYYA', url: 'https://zoyya.xyz' },
    { '@type': 'Brand', name: 'Komando', url: 'https://komando.efolusi.com' },
    { '@type': 'Brand', name: 'Toolips', url: 'https://toolips.xyz' },
    { '@type': 'Brand', name: 'Trady', url: 'https://trady.efolusi.com' },
    { '@type': 'Brand', name: 'Kongkow', url: 'https://kongkow.xyz' },
    { '@type': 'Brand', name: 'Cuwan', url: 'https://cuwan.xyz' }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        {children}
      </body>
    </html>
  );
}
