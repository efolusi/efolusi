import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { getDictionary, locales } from '../app/dictionaries/config.js';

vi.mock('next/navigation', () => ({ usePathname: () => '/en' }));

const { default: SiteHeader } = await import('../app/components/SiteHeader.jsx');

/* A signed-in visitor who follows `next=` is sent straight back to the page they
   came from, so the button looks dead. Without it they land on /account. */
/* The server render cannot show the bug: the old code added next= in an effect,
   after the first render. So the source is checked as well. */
describe('the header Sign in links carry no next parameter', () => {
  const source = readFileSync(new URL('../app/components/SiteHeader.jsx', import.meta.url), 'utf8');

  it('the source builds no next, returnTo or window.location', () => {
    expect(source).not.toMatch(/next=/);
    expect(source).not.toMatch(/returnTo/);
    expect(source).not.toMatch(/window\.location/);
  });

  for (const lang of locales) {
    const html = renderToStaticMarkup(createElement(SiteHeader, { lang, t: getDictionary(lang).common }));
    const hrefs = (cls) =>
      [...html.matchAll(/<a\b[^>]*>/g)]
        .map((m) => m[0])
        .filter((tag) => new RegExp(`class="[^"]*\\b${cls}\\b`).test(tag))
        .map((tag) => tag.match(/href="([^"]*)"/)[1]);

    it(`${lang}: the pill goes to my sign-in with the language only`, () => {
      expect(hrefs('sign-in-pill')).toEqual([`https://my.efolusi.com/sign-in?lang=${lang}`]);
    });

    it(`${lang}: the mobile menu link goes to my sign-in with the language only`, () => {
      expect(hrefs('menu-signin')).toEqual([`https://my.efolusi.com/sign-in?lang=${lang}`]);
    });

    it(`${lang}: no link in the header sends next=`, () => {
      expect(html).not.toMatch(/[?&]next=/);
    });
  }
});
