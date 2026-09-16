// Generate raster brand icons for a product from its canonical mark in public/<product>.svg.
// usage: node scripts/gen-product-icons.mjs public/<product>.svg <outDir> [tileBg] [ink] [heavy 0.9|1]
// EXPO=1 additionally emits icon-1024.png + adaptive-foreground-1024.png. Requires sharp (transitive via next).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
// sharp arrives transitively via next; under pnpm it only exists in node_modules/.pnpm.
const root = new URL("..", import.meta.url).pathname;
let sharp;
try { sharp = createRequire(`${root}package.json`)("sharp"); }
catch { const d = readdirSync(`${root}node_modules/.pnpm`).find(n => n.startsWith("sharp@")); sharp = createRequire(`${root}node_modules/.pnpm/${d}/node_modules/sharp/package.json`)("sharp"); }
const [svgPath, outDir, tileBg = "#F8F4E6", ink = "#5C3A1F", heavy = "1"] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const raw = readFileSync(svgPath, "utf8").replace(/#5C3A1F/gi, ink);
const vb = raw.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const inner = raw.replace(/<\?xml[^>]*>/, "").replace(/<title>.*?<\/title>/s, "");
// tile with the mark filling 62% of the side (area-normalised for wide marks), heavy marks ×0.9
const ratio = vb[2] / vb[3]; const k = 0.62 * Number(heavy);
const w = Math.min(k * Math.sqrt(ratio), 0.8), h = Math.min(k / Math.sqrt(ratio), 0.8);
const tile = (size, bg, rx) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1 1">
  ${bg ? `<rect width="1" height="1" rx="${rx}" fill="${bg}"/>` : ""}
  <svg x="${(1 - w) / 2}" y="${(1 - h) / 2}" width="${w}" height="${h}" viewBox="${vb.join(" ")}" preserveAspectRatio="xMidYMid meet">${inner.replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}</svg>
</svg>`;
const png = (svg, size) => sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();
const pngToIco = (buf, size) => { const h = Buffer.alloc(6); h.writeUInt16LE(0,0); h.writeUInt16LE(1,2); h.writeUInt16LE(1,4); const d = Buffer.alloc(16); d.writeUInt8(size,0); d.writeUInt8(size,1); d.writeUInt16LE(1,4); d.writeUInt16LE(32,6); d.writeUInt32LE(buf.length,8); d.writeUInt32LE(22,12); return Buffer.concat([h,d,buf]); };
const out = {};
out["apple-touch-icon.png"] = await png(tile(180, tileBg, 0.22), 180);   // iOS masks its own corners; keep square tile
out["icon-192.png"] = await png(tile(192, tileBg, 0.22), 192);
out["icon-512.png"] = await png(tile(512, tileBg, 0.22), 512);
out["favicon.ico"] = pngToIco(await png(tile(32, null, 0), 32), 32);    // transparent, mark only, like the SVG favicon
if (process.env.EXPO) { out["icon-1024.png"] = await png(tile(1024, tileBg, 0), 1024); out["adaptive-foreground-1024.png"] = await png(tile(1024, null, 0), 1024); }
for (const [n, b] of Object.entries(out)) writeFileSync(`${outDir}/${n}`, b);
console.log(outDir, Object.keys(out).join(" "));
