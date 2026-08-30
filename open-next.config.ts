import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

/* Fully static site: prerendered pages are served from the read-only
   static-assets cache. Cache interception stays off; it wrote responses into
   the persistent Cache API with year-long TTLs that outlived deploys, and its
   stale path requires a revalidation queue this site has no use for. */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache
});
