/* Structural product data shared by the homepage and the ecosystem page.
   Locale copy (desc, summary, section) lives in the dictionaries under
   home.products keyed by these ids.

   status: 'live' means the URL serves today (checked 2026-08-01); anything
   unreachable is 'building' so no page ever links to a dead product. */
export const productMeta = [
  { id: 'zoyya', title: 'ZOYYA', tint: 'caramel', mark: 'Zo', icon: 'brain', href: 'https://zoyya.xyz', status: 'live' },
  { id: 'komando', title: 'Komando', tint: 'green', mark: 'Ko', icon: 'server', href: 'https://komando.efolusi.com', status: 'building' },
  { id: 'toolips', title: 'Toolips', tint: 'amber', mark: 'To', icon: 'package', href: 'https://toolips.xyz', status: 'building' },
  { id: 'trady', title: 'Trady', tint: 'coral', mark: 'Tr', icon: 'sparkles', href: 'https://trady.efolusi.com', status: 'building' },
  { id: 'kongkow', title: 'Kongkow', tint: 'peach', mark: 'Kg', icon: 'message-square', href: 'https://kongkow.xyz', status: 'building' },
  { id: 'cuwan', title: 'Cuwan', tint: 'green', mark: 'Cu', icon: 'chart-candlestick', href: 'https://cuwan.xyz', status: 'building' },
  { id: 'meridian', title: 'Meridian', tint: 'cocoa', mark: 'Me', icon: 'layout-dashboard', href: 'https://meridian.efolusi.com', status: 'live' },
  { id: 'earthos', title: 'EarthOS', tint: 'green', mark: 'Ea', icon: 'globe', href: 'https://earthos.efolusi.com', status: 'live' }
];
