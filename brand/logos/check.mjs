#!/usr/bin/env node
// Checks every <product>.svg in this folder (or the folders given) against README.md. No install.
// Usage: node check.mjs [dir ...]   Exit 1 on any FAIL.
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dirs = process.argv.length > 2 ? process.argv.slice(2) : [here];
const COLOR = '#2C1709';
const BOXES = { wide: [60, 40], square: [52, 52], tall: [50, 58] };
const KIND = { komando: 'wide', trady: 'wide', meridian: 'wide', glamor: 'tall', toolips: 'square', cuwan: 'square', kongkow: 'square', 'design-tokens': 'square' };
const NAMES = ['komando', 'trady', 'toolips', 'cuwan', 'kongkow', 'meridian', 'glamor', 'design-tokens'];
let fails = 0;
const CEILING = { komando: 38, trady: 115, toolips: 42, cuwan: 63, kongkow: 32, meridian: 27, glamor: 27, 'design-tokens': 30 };

function polys(cmds) {
  const out = []; let cur = [0, 0], poly = [];
  for (const { c, n } of cmds) {
    if (c === 'M') { if (poly.length) out.push(poly); poly = [[n[0], n[1]]]; cur = [n[0], n[1]]; }
    else if (c === 'L') { cur = [n[0], n[1]]; poly.push(cur); }
    else if (c === 'H') { cur = [n[0], cur[1]]; poly.push(cur); }
    else if (c === 'V') { cur = [cur[0], n[0]]; poly.push(cur); }
    else if (c === 'Q') { for (let t = 0.1; t <= 1.0001; t += 0.1) poly.push([(1 - t) ** 2 * cur[0] + 2 * (1 - t) * t * n[0] + t * t * n[2], (1 - t) ** 2 * cur[1] + 2 * (1 - t) * t * n[1] + t * t * n[3]]); cur = [n[2], n[3]]; }
    else if (c === 'C') { for (let t = 0.1; t <= 1.0001; t += 0.1) { const u = 1 - t; poly.push([u ** 3 * cur[0] + 3 * u * u * t * n[0] + 3 * u * t * t * n[2] + t ** 3 * n[4], u ** 3 * cur[1] + 3 * u * u * t * n[1] + 3 * u * t * t * n[3] + t ** 3 * n[5]]); } cur = [n[4], n[5]]; }
  }
  if (poly.length) out.push(poly);
  return out;
}
function ink(cmds, evenodd) {
  const ps = polys(cmds); let hit = 0; const N = 128;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const x = (i + 0.5) * 64 / N, y = (j + 0.5) * 64 / N; let wn = 0;
    for (const p of ps) for (let k = 0; k < p.length; k++) {
      const a = p[k], b = p[(k + 1) % p.length];
      if (a[1] <= y) { if (b[1] > y && (b[0] - a[0]) * (y - a[1]) - (x - a[0]) * (b[1] - a[1]) > 0) wn++; }
      else if (b[1] <= y && (b[0] - a[0]) * (y - a[1]) - (x - a[0]) * (b[1] - a[1]) < 0) wn--;
    }
    if (evenodd ? (Math.abs(wn) % 2 === 1) : wn !== 0) hit++;
  }
  return hit / (N * N);
}

function sample(cmds) {
  const pts = []; let cur = [0, 0], start = [0, 0];
  for (const { c, n } of cmds) {
    if (c === 'M') { cur = start = [n[0], n[1]]; pts.push(cur); }
    else if (c === 'L') { cur = [n[0], n[1]]; pts.push(cur); }
    else if (c === 'H') { cur = [n[0], cur[1]]; pts.push(cur); }
    else if (c === 'V') { cur = [cur[0], n[0]]; pts.push(cur); }
    else if (c === 'Q') {
      for (let t = 0.05; t <= 1.0001; t += 0.05) {
        pts.push([(1 - t) ** 2 * cur[0] + 2 * (1 - t) * t * n[0] + t * t * n[2], (1 - t) ** 2 * cur[1] + 2 * (1 - t) * t * n[1] + t * t * n[3]]);
      }
      cur = [n[2], n[3]];
    } else if (c === 'C') {
      for (let t = 0.05; t <= 1.0001; t += 0.05) {
        const u = 1 - t;
        pts.push([u ** 3 * cur[0] + 3 * u * u * t * n[0] + 3 * u * t * t * n[2] + t ** 3 * n[4], u ** 3 * cur[1] + 3 * u * u * t * n[1] + 3 * u * t * t * n[3] + t ** 3 * n[5]]);
      }
      cur = [n[4], n[5]];
    } else if (c === 'Z') cur = start;
  }
  return pts;
}

