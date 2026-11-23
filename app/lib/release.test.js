import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { isReleaseSha } from './release.js';

describe('release marker', () => {
  it('accepts only a full lowercase git sha', () => {
    expect(isReleaseSha('4baa90b58b0f84d605b9406392b26e4192640e97')).toBe(true);
    expect(isReleaseSha('4baa90b')).toBe(false);
    expect(isReleaseSha('4BAA90B58B0F84D605B9406392B26E4192640E97')).toBe(false);
    expect(isReleaseSha('')).toBe(false);
    expect(isReleaseSha(undefined)).toBe(false);
  });

  // Pages render per request (each carries a nonce), so no built HTML holds the head to inspect.
  // The contract is pinned in the sources; the outside check after a deploy reads the live head.
  const read = (path) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8');

  it.each([
    ['../[lang]/layout.js', "import { RELEASE_SHA } from '../lib/release.js';"],
    ['../global-not-found.js', "import { RELEASE_SHA } from './lib/release.js';"]
  ])('puts the build sha in the head metadata of %s', (file, importLine) => {
    const src = read(file);
    expect(src).toContain(importLine);
    expect(src).toContain('release: RELEASE_SHA');
  });

  it('inlines the sha at build and stops the build when it is not a full lowercase sha', () => {
    const config = read('../../next.config.mjs');
    expect(config).toContain('NEXT_PUBLIC_RELEASE_SHA: releaseSha');
    expect(config).toContain('GITHUB_SHA');
    expect(config).toContain("/^[0-9a-f]{40}$/.test(releaseSha)");
    expect(read('./release.js')).toContain('process.env.NEXT_PUBLIC_RELEASE_SHA');
  });
});
