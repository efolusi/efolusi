import { productById } from '../lib/products.js';

/* Every mark gets the same visual area regardless of its aspect ratio, and is
   painted through a mask so its colour comes from CSS (currentColor), never
   from the file. Heavy solid marks read larger, so they are trimmed slightly. */
const OPTICAL = { kongkow: 0.9, toolips: 0.9 };

/* Logo files are served with a long browser cache. Bump this whenever any SVG
   under public/ changes so visitors never mix old and new geometry. */
const LOGO_VERSION = '2026-09-16';

export default function ProductLogo({ id, size }) {
  const product = productById[id];
  if (!product?.logo) return null;
  const ratio = product.logoRatio || 1;
  const side = size * (OPTICAL[id] || 1);
  const width = Math.min(side * Math.sqrt(ratio), size * 1.3);
  const height = Math.min(side / Math.sqrt(ratio), size * 1.3);
  return <span
    className="product-glyph"
    aria-hidden="true"
    style={{ width: `${width.toFixed(1)}px`, height: `${height.toFixed(1)}px`, '--logo': `url('${product.logo}?v=${LOGO_VERSION}')` }}
  />;
}
