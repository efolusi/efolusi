import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { getDictionary, locales } from '../app/dictionaries/config.js';

const read = (relativePath) => readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8');
const css = read('../app/globals.css');

/* Every page that renders SiteHeader (and so its skip link to #top). */
const pagesWithHeader = [
  '../app/components/HomeClient.jsx',
  '../app/components/NotFoundView.jsx',
  '../app/[lang]/about/page.js',
  '../app/[lang]/brand/page.js',
  '../app/[lang]/careers/page.js',
  '../app/[lang]/portfolio/page.js',
  '../app/[lang]/token/page.js'
];

describe('skip link', () => {
  it.each(locales)('has a %s label', (lang) => {
    expect(getDictionary(lang).common.skipToContent).toMatch(/\S/);
  });

  it('is the first thing SiteHeader renders and points at #top', () => {
    const header = read('../app/components/SiteHeader.jsx');
    const skip = header.indexOf('<a className="skip-link" href="#top">');
    expect(skip).toBeGreaterThan(-1);
    expect(skip).toBeLessThan(header.indexOf('<header'));
  });

  it.each(pagesWithHeader)('%s gives its <main> the target id and tabIndex -1', (path) => {
    const source = read(path);
    expect(source).toContain('SiteHeader');
    // Without tabIndex the browser scrolls but leaves focus in the header.
    expect(source).toMatch(/<main id="top" tabIndex=\{-1\}/);
  });
});

describe('footer status link', () => {
  it('points at the public uptime page', () => {
    // Vitest here has no JSX transform, so the component is read as text.
    const footer = read('../app/components/SiteFooter.jsx');
    expect(footer).toContain("export const STATUS_URL = 'https://stats.uptimerobot.com/SrVLCmD6V7';");
    expect(footer).toMatch(/<a href=\{STATUS_URL\} target="_blank" rel="noopener noreferrer">\s*\{t\.footer\.status\}/);
  });

  it.each(locales)('is labelled in %s', (lang) => {
    expect(getDictionary(lang).common.footer.status).toBe('Status');
  });
});

describe('404 theme', () => {
  it('runs the same pre-paint theme script as every other page', () => {
    const scriptTag = '<script dangerouslySetInnerHTML={{ __html: themeInit }} />';
    expect(read('../app/[lang]/layout.js')).toContain(scriptTag);
    expect(read('../app/global-not-found.js')).toContain(scriptTag);
  });
});

describe('touch target floor (EF-03)', () => {
  it('applies to any coarse pointer, not only phone widths', () => {
    expect(css).toContain('@media (max-width: 640px), (pointer: coarse) {');
    const block = css.slice(css.indexOf('@media (max-width: 640px), (pointer: coarse) {'));
    for (const selector of ['.ef-copyfield .ef-iconbtn::after', '.fcol a', '.footer-mail', '.pill--sm', '.site-nav a']) {
      expect(block).toContain(selector);
    }
  });
});

/* WCAG relative luminance contrast, for the two light-theme pairs that sat
   just under 4.5:1. Hex values are Meridian's tokens. */
const channel = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const over = (fg, alpha, bg) => fg.map((v, i) => v * alpha + bg[i] * (1 - alpha));
const SAND_50 = [0xfa, 0xf9, 0xf6];
const BRAND_700 = [0x7a, 0x4e, 0x2b];
const CREAM_50 = [248, 244, 230];

describe('contrast', () => {
  it('newsletter accent uses brand-700 on the light page', () => {
    expect(css).toMatch(/\.news h3 \.accent \{\n {2}color: var\(--brand-700\);/);
    expect(contrast(BRAND_700, SAND_50)).toBeGreaterThanOrEqual(4.5);
  });

  it('Meridian card muted text clears 4.5:1 on brand-700', () => {
    const match = css.match(/\[data-product='meridian'\] \{\n {2}--card-muted: rgba\(248, 244, 230, ([\d.]+)\);/);
    expect(match).not.toBeNull();
    const alpha = Number(match[1]);
    expect(contrast(over(CREAM_50, alpha, BRAND_700), BRAND_700)).toBeGreaterThanOrEqual(4.5);
    // The old 75% ink was the failure.
    expect(contrast(over(CREAM_50, 0.75, BRAND_700), BRAND_700)).toBeLessThan(4.5);
  });
});
