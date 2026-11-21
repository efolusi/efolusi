import { getBalances } from '../_lib/buyback.js';

/* Read-only: no body, no query, no secret. The cache lives in the helper. */
export async function GET() {
  const balances = await getBalances();
  if (!balances) {
    return Response.json({ error: 'Unavailable' }, { status: 503, headers: { 'cache-control': 'no-store' } });
  }
  return Response.json(balances, { headers: { 'cache-control': 'public, max-age=15, s-maxage=30, stale-while-revalidate=60' } });
}
