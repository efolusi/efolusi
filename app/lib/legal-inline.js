/*
 * Tiny inline markup for the legal pages, so the copy can live in the
 * dictionaries as plain strings and still carry links and emphasis:
 *
 *   [label](href)  a link; "{lang}" in href becomes the page language
 *   **text**       strong
 *
 * Nothing else is interpreted, and nothing is rendered as raw HTML.
 */

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function parseInline(text, lang) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    if (match.index > last) parts.push({ type: 'text', text: text.slice(last, match.index) });
    if (match[1] !== undefined) {
      parts.push({ type: 'link', text: match[1], href: match[2].replaceAll('{lang}', lang) });
    } else {
      parts.push({ type: 'strong', text: match[3] });
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', text: text.slice(last) });
  return parts;
}

/* Every link target a legal document points at, for tests and review. */
export function legalLinks(doc, lang) {
  const out = [];
  const visit = (value) => {
    if (typeof value === 'string') {
      for (const part of parseInline(value, lang)) if (part.type === 'link') out.push(part.href);
    } else if (Array.isArray(value)) {
      value.forEach(visit);
    } else if (value && typeof value === 'object') {
      Object.values(value).forEach(visit);
    }
  };
  visit(doc);
  return out;
}
