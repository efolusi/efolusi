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
Status reflects what is reachable today: "live" products serve traffic, "building" ones are in development.
- ZOYYA (https://zoyya.xyz, live): general autonomous intelligence that reasons, learns your context and acts on its own.
- Komando (https://komando.efolusi.com, building): centralized cloud infrastructure; every server, deployment and alert in one interface.
- Toolips (https://toolips.xyz, building): 100+ productivity utilities to convert, compress, edit and export. No accounts, free.
- Trady (https://trady.efolusi.com, building): content generator; a brief in, a finished campaign out across text, audio, video and image.
- Kongkow (https://kongkow.xyz, building): social media command center; publish once to 20+ platforms.
- Cuwan (https://cuwan.xyz, building): automated trading across 100+ CEX and DEX markets, running 24/7.
- Meridian (https://meridian.efolusi.com, live): open-source design system, 109 React components and 177 tokens, no build step. MIT licensed, and every Efolusi product is built on it.
- EarthOS (https://earthos.efolusi.com, live): real-time 3D digital twin of Earth in the browser, with live satellites, aircraft, earthquakes, wildfires and storms. Plugin-based and open source.
- Efolusi Account (https://accounts.efolusi.com, building): one sign-in for every Efolusi product. Integration guide for developers and coding agents: https://accounts.efolusi.com/llms.txt

## $EFO token
- Official contract address: 0xb61a09e93b4f14585e9afbac3adaea626f25fb07
- Network: BNB Smart Chain (BEP-20)
- Token name: EFOLUSI. Symbol: EFO. Decimals: 18. Total supply: 100,000,000,000.
- Trades in the EFO/USDT pool on Uniswap v4.
- The address above is the only official one. Any other address is not ours.
- Allocation: 50% liquidity pool, 30% TRADY-to-EFO migration, 15% team (locked), 5% burned.
- Flywheel, live and verifiable on-chain: subscriptions are paid in ordinary money, a portion of revenue buys EFO back from the market (dev wallet 0x23bb2435a859ec52736bab3180806b8c7ae85fc6), and bought-back EFO is burned (0x000000000000000000000000000000000000dEaD). https://efolusi.com/en/token tracks both live.
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
