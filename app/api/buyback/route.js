import { getBalances } from '../_lib/buyback.js';

const HEADERS = { 'cache-control': 'public, max-age=15, s-maxage=30, stale-while-revalidate=60' };

/* Workers do not cache their own responses by themselves, so the answer goes
   into the colo cache for 30 s, keyed by the request URL. Without the Workers
   cache (tests, next start) the route just answers. */
function edgeCache() {
  return typeof caches !== 'undefined' && caches.default ? caches.default : null;
}

/* Read-only: no body, no query, no secret. */
export async function GET(request) {
  const edge = edgeCache();
  const key = new Request(new URL(request.url).origin + '/api/buyback');
  if (edge) {
    const hit = await edge.match(key);
    if (hit) return hit;
  }
  const balances = await getBalances();
  if (!balances) {
    return Response.json({ error: 'Unavailable' }, { status: 503, headers: { 'cache-control': 'no-store' } });
  }
  const res = Response.json(balances, { headers: HEADERS });
  if (edge && !balances.stale) await edge.put(key, res.clone());
  return res;
}
