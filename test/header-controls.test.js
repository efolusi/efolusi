import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

// Flat list of style rules with the at-rule prelude chain that wraps each one.
function rules(text, chain = []) {
  const out = [];
  let i = 0;
  while (i < text.length) {
    const open = text.indexOf('{', i);
    if (open === -1) break;
    const prelude = text.slice(i, open).trim().replace(/^[\s;}]+/, '');
    let depth = 1;
    let k = open + 1;
    while (depth > 0 && k < text.length) {
      if (text[k] === '{') depth++;
      else if (text[k] === '}') depth--;
      k++;
    }
    const body = text.slice(open + 1, k - 1);
    if (prelude.startsWith('@')) out.push(...rules(body, [...chain, prelude]));
    else out.push({ selector: prelude, body, chain });
    i = k;
  }
  return out;
}

const all = rules(css);
const hasSelector = (rule, name) => rule.selector.split(',').some((s) => s.trim() === name);
const declaration = (rule, prop) => rule.body.match(new RegExp(`(?:^|[;\\s])${prop}:\\s*([^;]+);`))?.[1].trim();

const CONTROLS = ['.lang-switch', '.menu-toggle', '.site-header .ef-theme-toggle'];

describe('the three header controls are one control (language, theme, menu)', () => {
  const shared = all.find((rule) => CONTROLS.every((name) => hasSelector(rule, name)) && rule.chain.length === 0);

  it('share one base rule', () => {
    expect(shared, 'one rule lists all three selectors').toBeTruthy();
  });

  it('are the same md circle (44 px on touch) with no border or fill at rest', () => {
    expect(declaration(shared, 'width')).toBe('var(--control-h-md)');
    expect(declaration(shared, 'height')).toBe('var(--control-h-md)');
    expect(declaration(shared, 'box-sizing')).toBe('border-box');
    expect(declaration(shared, 'border')).toBe('0');
    expect(declaration(shared, 'border-radius')).toBe('var(--radius-full)');
    expect(declaration(shared, 'background')).toBe('transparent');
    expect(declaration(shared, 'box-shadow')).toBe('none');
  });

  it('share one hover fill, one pressed fill and one focus ring', () => {
    for (const state of [':hover', ':active', ':focus-visible']) {
      const rule = all.find((r) => CONTROLS.every((name) => hasSelector(r, `${name}${state}`)));
      expect(rule, `${state} rule lists all three`).toBeTruthy();
      if (state !== ':focus-visible') expect(declaration(rule, 'background')).toBe('var(--surface-sunken)');
      else expect(declaration(rule, 'box-shadow')).toBe('var(--focus-ring)');
    }
  });

  it('no other rule resizes one of them', () => {
    for (const rule of all) {
      if (rule === shared) continue;
      for (const name of CONTROLS) {
        if (!hasSelector(rule, name)) continue;
        expect(declaration(rule, 'width'), `${rule.selector} width`).toBeUndefined();
        expect(declaration(rule, 'height'), `${rule.selector} height`).toBeUndefined();
      }
    }
  });
});

describe('a touch never leaves a hover look behind (EF45)', () => {
  it('every :hover rule sits inside @media (hover: hover)', () => {
    const bare = all.filter((rule) => rule.selector.includes(':hover') && !rule.chain.some((c) => /^@media \(hover: hover\)/.test(c)));
    expect(bare.map((rule) => rule.selector)).toEqual([]);
  });
});

describe('one lift, one nudge, one mark hover (EF45)', () => {
  const root = all.find((rule) => rule.selector === ':root' && rule.body.includes('--hover-lift'));

  it('defines the three values once', () => {
    expect(declaration(root, '--hover-lift')).toBe('calc(-1 * var(--space-1))');
    expect(declaration(root, '--hover-nudge')).toBe('2px');
    expect(declaration(root, '--hover-mark')).toBe('rotate(-3deg) scale(1.04)');
  });

  it('hover and focus rules use those values, never a literal', () => {
    const state = all.filter((rule) => /:hover|:focus-visible/.test(rule.selector) && /transform:/.test(rule.body));
    expect(state.length).toBeGreaterThan(8);
    for (const rule of state) {
      const value = declaration(rule, 'transform');
      if (value === 'none' || value === 'none !important') continue;
      expect(value, rule.selector).toMatch(/var\(--hover-(lift|nudge|mark)\)|rotate\(45deg\)/);
    }
  });
});
