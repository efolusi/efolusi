import { productById } from '../lib/products.js';

/* Every mark is drawn on the same 64 by 64 artboard (brand/logos), so every mark
   takes the same square box. It is painted through a mask so its colour comes
   from CSS (currentColor), never from the file. */

/* Logo files are served with a long browser cache. Bump this whenever any SVG
   under public/ changes so visitors never mix old and new geometry. */
const LOGO_VERSION = '2026-11-22b';

export default function ProductLogo({ id, size }) {
  const product = productById[id];
  if (!product?.logo) return null;
  return <span
    className="product-glyph"
    aria-hidden="true"
    style={{ width: `${size}px`, height: `${size}px`, '--logo': `url('${product.logo}?v=${LOGO_VERSION}')` }}
  />;
}
