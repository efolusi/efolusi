import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { productMeta } from '../app/lib/products.js';

const path = (p) => new URL(p, import.meta.url);

describe('product marks (EF21, EF24)', () => {
  it('every product has its mark at /<id>.svg, and no mark carries a size ratio', () => {
    for (const product of productMeta) {
      expect(product.logo, product.id).toBe(`/${product.id}.svg`);
      expect(product, product.id).not.toHaveProperty('logoRatio');
      expect(existsSync(path(`../public${product.logo}`)), product.logo).toBe(true);
    }
    expect(existsSync(path('../public/meridian-mark.svg'))).toBe(false);
  });

  it('each public mark is a byte-for-byte copy of its source in brand/logos', () => {
    for (const product of productMeta) {
      const source = readFileSync(path(`../brand/logos/${product.id}.svg`));
      expect(readFileSync(path(`../public/${product.id}.svg`)).equals(source), product.id).toBe(true);
    }
  });

  it('the sources and the public marks pass the logo system check', () => {
    for (const dir of ['brand/logos', 'public']) {
      const out = execFileSync('node', ['brand/logos/check.mjs', dir], { cwd: new URL('..', import.meta.url), encoding: 'utf8' });
      expect(out, dir).toContain('CHECK: PASS');
    }
  });

  it('ProductLogo draws every mark size by size, with no per-mark trim', () => {
    const source = readFileSync(path('../app/components/ProductLogo.jsx'), 'utf8');
    expect(source).not.toMatch(/OPTICAL|logoRatio|Math\.sqrt/);
  });
});
