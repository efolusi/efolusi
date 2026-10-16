/* Server error reporting (see app/_lib/observability.js). The reporter uses
   node:os, so it is only loaded in the Node.js runtime; the edge middleware
   bundle never sees it. */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initErrorReporting } = await import('./app/_lib/observability.js');
    initErrorReporting();
  }
}

export async function onRequestError(
  err: unknown,
  request: { path: string; method: string },
  context: { routePath?: string },
) {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { reportRequestError } = await import('./app/_lib/observability.js');
    reportRequestError(err, request, context);
  }
}
