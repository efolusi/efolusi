import '@efolusi/meridian/styles.css';
import './globals.css';

export const metadata = {
  title: 'Efolusi - General-purpose software products built with intent',
  description:
    'Efolusi is an Indonesian software studio building independent products across AI, cloud infrastructure, productivity, content, social and automation - broad software, one standard of craft.',
  icons: {
    icon: '/efolusi/logo-owl.png'
  },
  openGraph: {
    type: 'website',
    title: 'Efolusi - General-purpose software products built with intent',
    description:
      'We build independent software across categories. Every product is designed to make digital work clearer, faster and more capable.'
  },
  twitter: {
    card: 'summary_large_image'
  }
};

const themeInit = `try{var t=localStorage.getItem('efolusi-theme');if(!t&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)t='dark';if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
