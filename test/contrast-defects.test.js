import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('app/globals.css');

/* The body of the first rule whose selector list contains `selector`. */
const ruleOf = (source, selector) => {
  const at = source.indexOf(selector);
  expect(at, `${selector} is in the CSS`).toBeGreaterThan(-1);
  const open = source.indexOf('{', at);
  return source.slice(open + 1, source.indexOf('}', open));
};

describe('plain defects: founder blobs, the closer button, two dark icon inks', () => {
  it('the founder blob is a card-coloured shape with an accent-edge ring, not the cream primitive', () => {
    const rule = ruleOf(css, '\n.founder-blob {');
    expect(rule).toContain('background: var(--surface-card);');
    expect(rule).toMatch(/box-shadow: 0 0 0 2px var\(--accent-edge\);|border: 2px solid var\(--accent-edge\);/);
    expect(css).not.toMatch(/\.founder[^{]*\.founder-blob \{[^}]*--brand-100/);
    expect(rule).not.toContain('--brand-100');
  });

  it('dark keeps the cream blob it had and gains the same ring', () => {
    expect(ruleOf(css, "[data-theme='dark'] .founder-blob {")).toContain('background: var(--brand-100);');
  });

  it('the second blob shape keeps the same fill (no primitive)', () => {
    const rule = ruleOf(css, '.founder:nth-child(2n) .founder-blob {');
    expect(rule).not.toContain('--brand-100');
  });

  it('the cream closer button has a boundary from the accent edge token', () => {
    const rule = ruleOf(css, '\n.pill--cream {');
    expect(rule).toContain('border-color: var(--accent-edge);');
  });

  it('the feature card disc and its icon come from the card tone, never a primitive or a literal', () => {
    const rule = ruleOf(css, '\n.feat-icon {');
    expect(rule).toContain('background: var(--feat-disc);');
    expect(rule).toContain('color: var(--feat-on-disc);');
    expect(rule).not.toMatch(/#[0-9a-f]{3,8}|--brand-|--sand-|--copper-/i);
  });

  it.each(['.check .tick {', '.perk .tick {', '.tick.tick--caramel {'])('%s takes the ink made for the subtle accent surface', (selector) => {
    const rule = ruleOf(css, `\n${selector}`);
    expect(rule).toContain('color: var(--accent-subtle-fg);');
    expect(rule).not.toContain('--brand-700');
  });
});
