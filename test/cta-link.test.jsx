import { readFileSync, readdirSync, statSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import CtaLink from '../app/components/CtaLink.jsx';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const walk = (dir) =>
  readdirSync(new URL(`../${dir}/`, import.meta.url)).flatMap((name) => {
    const rel = `${dir}/${name}`;
    return statSync(new URL(`../${rel}`, import.meta.url)).isDirectory() ? walk(rel) : [rel];
  });
const sources = walk('app').filter((file) => /\.(jsx?|css)$/.test(file) && !file.endsWith('.test.js'));

/* The 13 call-to-action buttons were local `.pill` classes with their own bubble; they are Meridian's xl pill button now
   (EF: pill to Meridian Button, with the 2.6.0 arrow bubble). */
describe('the call-to-action buttons are Meridian buttons, with no local pill CSS', () => {
  it('no file under app/ uses a .pill, .pill--* or .pill-arrow class', () => {
    for (const file of sources) {
      expect(read(file), file).not.toMatch(/\.pill(?![\w-])|\bpill--|\bpill-arrow|className="pill/);
    }
  });

  it('the 13 buttons are CtaLink, 6 on the home page, 2 on the 404, 1 on token and about and brand, 2 on careers', () => {
    const count = (file) => (read(file).match(/<CtaLink\b/g) ?? []).length;
    expect(count('app/components/HomeClient.jsx')).toBe(6);
    expect(count('app/components/NotFoundView.jsx')).toBe(2);
    expect(count('app/[lang]/token/page.js')).toBe(1);
    expect(count('app/[lang]/about/page.js')).toBe(1);
    expect(count('app/[lang]/brand/page.js')).toBe(1);
    expect(count('app/[lang]/careers/page.js')).toBe(2);
  });
});

describe('CtaLink', () => {
  it('primary: the xl pill with the arrow bubble, the bubble hidden from assistive tech', () => {
    const html = renderToStaticMarkup(<CtaLink href="#x">Go</CtaLink>);
    expect(html).toContain('class="ef-btn ef-btn--primary ef-btn--xl ef-btn--pill ef-btn--bubble"');
    expect(html).toContain('<span class="ef-btn__bubble" data-turn="true" aria-hidden="true">');
    expect(html).toContain('href="#x"');
  });

  it('secondary: the xl pill with no bubble', () => {
    const html = renderToStaticMarkup(<CtaLink variant="secondary" href="#x">Go</CtaLink>);
    expect(html).toContain('class="ef-btn ef-btn--secondary ef-btn--xl ef-btn--pill"');
    expect(html).not.toContain('ef-btn__bubble');
  });

  it('band: the cream button for the cream and dark bands, with the bubble', () => {
    const html = renderToStaticMarkup(<CtaLink variant="band" href="#x">Go</CtaLink>);
    expect(html).toContain('class="ef-btn ef-btn--band ef-btn--xl ef-btn--pill ef-btn--bubble"');
    expect(html).toContain('ef-btn__bubble');
  });

  it('passes target and rel through to the link', () => {
    const html = renderToStaticMarkup(<CtaLink variant="secondary" href="https://x.test" target="_blank" rel="noopener noreferrer">Go</CtaLink>);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});

describe('the installed Meridian has the 2.6.0 button parts the CTA needs', () => {
  const css = read('node_modules/@efolusi/meridian/components.css');
  it.each(['.ef-btn--bubble', '.ef-btn__bubble', '.ef-btn--band{'])('ships %s', (selector) => {
    expect(css).toContain(selector);
  });

  it('the arrow turns 45 degrees on hover and focus for a bubble that carries data-turn', () => {
    expect(css).toMatch(/\.ef-btn--bubble:is\(:hover,:focus-visible\) \.ef-btn__bubble\[data-turn\] \[data-slot="icon"\]\{rotate:45deg\}/);
  });

  it('the band button keeps its accent-edge boundary on the cream band (1.4.11)', () => {
    expect(css).toMatch(/\.ef-btn--band\{[^}]*border-color:var\(--accent-edge\)/);
  });
});
