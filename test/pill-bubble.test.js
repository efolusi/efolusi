import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('app/globals.css');
const tokens = read('node_modules/@efolusi/meridian/tokens/colors.css');

/* The body of the first rule whose selector starts at `selector`. */
const ruleOf = (selector) => {
  const at = css.indexOf(selector);
  expect(at, `${selector} is in the CSS`).toBeGreaterThan(-1);
  const open = css.indexOf('{', at);
  return css.slice(open + 1, css.indexOf('}', open));
};

const declared = (rule, property) => {
  const match = rule.match(new RegExp(`(?:^|[\\s;])${property}:\\s*([^;]+);`));
  expect(match, `${property} is declared`).not.toBeNull();
  return match[1].trim();
};

/* Token values per theme: the light block, then the dark block laid over it. */
const parseBlock = (block) => Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const lightBlock = tokens.slice(tokens.indexOf(':root, [data-theme="light"] {'), tokens.indexOf('[data-theme="dark"] {'));
const darkBlock = tokens.slice(tokens.indexOf('[data-theme="dark"] {'));
const darkEnd = darkBlock.indexOf('\n}');
const palette = {
  light: parseBlock(lightBlock.slice(0, lightBlock.indexOf('\n}'))),
  dark: { ...parseBlock(lightBlock.slice(0, lightBlock.indexOf('\n}'))), ...parseBlock(darkBlock.slice(0, darkEnd)) },
};

const resolve = (value, theme) => {
  const ref = value.match(/^var\((--[\w-]+)\)$/);
  if (ref) return resolve(palette[theme][ref[1]], theme);
  expect(value, 'resolves to a hex colour').toMatch(/^#[0-9a-fA-F]{6}$/);
  return value;
};

const channel = (hex, at) => {
  const c = parseInt(hex.slice(at, at + 2), 16) / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/* What the button is filled with at rest and on hover, and which token the page behind the outline pill is. */
const variants = [
  { name: 'primary', arrow: '.pill--primary .pill-arrow {', rest: () => declared(ruleOf('\n.pill--primary {'), 'background'), hover: () => declared(ruleOf('  .pill--primary:hover {'), 'background') },
  { name: 'cream', arrow: '.pill--cream .pill-arrow {', rest: () => declared(ruleOf('\n.pill--cream {'), 'background'), hover: () => declared(ruleOf('  .pill--cream:hover {'), 'background'), darkHover: () => declared(ruleOf("  [data-theme='dark'] .pill--cream:hover {"), 'background') },
  { name: 'outline', arrow: '\n.pill-arrow {', rest: () => 'var(--surface-page)', hover: () => declared(ruleOf('  .pill--outline:hover {'), 'background') },
];

describe('the arrow bubble reads on its button in both themes (owner 2026-11-28: copper on copper was 1.10:1)', () => {
  for (const variant of variants) {
    for (const theme of ['light', 'dark']) {
      for (const state of ['rest', 'hover']) {
        it(`${variant.name} pill, ${theme}, ${state}: bubble 3:1 against the button, arrow 4.5:1 against the bubble`, () => {
          const rule = ruleOf(variant.arrow);
          const bubble = resolve(declared(rule, 'background'), theme);
          const arrow = resolve(declared(rule, 'color'), theme);
          const hover = theme === 'dark' && variant.darkHover ? variant.darkHover() : variant.hover();
          const button = resolve(state === 'rest' ? variant.rest() : hover, theme);
          expect(ratio(bubble, button), 'bubble against button').toBeGreaterThanOrEqual(3);
          expect(ratio(arrow, bubble), 'arrow against bubble').toBeGreaterThanOrEqual(4.5);
        });
      }
    }
  }

  it('the bubble uses tokens only, no colour literal', () => {
    for (const variant of variants) {
      const rule = ruleOf(variant.arrow);
      expect(declared(rule, 'background')).toMatch(/^var\(--[\w-]+\)$/);
      expect(declared(rule, 'color')).toMatch(/^var\(--[\w-]+\)$/);
    }
  });

  it('the bubble no longer takes the copper ramp step that matched the copper button', () => {
    expect(ruleOf('.pill--primary .pill-arrow {')).not.toContain('--brand-500');
    expect(ruleOf('\n.pill-arrow {')).not.toContain('--brand-500');
  });
});
