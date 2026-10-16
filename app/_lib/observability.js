/* Server-side error reporting.

   Posts Sentry envelopes with plain fetch instead of pulling in @sentry/nextjs:
   the SDK brings a tracing stack and a client bundle, and this site only needs
   "tell me what threw on the server". Building the event by hand also makes
   what leaves the process assertable: the error type, message and stack, the
   route, release, environment, host name and time. Never headers, cookies, a
   request body, the query string, an email or an IP.

   Server only. Nothing here runs in the browser, so the CSP is untouched.
   Off unless SENTRY_DSN is set, so development and tests report nowhere. */

import { hostname } from 'node:os';

/** `https://<key>@<host>/<project>` -> the envelope endpoint for that project. */
export function parseDsn(dsn) {
  try {
    const url = new URL(dsn);
    const projectId = url.pathname.replace(/^\//, '');
    if (!url.username || !projectId) return null;
    return {
      envelopeUrl: `${url.protocol}//${url.host}/api/${projectId}/envelope/?sentry_key=${url.username}&sentry_version=7`,
    };
  } catch {
    return null;
  }
}

/** Node stack lines -> Sentry frames, oldest first (Sentry renders bottom-up). */
export function parseStack(stack) {
  if (!stack) return [];
  const frames = [];
  for (const line of stack.split('\n').slice(1)) {
    const match = /^\s*at (?:(.+?) \()?(.+?):(\d+):(\d+)\)?$/.exec(line);
    if (!match) continue;
    const filename = match[2];
    frames.push({
      filename,
      function: match[1],
      lineno: Number(match[3]),
      colno: Number(match[4]),
      // node_modules is somebody else's code; marking it keeps grouping on ours.
      in_app: !filename.includes('node_modules'),
    });
  }
  return frames.reverse();
}

/** `/en/about?ref=x#top` -> `/en/about`. Query strings can carry anything. */
export function stripQuery(path) {
  if (typeof path !== 'string') return undefined;
  return path.split(/[?#]/)[0];
}

let endpoint = null;
let serverName;
let processHooked = false;

export function initErrorReporting() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) {
    endpoint = null;
    return false;
  }
  const parsed = parseDsn(dsn);
  if (!parsed) {
    console.warn('[efolusi] SENTRY_DSN is not a usable DSN; error reporting stays off');
    endpoint = null;
    return false;
  }
  endpoint = parsed.envelopeUrl;
  serverName = hostname();

  if (!processHooked) {
    processHooked = true;
    // The monitor variant observes without changing whether the process exits.
    process.on('uncaughtExceptionMonitor', (err) => reportError(err, { route: 'process:uncaughtException' }));
    process.on('unhandledRejection', (reason) => reportError(reason, { route: 'process:unhandledRejection' }));
  }
  return true;
}

/* Fire and forget: a reporting outage must never become a site outage, and
   must never delay the response either. */
export function reportError(error, context = {}) {
  if (!endpoint) return;
  const err = error instanceof Error ? error : new Error(String(error));
  const eventId = crypto.randomUUID().replace(/-/g, '');
  const tags = { route: context.route ?? 'unknown', method: context.method ?? 'unknown' };
  const path = stripQuery(context.path);
  if (path) tags.path = path;

  const event = {
    event_id: eventId,
    timestamp: Date.now() / 1000,
    platform: 'node',
    level: 'error',
    logger: 'efolusi-web',
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'production',
    release: process.env.SENTRY_RELEASE || undefined,
    server_name: serverName,
    tags,
    exception: {
      values: [
        {
          type: err.name,
          // The message can carry what the caller passed in, so bound it.
          value: String(err.message).slice(0, 500),
          stacktrace: { frames: parseStack(err.stack) },
        },
      ],
    },
  };

  const body = [
    JSON.stringify({ event_id: eventId, sent_at: new Date().toISOString() }),
    JSON.stringify({ type: 'event' }),
    JSON.stringify(event),
  ].join('\n');

  try {
    void fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/x-sentry-envelope' },
      body,
      signal: AbortSignal.timeout(5000),
    }).catch(() => {
      /* best effort; Next has already logged the error */
    });
  } catch {
    /* same */
  }
}

/* Next's onRequestError hook. Only the method, the path without its query
   string and the route pattern are read; headers are never touched. */
export function reportRequestError(err, request, context) {
  reportError(err, {
    route: context?.routePath ?? stripQuery(request?.path),
    method: request?.method,
    path: request?.path,
  });
}
