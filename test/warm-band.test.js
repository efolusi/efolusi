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
