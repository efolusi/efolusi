import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { latestReleases, releaseRepos } from './app/lib/latest-releases.mjs';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
];

// The release marker: the full git sha of this build, in every page's head
// (`<meta name="release">`). CI gives it as GITHUB_SHA; locally it comes from git.
// A build without a valid sha stops, so no page ships a wrong marker.
const releaseSha = process.env.GITHUB_SHA ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (!/^[0-9a-f]{40}$/.test(releaseSha)) throw new Error('release sha is not 40 lowercase hex characters');

// Every file in public/ as a URL path. Middleware cannot read the disk, so it gets this list through env.
const publicDir = fileURLToPath(new URL('./public', import.meta.url));
const publicFiles = readdirSync(publicDir, { recursive: true, withFileTypes: true })
  // Names starting with _ (_headers, _redirects) are Cloudflare config, never served.
  .filter((entry) => entry.isFile() && !entry.name.startsWith('_'))
  .map((entry) => `/${relative(publicDir, `${entry.parentPath}/${entry.name}`)}`);

// The newest release tag of each product, read from GitHub on every build so the cards cannot go stale.
// A failed lookup leaves that product without a version and says so in the build log.
// Tests import this file, so they skip the network (VITEST) and see no versions.
const releases = process.env.VITEST ? {} : await latestReleases(releaseRepos).then(({ tags, failed }) => {
  if (failed.length) console.warn(`WARNING: release lookup failed for ${failed.join(', ')}; the site shows no version for them.`);
  return tags;
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: { NEXT_PUBLIC_RELEASE_SHA: releaseSha, EFOLUSI_PUBLIC_FILES: JSON.stringify(publicFiles), EFOLUSI_RELEASES: JSON.stringify(releases) },
  // app/global-not-found.js renders every unknown URL. The root layout sits
  // under [lang], so without it unknown URLs got an empty error shell.
  experimental: { globalNotFound: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      },
      {
        // Every host except production (workers.dev, previews, localhost)
        // is kept out of search indexes, pages and assets alike.
        source: '/(.*)',
        missing: [{ type: 'host', value: 'efolusi.com' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
      },
      // Pages get their CSP, with a per-request nonce, from middleware.ts.
      // API routes answer JSON and run no scripts.
      {
        source: '/api/:path*',
        headers: [{ key: 'Content-Security-Policy', value: "default-src 'none'; frame-ancestors 'none'" }]
      }
    ];
  },
  async redirects() {
    // The old unprefixed content URLs moved permanently to their English
    // equivalents. `/` is NOT here: it is the language gateway, and these
    // redirects run before middleware, which would make the guess unreachable.
    const moved = ['about', 'careers', 'portfolio', 'token', 'brand', 'privacy', 'terms'];
    return moved.map((path) => ({
      source: `/${path}`,
      destination: `/en/${path}`,
      permanent: true
    }));
  }
};

export default nextConfig;

// `next dev` gets the wrangler.jsonc bindings (rate limits) through the OpenNext adapter.
if (process.env.NODE_ENV === 'development') {
  const { initOpenNextCloudflareForDev } = await import('@opennextjs/cloudflare');
  initOpenNextCloudflareForDev();
}