function check(file) {
  const errs = [];
  const name = basename(file, '.svg');
  const src = readFileSync(file, 'utf8');
  if (!NAMES.includes(name)) errs.push(`file name "${name}.svg" is not <product>.svg of the eight`);
  if (/<!--|<\?xml|<!DOCTYPE|<metadata|<defs|<g[\s>]|<use|<mask|<style|<text|<image|<linearGradient|<radialGradient|<circle|<rect|<polygon|<line|<ellipse/.test(src)) errs.push('forbidden element or comment');
  if (/\stransform=|\sid=|\sstyle=|\sclass=|stroke/.test(src)) errs.push('forbidden attribute (transform, id, style, class, stroke)');
  const root = src.match(/<svg([^>]*)>/);
  if (!root || root[1].trim() !== 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"') errs.push('root must be exactly: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">');
  const title = src.match(/<title>([^<]+)<\/title>/);
  if (!title) errs.push('missing <title>');
  const paths = [...src.matchAll(/<path\b([^>]*)\/>/g)];
  if (paths.length !== 1) { errs.push(`needs exactly one <path>, found ${paths.length}`); return errs; }
  const attrs = paths[0][1].trim();
  const m = attrs.match(/^fill="([^"]+)"( fill-rule="evenodd")? d="([^"]+)"$/);
  if (!m) { errs.push('path attributes must be: fill, optional fill-rule="evenodd", d (in that order)'); return errs; }
  if (m[1] !== COLOR) errs.push(`fill must be ${COLOR}, found ${m[1]}`);
  const d = m[3];
  if (/[^MLHVQCZ0-9.\-\s,]/.test(d)) errs.push('path uses a command other than absolute M L H V Q C Z');
  const cmds = [...d.matchAll(/([MLHVQCZ])([^MLHVQCZ]*)/g)].map(x => ({ c: x[1], n: (x[2].match(/-?\d*\.?\d+/g) || []).map(Number) }));
  const need = { M: 2, L: 2, H: 1, V: 1, Q: 4, C: 6, Z: 0 };
  for (const { c, n } of cmds) if (n.length !== need[c]) { errs.push(`command ${c} has ${n.length} numbers, needs ${need[c]}`); break; }
  const dec = (d.match(/\d+\.\d{3,}/g) || []);
  if (dec.length) errs.push(`${dec.length} number(s) with more than two decimals, e.g. ${dec[0]}`);
  let prev = [0, 0], short = null, count = 0;
  for (const { c, n } of cmds) {
    if (c === 'Z') continue;
    const end = c === 'H' ? [n[0], prev[1]] : c === 'V' ? [prev[0], n[0]] : n.slice(-2);
    if (c !== 'M') { count++; const l = Math.hypot(end[0] - prev[0], end[1] - prev[1]); if (l < 0.5 && !short) short = `a ${c} segment is ${l.toFixed(2)} long (minimum 0.5), ending at ${end.map(v => +v.toFixed(2)).join(' ')}`; }
    prev = end;
  }
  if (short) errs.push(short);
  if (CEILING[name] && count > CEILING[name]) errs.push(`${count} segments is over the ceiling of ${CEILING[name]}`);
  const coverage = ink(cmds, !!m[2]);
  const pts = sample(cmds);
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const w = x1 - x0, h = y1 - y0;
  const kind = KIND[name] || 'square';
  const [bw, bh] = BOXES[kind];
  if (w > bw + 0.6 || h > bh + 0.6) errs.push(`mark ${w.toFixed(1)} x ${h.toFixed(1)} is outside the ${kind} box ${bw} x ${bh}`);
  if (!(Math.abs(w - bw) <= 0.8 || Math.abs(h - bh) <= 0.8)) errs.push(`mark ${w.toFixed(1)} x ${h.toFixed(1)} does not fill the ${kind} box ${bw} x ${bh} on either side`);
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  if (Math.abs(cx - 32) > 0.8 || Math.abs(cy - 32) > 0.8) errs.push(`mark is centred at ${cx.toFixed(1)}, ${cy.toFixed(1)}, not 32, 32`);
  if (x0 < 2 - 0.6 || y0 < 2 - 0.6 || x1 > 62 + 0.6 || y1 > 62 + 0.6) errs.push('mark leaves the live area (2 to 62)');
  return { errs, info: `${kind} ${w.toFixed(1)}x${h.toFixed(1)} at ${cx.toFixed(1)},${cy.toFixed(1)}, ${count} segments (ceiling ${CEILING[name]}), ink ${(coverage * 100).toFixed(1)}%` };
}

for (const dir of dirs) {
  const files = readdirSync(dir).filter(f => f.endsWith('.svg')).sort();
  for (const f of files) {
    const r = check(join(dir, f));
    const errs = Array.isArray(r) ? r : r.errs;
    if (errs.length) { fails++; console.log(`FAIL ${f}`); errs.forEach(e => console.log(`     ${e}`)); }
    else console.log(`PASS ${f}  ${r.info}`);
  }
  const have = new Set(files.map(f => f.replace('.svg', '')));
  for (const n of NAMES) if (!have.has(n)) { fails++; console.log(`FAIL ${n}.svg is missing in ${dir}`); }
}
console.log(fails ? `CHECK: FAIL (${fails})` : 'CHECK: PASS');
process.exit(fails ? 1 : 0);
