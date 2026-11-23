import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ThemeToggle } from '@efolusi/meridian';

describe('the theme switch has two choices (EF25)', () => {
  for (const lang of ['en', 'id']) {
    const html = renderToStaticMarkup(createElement(ThemeToggle, { lang }));

    it(`${lang}: light and dark only, no system option or label`, () => {
      expect(html).not.toMatch(/system|sistem/i);
      expect(html).toMatch(/data-theme-shown="(light|dark)"/);
      expect(html).toMatch(/aria-label="[^"]*(dark|gelap)[^"]*"/i);
    });

    it(`${lang}: the shown theme is data-theme-shown, not data-preference`, () => {
      expect(html).toContain('data-theme-shown');
      expect(html).not.toContain('data-preference');
    });
  }
});
