import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('app/globals.css');
const home = read('app/components/HomeClient.jsx');

describe('the hero is visible at first paint (EF41)', () => {
  it('no hero block is a .reveal', () => {
    const hero = home.slice(home.indexOf('<section className="hero'), home.indexOf('<div className="marquee"'));
    expect(hero).not.toMatch(/\breveal\b/);
  });

  it('.reveal hides nothing until the script has set .reveal-ready', () => {
    const base = css.match(/\n\.reveal \{[^}]*\}/)[0];
    expect(base).not.toMatch(/opacity: 0/);
    expect(css).toMatch(/\.reveal-ready \.reveal:not\(\.in\) \{\n {2}opacity: 0;/);
    expect(home).toContain("document.documentElement.classList.add('reveal-ready');");
  });

  it('reduced motion shows everything at once', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\) \{\n {2}\.reveal,\n {2}\.reveal-ready \.reveal:not\(\.in\) \{\n {4}opacity: 1;/);
  });
});

describe('the scroll reveal is real (EF43)', () => {
  it('has no timer that reveals every block 1.6 s after mount', () => {
    expect(home).not.toMatch(/fallbackTimer|setTimeout/);
  });
});

describe('no endless pulse marks a state that is not live (EF44)', () => {
  it('the hero status dot does not pulse', () => {
    expect(home).not.toMatch(/<StatusDot[^>]*\bpulse\b/);
  });
});

describe('a page enters once (EF42)', () => {
  it('<main> has no entrance animation of its own beside the view transition', () => {
    expect(css).toContain('navigation: auto;');
    expect(css).not.toMatch(/page-in/);
  });
});

describe('the feature cards keep their reveal fade (EF43)', () => {
  it('.feat-card lists opacity in its own transition', () => {
    const rule = css.match(/\n\.feat-card \{[^}]*\}/)[0];
    expect(rule).toMatch(/transition:[^;]*opacity var\(--dur-slow\)/);
  });
});

describe('reduced motion reaches every animation (EF46)', () => {
  const blocks = css.split('@media (prefers-reduced-motion: reduce) {').slice(1).join('\n');
  const named = (selector) => expect(blocks, selector).toContain(selector);

  it('stops the infinite floats and the pop-in', () => {
    for (const selector of ['.sticker,', '.edge-tile,', '.tile-card {\n    animation: none;']) named(selector);
  });

  it('draws the scribble at once instead of leaving it hidden', () => {
    expect(blocks).toMatch(/\.scribble path \{\n {4}animation: none;\n {4}stroke-dashoffset: 0;/);
  });

  it('takes the movement out of the hover lifts and nudges', () => {
    for (const selector of ['.feat-card:hover', '.role:hover .role-arrow', '.pill:hover .pill-arrow', '.edge-tile:hover .tile-card']) named(selector);
  });
});
