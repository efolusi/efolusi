// Guard for `pnpm run deploy` / `pnpm run preview`.
//
// On 2026-08-03 a deploy shipped a worker that 500'd every route with
// "Module not found in bundle: ./375.js". Root cause: `next dev` was still
// running while `opennextjs-cloudflare build` ran `next build` into the SAME
// `.next/`, so dev-compiler chunks leaked into the production chunk graph and
// the bundler shipped references to files it never included. The build
// "succeeds"; only the deployed worker explodes.
//
// Two defenses, both cheap:
//   1. Refuse to build while anything listens on the dev port.
//   2. Start from a clean `.next/` + `.open-next/` so nothing stale leaks in.

import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';

const DEV_PORT = 3000;

let listener = '';
try {
  listener = execSync(`lsof -nP -iTCP:${DEV_PORT} -sTCP:LISTEN -t`, { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim();
} catch {
  // lsof exits non-zero when nothing listens; that is the good case.
}

if (listener) {
  console.error(
    `deploy refused: something is listening on port ${DEV_PORT} (pid ${listener.split('\n')[0]}), ` +
      `probably \`next dev\`. A dev server writing .next/ during the production ` +
      `build corrupts the deployed bundle (every route 500s). Stop it and retry.`
  );
  process.exit(1);
}

for (const dir of ['.next', '.open-next']) {
  rmSync(dir, { recursive: true, force: true });
}
console.log('predeploy: no dev server on port 3000, .next/ and .open-next/ cleaned');
