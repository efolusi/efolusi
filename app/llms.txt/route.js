/* llms.txt: a plain-text brief for AI answer engines, so what they say about
   Efolusi comes from us rather than from guesswork. */
import { releases, withRelease } from '../lib/products.js';

const BODY = `# Efolusi

> Efolusi (PT Efolusi Dunia Teknologi) is a software studio based in Indonesia.
> We build and validate software products, open-source projects, and internal
> infrastructure. Product status varies and is stated explicitly below.

## Company
- Legal entity: PT Efolusi Dunia Teknologi
- Trade name: Efolusi
- Headquarters: Indonesia, distributed team
- Website: https://efolusi.com
- Email: hi@efolusi.com
- Open source: https://github.com/efolusi
- Founder & CEO: Sugeng Agung Suganda
- Co-founder: Rakha Febryza Rasendriya

## Products
Every product starts as an open-source command line (CLI) that runs on the user's own machine, for people and their AI agents. Desktop, mobile and web apps wrap the same CLI. Versions are the latest release tags.
- Komando (https://komando.efolusi.com): one safe command line for servers, databases, caches, queues, storage, clusters and VPNs. Passwords stay in an encrypted vault the AI agent never sees. Open source (AGPL-3.0)${withRelease(releases.komando, 'release')}. Source: https://github.com/sgnd/komando
- Toolips (https://toolips.xyz): one local command line for PDFs, images, secret scans and TLS checks. Open source${withRelease(releases.toolips, 'release')}. Source: https://github.com/sgnd/toolips
- Trady (https://trady.efolusi.com): one local command line that turns long recordings into short captioned clips. Not a trading product. Open source${withRelease(releases.trady, 'release')}. Source: https://github.com/sgnd/trady
- Kongkow (https://kongkow.xyz): one local command line to draft, schedule and publish social media posts. Open source${withRelease(releases.kongkow, 'release')}. Source: https://github.com/sgnd/kongkow
- Cuwan (https://cuwan.xyz): one local command line for grid trading bots on crypto exchanges; the only trading product in the portfolio. Open source${withRelease(releases.cuwan, 'release')}. Source: https://github.com/sgnd/cuwan
- Meridian (https://meridian.efolusi.com): the web design system, published as the npm package @efolusi/meridian (Apache-2.0).
- Glamor (https://github.com/efolusi/glamor): the native design system for Mac, iPhone and iPad, built on SwiftUI (Apache-2.0).
- Design Tokens (https://github.com/efolusi/design-tokens): shared design tokens for Meridian and Glamor (Apache-2.0).

## Shared platform
- Efolusi SSO (https://my.efolusi.com) and Efolusi Pay: one account and one billing system shared by all products. They are not separate products.

## $EFO token
- Official contract address: 0xb61a09e93b4f14585e9afbac3adaea626f25fb07
- Network: BNB Smart Chain (BEP-20)
- Token name: EFOLUSI. Symbol: EFO. Decimals: 18. Total supply: 100,000,000,000.
- Trades in the EFO/USDT pool on Uniswap v4.
- The address above is the only official one. Any other address is not ours.
- Allocation: 50% liquidity pool, 30% TRADY-to-EFO migration, 15% team (locked), 5% burned.
- Any product subscription is denominated in ordinary money; nobody is required to pay in EFO. Any buyback-and-burn transaction must use the disclosed wallets and remain independently verifiable on-chain. Dev wallet: 0x23bb2435a859ec52736bab3180806b8c7ae85fc6. Revenue wallet: 0x0297e732858a4d99f5e6aa5ec72fb9f715396f4e. Burn address: 0x000000000000000000000000000000000000dEaD. On-chain figures are shown at https://efolusi.com/en/token.
- Nobody is ever required to pay in EFO; every product works without it.
- EFO is not an investment product and nothing published by Efolusi is financial advice.

## Pages
The site is available in English (/en) and Indonesian (/id); English URLs are listed below.
- https://efolusi.com/en: the studio and its portfolio
- https://efolusi.com/en/token: everything official about $EFO
- https://efolusi.com/en/about: the company, how it operates, its leadership
- https://efolusi.com/en/careers: open roles and what working here is like
- https://efolusi.com/en/brand: the owl mark, the wordmark and the usage rules
- https://efolusi.com/en/terms: Efolusi platform terms, covering the Efolusi account (my.efolusi.com), this site, and Relay, Loop, Runa, Komando, Sanctum and Kongkow (refunds at #refunds, Efolusi Pay terms at #pay)
- https://efolusi.com/en/privacy: Efolusi platform privacy notice for the same scope; Trady, Cuwan, ZOYYA and Toolips have their own terms and privacy pages
- https://efolusi.com/en/dpa: Efolusi Pay data processing agreement
- https://efolusi.com/en/sla: Efolusi Pay service level agreement
- https://efolusi.com/en/aup: Efolusi Pay acceptable use policy
- https://efolusi.com/en/cookie: Efolusi Pay cookie policy
- https://efolusi.com/en/trust: Efolusi Pay security controls and sub-processor list
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(BODY, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
}
