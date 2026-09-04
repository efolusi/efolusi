/* llms.txt: a plain-text brief for AI answer engines, so what they say about
   Efolusi comes from us rather than from guesswork. */
const BODY = `# Efolusi

> Efolusi (PT. Efolusi Dunia Teknologi) is a software studio based in Indonesia.
> We build and validate software products, open-source projects, and internal
> infrastructure. Product status varies and is stated explicitly below.

## Company
- Legal entity: PT. Efolusi Dunia Teknologi
- Trade name: Efolusi
- Headquarters: Indonesia, distributed team
- Website: https://efolusi.com
- Email: hi@efolusi.com
- Open source: https://github.com/efolusi
- Founder & CEO: Sugeng Agung Suganda
- Co-founder: Rakha Febryza Rasendriya

## Products
- ZOYYA (https://zoyya.xyz): AI-assisted design and application builder for creating designs, websites, mobile apps, backends, databases, previews, and domain-ready releases.
- Runa (https://runa.efolusi.com): the orchestration control plane for personal and business AI teams — set goals, delegate work, review results, and connect approved Efolusi products as tools.
- Relay (https://relay.efolusi.com): one control plane for every AI provider — a single gateway in front of all LLM providers.
- Trady (https://trady.efolusi.com): content clipper — long video in, short clips out. Not a trading product.
- Toolips (https://toolips.xyz): all-in-one tools — Drop. Fix. Download.
- Cuwan (https://cuwan.xyz): automated grid & DCA trading bots; the only trading product in the portfolio.
- Kongkow (https://kongkow.xyz): a community social network with cross-posting — write once, publish to every social network you connect.
- Pay (https://pay.efolusi.com): centralized payment gateway across products — one integration, every payment gateway.
- My (https://my.efolusi.com): identity and SSO — one Efolusi account for every product.
- Loop (https://loop.efolusi.com): specification workspace — the spec comes first.
- Sanctum (https://sanctum.efolusi.com): vault + private knowledge system — a vault your AI can use but never read.
- Komando (https://komando.efolusi.com): omni cloud, server, and monitoring in one dashboard.
- Meridian (https://meridian.efolusi.com): the Efolusi design system, published as the npm package @efolusi/meridian (MIT-licensed, open source).

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
- https://efolusi.com/en/privacy and https://efolusi.com/en/terms: legal
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(BODY, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
}
