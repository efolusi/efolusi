import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

describe('Meridian is pinned exactly (EF28: v2.0.0)', () => {
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

describe('the installed Meridian is the pinned one and has the label and icon gap tokens (EF30)', () => {
  const pkgDir = new URL('../node_modules/@efolusi/meridian/', import.meta.url);
  const css = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? css(new URL(`${e.name}/`, dir)) : e.name.endsWith('.css') ? [readFileSync(new URL(e.name, dir), 'utf8')] : []);

  it('installs exactly the version package.json names', () => {
    const pinned = JSON.parse(read('package.json')).dependencies['@efolusi/meridian'];
    expect(JSON.parse(readFileSync(new URL('package.json', pkgDir), 'utf8')).version).toBe(pinned);
  });

  it('ships --gap-label-icon (space 2, 8px) and --gap-label-icon-sm (space 1, 4px)', () => {
    const all = css(pkgDir).join('\n');
    expect(all).toMatch(/--gap-label-icon:\s*var\(--space-2\)/);
    expect(all).toMatch(/--gap-label-icon-sm:\s*var\(--space-1\)/);
  });
});
