import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

describe('Meridian is pinned until its bump pull request (EF26)', () => {
  const version = JSON.parse(read('package.json')).dependencies['@efolusi/meridian'];

  it('package.json names one exact version, no range', () => {
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('the lockfile asks for the same version and resolves it', () => {
    const lock = read('pnpm-lock.yaml');
    expect(lock).toMatch(new RegExp(`'@efolusi/meridian':\\n\\s+specifier: ${version.replace(/\./g, '\\.')}\\n\\s+version: ${version.replace(/\./g, '\\.')}\\(`));
  });
});

describe('no dead Meridian mark CSS', () => {
  it('app/globals.css has no .meridian-mark rule (no component uses the class)', () => {
    expect(read('app/globals.css')).not.toMatch(/\.meridian-mark/);
  });
});
