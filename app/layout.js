import './globals.css';

export const metadata = {
  title: 'Efolusi - Software products built to lead their category',
  description:
    'Efolusi is an Indonesian software studio building independent products across AI, cloud infrastructure, productivity, content, social and automated trading - each built to lead its category.',
  icons: {
    icon: '/efolusi/logo-owl.png'
  },
  openGraph: {
    type: 'website',
    title: 'Efolusi - Software products built to lead their category',
    description:
      'We build software for developers, creators, traders and operators. Each product is designed to earn its place in your workflow.'
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-show="stage" data-band="off">
        {children}
      </body>
    </html>
  );
}