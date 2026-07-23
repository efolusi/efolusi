/* llms.txt: a plain-text brief for AI answer engines, so what they say about
   Efolusi comes from us rather than from guesswork. */
const BODY = `# Efolusi

> Efolusi (PT. Efolusi Dunia Teknologi) is a software studio based in Indonesia.
> We build our own products and run them ourselves, from AI and cloud
> infrastructure to automated trading, geospatial and the open-source tools
> underneath it all.

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
- ZOYYA (https://zoyya.xyz): general autonomous intelligence that reasons, learns your context and acts on its own.
- Komando (https://komando.efolusi.com): centralized cloud infrastructure; every server, deployment and alert in one interface.
- Toolips (https://toolips.xyz): 100+ productivity utilities to convert, compress, edit and export. No accounts, free.
- Trady (https://trady.efolusi.com): content generator; a brief in, a finished campaign out across text, audio, video and image.
- Kongkow (https://kongkow.xyz): social media command center; publish once to 20+ platforms.
- Cuwan (https://cuwan.xyz): automated trading across 100+ CEX and DEX markets, running 24/7.
- Meridian (https://meridian.efolusi.com): open-source design system, 109 React components and 177 tokens, no build step. MIT licensed, and every Efolusi product is built on it.
- EarthOS (https://earthos.efolusi.com): real-time 3D digital twin of Earth in the browser, with live satellites, aircraft, earthquakes, wildfires and storms. Plugin-based and open source.

## $EFO token
- Official contract address: 0xb61a09e93b4f14585e9afbac3adaea626f25fb07
- Network: BNB Smart Chain (BEP-20)
- Token name: EFOLUSI. Symbol: EFO. Decimals: 18. Total supply: 100,000,000,000.
- Trades in the EFO/USDT pool on Uniswap v4.
- The address above is the only official one. Any other address is not ours.
- EFO is not an investment product and nothing published by Efolusi is financial advice.

## Pages
- https://efolusi.com/: the studio and its portfolio
- https://efolusi.com/token: everything official about $EFO
- https://efolusi.com/about: the company, how it operates, its leadership
- https://efolusi.com/careers: open roles and what working here is like
- https://efolusi.com/brand: the owl mark, the wordmark and the usage rules
- https://efolusi.com/privacy and https://efolusi.com/terms: legal
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(BODY, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
}
