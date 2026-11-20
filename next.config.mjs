const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
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
