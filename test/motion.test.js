import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { getDictionary } from '../app/dictionaries/config.js';

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
  it('has no timer that reveals every block after a fixed time', () => {
    expect(home).not.toMatch(/fallbackTimer|setTimeout/);
  });
});

describe('the status dot keeps its slow pulse, stopped by the pause button (EF44, reversed 2026-11-28)', () => {
  it('the hero status dot pulses', () => {
    expect(home).toMatch(/<StatusDot[^>]*\bpulse\b/);
  });
});

describe('a page enters once (EF42, reversed 2026-11-28)', () => {
  it('<main> fades in and rises on load and on every in-app navigation, beside the view transition', () => {
    expect(css).toContain('navigation: auto;');
    expect(css).toMatch(/\nmain \{\n {2}animation: enter-rise var\(--dur-slow\) var\(--ease-enter\) both;/);
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

describe('no dead motion CSS (EF48)', () => {
  it.each(['.stage', '.plist', '.switch ', '.portfolio-deco', '.wm-', 'watermark-in'])('globals.css has no %s rule', (name) => {
    expect(css).not.toContain(name);
  });
});

describe('moving decoration can be paused (WCAG 2.2.2)', () => {
  it.each(['en', 'id'])('%s has a pause and a play label', (lang) => {
    const common = getDictionary(lang).common;
    expect(common.pauseMotion).toMatch(/\S/);
    expect(common.playMotion).toMatch(/\S/);
    expect(common.pauseMotion).not.toBe(common.playMotion);
  });

  it('the home page has a real button that flips the page into paused motion', () => {
    expect(home).toMatch(/aria-label=\{motionPaused \? common\.playMotion : common\.pauseMotion\}/);
    expect(home).toMatch(/onClick=\{\(\) => setMotionPaused\(\(value\) => !value\)\}/);
    expect(home).toMatch(/<main id="top" tabIndex=\{-1\} className=\{motionPaused \? 'is-motion-paused' : undefined\}>/);
  });

  it('paused motion stops the marquee and the floating stickers and tiles', () => {
    const rule = css.match(/\.is-motion-paused[^{]*\{[^}]*\}/)[0];
    for (const selector of ['.marquee-track', '.sticker', '.edge-tile']) expect(rule).toContain(selector);
    expect(rule).toContain('animation-play-state: paused;');
  });

  it('the button is a 44 px target and hides when motion is already reduced', () => {
    expect(home).toMatch(/size="icon-lg"/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\) \{[^@]*\.marquee-pause \{\n {4}display: none;/);
  });
});
