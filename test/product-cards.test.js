import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import ProductPortfolio from '../app/components/ProductPortfolio.jsx';
import { getDictionary } from '../app/dictionaries/config.js';
import { productMeta } from '../app/lib/products.js';

const render = (lang, full) =>
  renderToStaticMarkup(createElement(ProductPortfolio, { products: getDictionary(lang).home.products, lang, full }));

const tops = (html) => [...html.matchAll(/<div class="portfolio-card-top">([\s\S]*?)<\/div>/g)].map((m) => m[1]);

describe('product cards carry only the logo and the name (EF22)', () => {
  for (const lang of ['en', 'id']) {
    for (const full of [false, true]) {
      const view = `${lang} ${full ? 'portfolio page' : 'home'}`;

      it(`${view}: no card renders an accessory`, () => {
        const html = render(lang, full);
        expect(html).not.toContain('portfolio-accessory');
      });

      it(`${view}: every card top is the logo, then one label, and nothing else`, () => {
        const list = tops(render(lang, full));
        expect(list.length).toBe(productMeta.length);
        for (const top of list) {
          // The portfolio page keeps its link arrow after the label; the home cards end at the label.
          const arrow = full ? '(<span data-slot="icon"[\\s\\S]*?</span>)?' : '';
          expect(top).toMatch(new RegExp(`^<span class="portfolio-mark [^"]*" aria-hidden="true"><span class="product-glyph"[^>]*></span></span><span>[^<]+</span>${arrow}$`));
        }
      });
    }
  }
});
