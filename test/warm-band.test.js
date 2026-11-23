import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const css = read('app/globals.css');

// Meridian v2.0.0 (EF28): --surface-brand is the warm band, light in the light theme.
// Cocoa stays only in logos and wordmarks, so the site names its band fills "band".
const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, sel, body]) => ({ sel: sel.trim(), body }));

describe('warm band (Meridian v2.0.0)', () => {
  it('no cocoa class or tint is left in the site code', () => {
    for (const p of ['app/globals.css', 'app/components/HomeClient.jsx', 'app/lib/products.js']) {
      expect(read(p), p).not.toMatch(/cocoa/);
    }
  });

  it('text on --surface-brand uses --text-on-brand, never a fixed cream', () => {
    const onBand = rules.filter((r) => /background:\s*var\(--surface-brand\)/.test(r.body));
    expect(onBand.length).toBeGreaterThan(0);
    for (const r of onBand) {
      const color = r.body.match(/(?:^|[;\s])color:\s*([^;]+);/);
      if (color) expect(color[1].trim(), r.sel).toBe('var(--text-on-brand)');
    }
  });

  it('headings and links inside a band read --text-on-brand', () => {
    for (const r of rules.filter((x) => /\.(band|tint-band|feat-card--band)\b/.test(x.sel))) {
      expect(r.body, r.sel).not.toMatch(/var\(--cream-50\)/);
    }
  });

  it('no inline colour inside the team band (it read light on light after v2)', () => {
    const home = read('app/components/HomeClient.jsx');
    const team = home.slice(home.indexOf('className="band band-team"'), home.indexOf('</section>', home.indexOf('className="band band-team"')));
    expect(team).not.toMatch(/style=\{\{\s*color/);
  });

  it('text on the fixed dark brand-800 chip reads --text-on-media', () => {
    const chip = rules.find((r) => r.sel === '.feat-card--band .feat-icon');
    expect(chip.body).toMatch(/background:\s*var\(--brand-800\)/);
    expect(chip.body).toMatch(/color:\s*var\(--text-on-media\)/);
  });
});

// Audit, efolusi#150: pin the weakest pair by its ratio, not only its token names.
describe('muted text on the brand-700 card (weakest pair, measured 4.61:1)', () => {
  const tokens = readFileSync(new URL('../node_modules/@efolusi/meridian/tokens/colors.css', import.meta.url), 'utf8');
  const first = (name) => tokens.match(new RegExp(`--${name}:\\s*([^;]+);`))[1].trim();
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

  it('the brand-700 card uses --text-on-media-muted for muted text', () => {
    const rule = rules.find((r) => r.sel.endsWith(".portfolio-browser [data-product='meridian']") && /--card-muted/.test(r.body));
    expect(rule.body).toMatch(/--card-muted: var\(--text-on-media-muted\)/);
  });

  it('that pair is at least 4.5:1', () => {
    const bg = hex(first('brand-700'));
    const [r, g, b, a] = first('text-on-media-muted').match(/[\d.]+/g).map(Number);
    const fg = [r, g, b].map((c, i) => c * a + bg[i] * (1 - a));
    const [hi, lo] = [lum(fg), lum(bg)].sort((x, y) => y - x);
    expect((hi + 0.05) / (lo + 0.05)).toBeGreaterThanOrEqual(4.5);
  });
});
