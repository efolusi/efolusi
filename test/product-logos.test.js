import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { productById, productMeta } from '../app/lib/products.js';

describe('product marks (EF21)', () => {
  it('serves an SVG with a viewBox for every product logo', () => {
    for (const product of productMeta.filter((p) => p.logo)) {
      const file = new URL(`../public${product.logo}`, import.meta.url);
      expect(existsSync(file), product.logo).toBe(true);
      expect(readFileSync(file, 'utf8'), product.logo).toMatch(/viewBox="[\d.\s-]+"/);
      expect(product.logoRatio, product.id).toBeGreaterThan(0);
    }
  });

  it('gives Glamor and Design Tokens their marks', () => {
    expect(productById.glamor.logo).toBe('/glamor.svg');
    expect(productById['design-tokens'].logo).toBe('/design-tokens.svg');
    expect(productById.glamor.logoRatio).toBe(1);
    expect(productById['design-tokens'].logoRatio).toBe(1);
  });
});
