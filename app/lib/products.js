/* Structural data (ids, tints, logos, icons, links, titles) is locale-agnostic;
   the copy for each product is merged in from the dictionary by id. */
export const productMeta = [
  { id: 'komando', title: 'Komando', tint: 'green', logo: '/komando.svg', logoRatio: 1.516, icon: 'server', href: 'https://komando.efolusi.com' },
  { id: 'trady', title: 'Trady', tint: 'coral', logo: '/trady.svg', logoRatio: 1.592, icon: 'video', href: 'https://trady.efolusi.com' },
  { id: 'toolips', title: 'Toolips', tint: 'amber', logo: '/toolips.svg', logoRatio: 0.929, icon: 'package', href: 'https://toolips.xyz' },
  { id: 'cuwan', title: 'Cuwan', tint: 'green', logo: '/cuwan.svg', logoRatio: 1.145, icon: 'chart-candlestick', href: 'https://cuwan.xyz' },
  { id: 'kongkow', title: 'Kongkow', tint: 'peach', logo: '/kongkow.svg', logoRatio: 0.992, icon: 'message-square', href: 'https://kongkow.xyz' },
  { id: 'meridian', title: 'Meridian', tint: 'cocoa', logo: '/meridian-mark.svg', logoRatio: 1.879, icon: 'layout-dashboard', href: 'https://meridian.efolusi.com' },
  { id: 'glamor', title: 'Glamor', tint: 'cocoa', icon: 'smartphone', href: 'https://github.com/efolusi/glamor' },
  { id: 'design-tokens', title: 'Design Tokens', tint: 'amber', icon: 'sliders-horizontal', href: 'https://github.com/efolusi/design-tokens' }
];

/* logoRatio is width / height of each SVG's tight viewBox, used by ProductLogo
   to give every mark the same optical area. */
export const productById = Object.fromEntries(productMeta.map(product => [product.id, product]));
