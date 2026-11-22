import { releaseRepos } from './latest-releases.mjs';

/* Structural data (ids, tints, logos, links, titles) is locale-agnostic;
   the copy for each product is merged in from the dictionary by id. */
export const productMeta = [
  { id: 'komando', title: 'Komando', tint: 'green', logo: '/komando.svg', href: 'https://komando.efolusi.com' },
  { id: 'trady', title: 'Trady', tint: 'coral', logo: '/trady.svg', href: 'https://trady.efolusi.com' },
  { id: 'toolips', title: 'Toolips', tint: 'amber', logo: '/toolips.svg', href: 'https://toolips.xyz' },
  { id: 'cuwan', title: 'Cuwan', tint: 'green', logo: '/cuwan.svg', href: 'https://cuwan.xyz' },
  { id: 'kongkow', title: 'Kongkow', tint: 'peach', logo: '/kongkow.svg', href: 'https://kongkow.xyz' },
  { id: 'meridian', title: 'Meridian', tint: 'cocoa', logo: '/meridian.svg', href: 'https://meridian.efolusi.com' },
  { id: 'glamor', title: 'Glamor', tint: 'cocoa', logo: '/glamor.svg', href: 'https://github.com/efolusi/glamor' },
  { id: 'design-tokens', title: 'Design Tokens', tint: 'amber', logo: '/design-tokens.svg', href: 'https://github.com/efolusi/design-tokens' }
];

export const productById = Object.fromEntries(productMeta.map(product => [product.id, product]));

/* Latest release tag of each product that ships one. next.config.mjs reads them
   from GitHub at build time (app/lib/latest-releases.mjs) and hands them over in
   EFOLUSI_RELEASES. A product without a release, or whose lookup failed, is null
   and shows no version. */
export const releases = { ...Object.fromEntries(Object.keys(releaseRepos).map(id => [id, null])), ...JSON.parse(process.env.EFOLUSI_RELEASES ?? '{}') };

/* ", release <tag>" for prose, or nothing when there is no tag. */
export const withRelease = (tag, label) => (tag ? `, ${label} ${tag}` : '');
