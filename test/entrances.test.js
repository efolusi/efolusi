import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('app/globals.css');
const home = read('app/components/HomeClient.jsx');

/* The entrances live in one block of globals.css, between these two comments. */
const START = '/* ---------- Entrances: page, hero and status dot ---------- */';
const END = '/* ---------- End of entrances ---------- */';
const block = css.slice(css.indexOf(START), css.indexOf(END));

/* The body of the first rule whose selector list contains `selector`. */
const ruleOf = (source, selector) => {
  const at = source.indexOf(selector);
  expect(at, `${selector} is in the CSS`).toBeGreaterThan(-1);
  const open = source.indexOf('{', at);
  return source.slice(open + 1, source.indexOf('}', open));
};

const reducedMotion = css.split('@media (prefers-reduced-motion: reduce) {').slice(1).join('\n');

describe('the entrances block exists and says it is an enhancement', () => {
  it('is delimited in globals.css', () => {
    expect(css).toContain(START);
    expect(css).toContain(END);
    expect(block.length).toBeGreaterThan(200);
  });
});

describe('page-in: main fades and rises once on the first load', () => {
  it('animates main from the enter keyframes with the slow duration, the enter curve and fill both', () => {
    const rule = ruleOf(block, '\nmain {');
    expect(rule).toMatch(/animation:\s*enter-rise var\(--dur-slow\) var\(--ease-enter\) both;/);
  });

  it('rises by the medium shift token and starts at opacity 0 inside the keyframes only', () => {
    const keyframes = ruleOf(block, '@keyframes enter-rise');
    expect(block).toMatch(/@keyframes enter-rise \{\s*from \{\s*opacity: 0;\s*translate: 0 var\(--shift-md\);/);
    expect(block).toMatch(/to \{\s*opacity: 1;\s*translate: none;/);
    expect(keyframes).toBeTruthy();
  });

  it('the cross-document view transition stays, and the page-in is not switched off while one is active (it blinked)', () => {
    expect(css).toMatch(/@view-transition \{\s*navigation: auto;/);
    expect(css.replace(/\/\*[\s\S]*?\*\//g, '')).not.toContain(':active-view-transition');
  });
});

describe('hero stagger: h1, sub, actions, proof in 0, 100, 200, 300 ms', () => {
  const children = [
    ['.hero-center h1', 0],
    ['.hero-center .hero-sub', 1],
    ['.hero-center .hero-actions', 2],
    ['.hero-center .hero-proof', 3]
  ];

  it('shares one step of 100 ms', () => {
    expect(css).toMatch(/--stagger-step:\s*100ms;/);
  });

  it.each(children)('%s enters with the slow duration and the enter curve, delayed by %i steps', (selector, steps) => {
    const rule = ruleOf(block, `\n${selector} {`);
    expect(rule).toMatch(/animation:\s*enter-rise var\(--dur-slow\) var\(--ease-enter\) both;/);
    expect(rule).toContain(`animation-delay: calc(var(--stagger-step) * ${steps});`);
  });

  it('the whole is under 600 ms: last delay 300 ms plus the slow duration (250 ms)', () => {
    const step = Number(css.match(/--stagger-step:\s*(\d+)ms;/)[1]);
    const slow = 250;
    expect(step * Math.max(...children.map(([, n]) => n)) + slow).toBeLessThan(600);
  });

  it('no hero block is a .reveal and none carries an inline opacity', () => {
    const hero = home.slice(home.indexOf('<section className="hero'), home.indexOf('<div className="marquee"'));
    expect(hero).not.toMatch(/\breveal\b/);
    expect(hero).not.toMatch(/opacity/);
  });
});

describe('visible without JavaScript: no opacity 0 in a base rule that a script must lift', () => {
  it('opacity 0 appears only inside keyframes, the script-gated reveal, and the portfolio accent bar', () => {
    const lines = css.split('\n');
    const bad = [];
    let keyframes = 0;
    let depth = 0;
    let selector = '';
    lines.forEach((line, i) => {
      if (/@keyframes/.test(line)) keyframes = depth + 1;
      if (/\{\s*$/.test(line)) {
        depth += 1;
        if (!/^\s*(from|to|\d+%)\b/.test(line)) selector = line.trim();
      }
      if (/^\s*opacity: 0;/.test(line) && !keyframes) {
        bad.push(`${i + 1}: ${selector}`);
      }
      if (/^\s*\}/.test(line)) {
        depth -= 1;
        if (keyframes && depth < keyframes) keyframes = 0;
      }
    });
    const allowed = bad.filter(
      (entry) => !/reveal-ready \.reveal:not\(\.in\)/.test(entry) && !/portfolio-(feature|card)::before/.test(entry)
    );
    expect(allowed).toEqual([]);
  });

  it('the scroll reveal still hides only under html.reveal-ready', () => {
    expect(css).toMatch(/\.reveal-ready \.reveal:not\(\.in\) \{\n {2}opacity: 0;/);
  });
});

describe('the scroll reveal shows what is in view at load at once', () => {
  it('marks the blocks already in the viewport .in before it sets reveal-ready', () => {
    const effect = home.slice(home.indexOf('function useRevealOnScroll'), home.indexOf('export default function HomeClient'));
    const inView = effect.indexOf('getBoundingClientRect');
    const ready = effect.indexOf("classList.add('reveal-ready')");
    expect(inView).toBeGreaterThan(-1);
    expect(effect.slice(inView, ready)).toContain("classList.add('in')");
    expect(inView).toBeLessThan(ready);
  });

  it('has no timer that reveals everything', () => {
    expect(home).not.toMatch(/setTimeout/);
  });
});

describe('print: everything is visible and nothing moves', () => {
  it('has a print rule that lifts the reveal and every entrance', () => {
    expect(block).toContain('@media print {');
    const section = block.slice(block.indexOf('@media print {'));
    for (const selector of ['main', '.hero-center h1', '.hero-center .hero-proof', '.reveal', '.reveal-ready .reveal:not(.in)']) {
      expect(section, selector).toContain(selector);
    }
    expect(section).toMatch(/animation: none !important;/);
    expect(section).toMatch(/opacity: 1 !important;/);
  });
});

describe('status dot: a slow loop that the pause button and reduced motion stop', () => {
  it('the hero dot pulses again', () => {
    expect(home).toMatch(/<StatusDot status="success" pulse \/>/);
  });

  it('the loop runs at the slow loop token', () => {
    const rule = ruleOf(block, '.hero-proof .ef-status--pulse .ef-status__dot::after');
    expect(rule).toContain('animation-duration: var(--dur-loop-slow);');
  });

  it('the pause button pauses it through the same .is-motion-paused class', () => {
    const rule = css.match(/\.is-motion-paused[^{]*\{[^}]*\}/)[0];
    expect(rule).toContain('.ef-status__dot::after');
    expect(rule).toContain('animation-play-state: paused;');
  });
});

describe('reduced motion removes every new animation', () => {
  it.each(['main', '.hero-center h1', '.hero-center .hero-sub', '.hero-center .hero-actions', '.hero-center .hero-proof', '.ef-status__dot::after'])(
    '%s has no animation',
    (selector) => {
      const at = reducedMotion.indexOf(selector);
      expect(at, selector).toBeGreaterThan(-1);
    }
  );

  it('the reduced-motion block sets animation: none for them', () => {
    expect(reducedMotion).toMatch(/\.hero-center \.hero-proof,[\s\S]*?animation: none;/);
  });
});

describe('the new CSS uses tokens, not literal durations, curves or colours', () => {
  it('has no time literal other than the stagger step, no cubic-bezier, no hex and no rgb in the entrances block', () => {
    const withoutStep = block.replace(/--stagger-step:\s*100ms;/g, '');
    expect(withoutStep).not.toMatch(/\b\d*\.?\d+m?s\b/);
    expect(block).not.toMatch(/cubic-bezier|ease-in|ease-out|ease-in-out|linear\(/);
    expect(block).not.toMatch(/#[0-9a-fA-F]{3,8}\b|rgba?\(/);
  });
});
