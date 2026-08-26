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
- ZOYYA (https://zoyya.xyz): active-beta workspace where humans and goal-specific agents work together; Nova is being consolidated into it as ZOYYA Desktop.
- Komando (https://komando.efolusi.com): internal shared infrastructure layer in development; not an external commercial product.
- Toolips (https://toolips.xyz): capability and integration layer being standardized for ZOYYA invocation.
- Trady (https://trady.efolusi.com): video-repurposing workflow in paid-customer validation.
- Kongkow (https://kongkow.xyz): social product in repositioning and revenue validation; product-market fit is not yet proven.
- Cuwan (https://cuwan.xyz): high-risk trading automation in safety-gated revenue validation; performance and customer claims require auditable evidence.
- Meridian (https://meridian.efolusi.com): MIT-licensed open-source design system.
- EarthOS (https://earthos.efolusi.com): open-source geospatial core taken out of the active roadmap pending a proven use case and business model.

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
