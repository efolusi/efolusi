import { readFileSync, readdirSync, statSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Button } from '@efolusi/meridian';

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
    expect(html).toContain('<span class="ef-btn__bubble" data-turn="" aria-hidden="true">');
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

/* CtaLink is a link, and Meridian's Button renders only a <button> (no href, as or asChild), so CtaLink keeps its own copy
   of the bubble markup until Meridian ships a link button (gaps row MD146, Meridian 2.6.1). This renders both and compares
   them, so a Meridian change to the bubble fails here instead of drifting silently. */
describe('CtaLink draws the same button and bubble as Meridian\'s Button with iconBubble', () => {
  const parts = (html) => ({
    tag: html.match(/^<(\w+)/)[1],
    className: html.match(/^<\w+[^>]*? class="([^"]*)"/)[1],
    bubble: html.match(/<span class="ef-btn__bubble"[\s\S]*<\/span><\/span>/)?.[0] ?? null,
    bubbleAttrs: html.match(/<span class="ef-btn__bubble"([^>]*)>/)?.[1] ?? null,
    iconSlot: html.match(/<span data-slot="icon"[^>]*>/)?.[0] ?? null,
    svg: html.match(/<svg[\s\S]*<\/svg>/)?.[0] ?? null,
    label: html.replace(/<span class="ef-btn__bubble"[\s\S]*$/, '').replace(/<[^>]+>/g, ''),
  });

  it.each(['primary', 'band'])('%s: the button classes, the label and the whole bubble (span class, data-turn, aria-hidden, icon slot, svg) are equal', (variant) => {
    const meridian = parts(renderToStaticMarkup(<Button variant={variant} size="xl" shape="pill" iconBubble="arrow-up-right">Go</Button>));
    const mine = parts(renderToStaticMarkup(<CtaLink variant={variant} href="#x">Go</CtaLink>));
    expect(meridian.tag).toBe('button');
    expect(mine.tag).toBe('a');
    expect(mine.className).toBe(meridian.className);
    expect(mine.label).toBe(meridian.label);
    expect(mine.bubbleAttrs).toBe(meridian.bubbleAttrs);
    expect(mine.bubbleAttrs).toContain('data-turn=""');
    expect(mine.bubbleAttrs).toContain('aria-hidden="true"');
    expect(mine.iconSlot).toBe(meridian.iconSlot);
    expect(mine.svg).toBe(meridian.svg);
    expect(mine.bubble).toBe(meridian.bubble);
  });

  it('secondary: the same button classes and no bubble in both', () => {
    const meridian = parts(renderToStaticMarkup(<Button variant="secondary" size="xl" shape="pill">Go</Button>));
    const mine = parts(renderToStaticMarkup(<CtaLink variant="secondary" href="#x">Go</CtaLink>));
    expect(mine.className).toBe(meridian.className);
    expect(mine.bubble).toBeNull();
    expect(meridian.bubble).toBeNull();
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
