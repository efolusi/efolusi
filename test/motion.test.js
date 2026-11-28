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
