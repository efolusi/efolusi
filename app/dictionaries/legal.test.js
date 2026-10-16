import { describe, expect, it } from 'vitest';

import { legalLinks, parseInline } from '../lib/legal-inline.js';
import * as en from './legal-en.js';
import * as id from './legal-id.js';

const DOCS = { en, id };
const ENTITY = 'PT Efolusi Dunia Teknologi';
const ADDRESS = 'Bumi Cikande Indah, Blok D12 No 15, Cikande, Kab. Serang, Banten 42186';

const ids = (doc) => [
  ...doc.sections.map((s) => s.id),
  ...doc.sections.flatMap((s) => s.blocks.filter((b) => b && b.h3).map((b) => b.id))
];

const allText = (value) =>
  typeof value === 'string'
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(allText)
      : value && typeof value === 'object'
        ? Object.values(value).flatMap(allText)
        : [];

describe('platform legal documents', () => {
  it('ships the same sections and anchors in English and Indonesian', () => {
    for (const kind of ['terms', 'privacy']) {
      expect(ids(id[kind])).toEqual(ids(en[kind]));
    }
  });

  it('keeps the anchors other pages and products link to', () => {
    expect(ids(en.terms)).toEqual(
      expect.arrayContaining(['scope', 'account', 'refunds', 'ending', 'law', 'schedule', 'my', 'relay', 'loop', 'runa', 'komando', 'sanctum', 'kongkow'])
    );
    expect(ids(en.privacy)).toEqual(expect.arrayContaining(['products', 'deletion', 'rights', 'cookies']));
  });

  it('resolves every in-page and cross-page anchor', () => {
    for (const [lang, docs] of Object.entries(DOCS)) {
      const own = { terms: ids(docs.terms), privacy: ids(docs.privacy) };
      for (const kind of ['terms', 'privacy']) {
        for (const href of legalLinks(docs[kind], lang)) {
          const local = href.match(/^#(.+)$/);
          if (local) expect(own[kind], `${lang} ${kind} ${href}`).toContain(local[1]);
          const cross = href.match(/^\/(en|id)\/(terms|privacy)#(.+)$/);
          if (cross) {
            expect(cross[1]).toBe(lang);
            expect(own[cross[2]], `${lang} ${kind} ${href}`).toContain(cross[3]);
          }
        }
      }
    }
  });

  it('carries the 2026-10-16 version that sso must be configured with', () => {
    expect(en.LEGAL_VERSION).toBe('2026-10-16');
    for (const docs of Object.values(DOCS)) {
      for (const kind of ['terms', 'privacy']) expect(docs[kind].metaLine).toContain('2026-10-16');
    }
    expect(en.terms.metaLine).toContain('16 October 2026');
    expect(id.terms.metaLine).toContain('16 Oktober 2026');
  });

  it('names the published entity, address and contact, and no other inbox', () => {
    for (const docs of Object.values(DOCS)) {
      for (const kind of ['terms', 'privacy']) {
        const text = allText(docs[kind]).join('\n');
        expect(text).toContain(ENTITY);
        expect(text).toContain(ADDRESS);
        expect(text).toContain('hi@efolusi.com');
        expect([...new Set(text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g))]).toEqual(['hi@efolusi.com']);
      }
    }
  });

  it('points to the product-specific pages that prevail', () => {
    for (const [lang, docs] of Object.entries(DOCS)) {
      const links = legalLinks(docs.terms, lang);
      expect(links).toEqual(
        expect.arrayContaining([
          `https://trady.efolusi.com/${lang}/terms`,
          'https://cuwan.xyz/terms',
          'https://zoyya.xyz/terms',
          `https://toolips.xyz/${lang}/terms`
        ])
      );
      expect(legalLinks(docs.privacy, lang)).toEqual(
        expect.arrayContaining([
          `https://trady.efolusi.com/${lang}/privacy`,
          'https://cuwan.xyz/privacy',
          'https://zoyya.xyz/privacy',
          `https://toolips.xyz/${lang}/privacy`
        ])
      );
    }
  });

  it('has no unresolved drafting markers, em dashes or double hyphens', () => {
    for (const docs of Object.values(DOCS)) {
      for (const text of allText([docs.terms, docs.privacy])) {
        expect(text).not.toMatch(/\[(PLACEHOLDER|DECISION|FIX)|TODO|—|–|--/);
      }
    }
  });
});

describe('legal inline markup', () => {
  it('turns links and strong text into parts and fills in the language', () => {
    expect(parseInline('See [the notice](/{lang}/privacy#deletion) and **Delete account**.', 'id')).toEqual([
      { type: 'text', text: 'See ' },
      { type: 'link', text: 'the notice', href: '/id/privacy#deletion' },
      { type: 'text', text: ' and ' },
      { type: 'strong', text: 'Delete account' },
      { type: 'text', text: '.' }
    ]);
  });

  it('leaves plain text and stray brackets alone', () => {
    expect(parseInline('a [b] (c) *d*', 'en')).toEqual([{ type: 'text', text: 'a [b] (c) *d*' }]);
  });
});
