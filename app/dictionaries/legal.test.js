import { describe, expect, it } from 'vitest';

import { legalLinks, parseInline } from '../lib/legal-inline.js';
import * as en from './legal-en.js';
import * as id from './legal-id.js';

const DOCS = { en, id };
const KINDS = ['terms', 'privacy', 'dpa', 'sla', 'aup', 'cookie', 'trust'];
const PAY_KINDS = ['dpa', 'sla', 'aup', 'cookie', 'trust'];
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
    for (const kind of KINDS) {
      expect(ids(id[kind]), kind).toEqual(ids(en[kind]));
    }
  });

  it('states how account deletion reaches the products (sso-cloud#46)', () => {
    const sections = (lang, doc, key) => allText(doc.sections.find((x) => x.id === key));
    const facts = {
      en: [/each product you (have )?used/i, /7 days/, /always tell Pay/i, /Financial records are kept/, /never used are not told/i],
      id: [/setiap produk yang pernah Anda pakai/i, /7 hari/, /selalu memberi tahu Pay/i, /Catatan keuangan tetap disimpan/, /tidak pernah Anda pakai tidak diberi tahu/i]
    };
    for (const [lang, docs] of Object.entries(DOCS)) {
      const deletion = sections(lang, docs.privacy, 'deletion').join(' ');
      for (const fact of facts[lang]) expect(deletion, `${lang} ${fact}`).toMatch(fact);
      const ending = sections(lang, docs.terms, 'ending').join(' ');
      expect(ending, `${lang} ending`).not.toMatch(/does not yet delete|belum menghapus data/);
    }
  });

  it('describes account deletion with its 7-day delay and cancel link (SO53)', () => {
    const text = (lang, doc, key) => allText(doc.sections.find((x) => x.id === key)).join(' ');
    const facts = {
      en: [/my\.efolusi\.com\/account\/delete/, /7 days after you ask/, /link to cancel/, /two-step verification/, /Security events stay/, /backups for up to 14 days/],
      id: [/my\.efolusi\.com\/account\/delete/, /7 hari setelah Anda memintanya/, /tautan untuk membatalkan/, /verifikasi dua langkah/, /Catatan keamanan tetap disimpan/, /cadangan hingga 14 hari/]
    };
    const gone = { en: /Deletion is immediate|deleted straight away|Delete account\*\*|not yet removed automatically/, id: /Penghapusan langsung berlaku|langsung terhapus|Hapus akun\*\*|belum terhapus otomatis/ };
    for (const [lang, docs] of Object.entries(DOCS)) {
      const deletion = text(lang, docs.privacy, 'deletion');
      for (const fact of facts[lang]) expect(deletion, `${lang} privacy ${fact}`).toMatch(fact);
      const ending = text(lang, docs.terms, 'ending');
      expect(ending, `${lang} terms`).toMatch(/7/);
      expect(ending, `${lang} terms link`).toMatch(/my\.efolusi\.com\/account\/delete/);
      for (const part of [deletion, ending]) expect(part, `${lang} old wording`).not.toMatch(gone[lang]);
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
      const own = Object.fromEntries(KINDS.map((kind) => [kind, ids(docs[kind])]));
      for (const kind of KINDS) {
        for (const href of legalLinks(docs[kind], lang)) {
          const local = href.match(/^#(.+)$/);
          if (local) expect(own[kind], `${lang} ${kind} ${href}`).toContain(local[1]);
          const cross = href.match(/^\/(en|id)\/(terms|privacy|dpa|sla|aup|cookie|trust)(?:#(.+))?$/);
          if (cross) {
            expect(cross[1]).toBe(lang);
            if (cross[3]) expect(own[cross[2]], `${lang} ${kind} ${href}`).toContain(cross[3]);
          }
        }
      }
    }
  });

  it('has unique anchors on every page, so a link never lands on the wrong place', () => {
    for (const [lang, docs] of Object.entries(DOCS)) {
      for (const kind of KINDS) {
        const found = ids(docs[kind]);
        expect(found.length, `${lang} ${kind}`).toBe(new Set(found).size);
      }
    }
  });

  it('carries the 2026-10-16 version that sso must be configured with', () => {
    expect(en.LEGAL_VERSION).toBe('2026-10-16');
    for (const docs of Object.values(DOCS)) {
      for (const kind of ['terms', 'privacy']) expect(docs[kind].metaLine).toContain('2026-10-16');
    }
    // 2026-11-19: Sentry left the provider list. Removing a provider asks no one to accept again,
    // so the version stays and only the date moves.
    // 2026-11-22: account deletion takes 7 days with a cancel link (SO53). The text now says what the
    // product does and adds no new obligation, so again the version stays and only the date moves.
    // 2026-11-28: the Efolusi Pay documents moved here from pay.efolusi.com (PY87, PY109). The accounts of
    // people are not asked for anything new, so the version stays and only the date moves.
    for (const doc of [en.terms, id.terms, en.privacy, id.privacy]) expect(doc.metaLine).toContain('28 November 2026');
    expect(JSON.stringify(DOCS)).not.toMatch(/sentry/i);
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
          `https://toolips.xyz/${lang}/terms`,
          'https://kongkow.xyz/terms'
        ])
      );
      expect(legalLinks(docs.privacy, lang)).toEqual(
        expect.arrayContaining([
          `https://trady.efolusi.com/${lang}/privacy`,
          'https://cuwan.xyz/privacy',
          'https://zoyya.xyz/privacy',
          `https://toolips.xyz/${lang}/privacy`,
          'https://kongkow.xyz/privacy'
        ])
      );
    }
  });

  it('lists Kongkow with the products that have their own terms, not the ones without', () => {
    for (const docs of Object.values(DOCS)) {
      const scope = allText(docs.terms.sections.find((s) => s.id === 'scope')).join('\n');
      expect(scope).not.toMatch(/Sanctum,? (and|dan) Kongkow/);
      expect(scope).toMatch(/Toolips,? (and|dan) Kongkow/);
      expect(allText(docs.terms).join('\n')).not.toMatch(/(does not publish anywhere|belum menerbitkan)/);
    }
  });

  it('has no unresolved drafting markers, em dashes or double hyphens', () => {
    for (const docs of Object.values(DOCS)) {
      for (const text of allText(KINDS.map((kind) => docs[kind]))) {
        expect(text).not.toMatch(/\[(PLACEHOLDER|DECISION|FIX)|TODO|—|–|--/);
      }
    }
  });
});

describe('Efolusi Pay legal documents (moved from pay.efolusi.com)', () => {
  it('names the published entity, address and the one inbox on every new page', () => {
    for (const docs of Object.values(DOCS)) {
      for (const kind of PAY_KINDS) {
        const text = allText(docs[kind]).join('\n');
        expect(text, kind).toContain(ENTITY);
        expect(text, kind).toContain(ADDRESS);
        expect([...new Set(text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g))], kind).toEqual(['hi@efolusi.com']);
      }
    }
  });

  it('keeps the owner text of the merged sections: Pay terms, Pay privacy, refunds and chargebacks', () => {
    const text = (doc, key) => allText(doc.sections.find((x) => x.id === key)).join('\n');
    expect(text(en.terms, 'pay')).toMatch(/Pay is not a bank and does not hold customer funds/);
    expect(text(id.terms, 'pay')).toMatch(/Pay bukan bank dan bukan penyimpan dana nasabah/);
    expect(text(en.privacy, 'pay')).toMatch(/within 3×24 hours/);
    expect(text(id.privacy, 'pay')).toMatch(/≤ 3×24 jam/);
    expect(text(en.terms, 'refunds')).toMatch(/anti over-refund guard[\s\S]*lost dispute reverses funds/);
    expect(text(id.terms, 'refunds')).toMatch(/guard anti over-refund[\s\S]*Kehilangan dispute membalik dana/);
  });

  it('names the payment sub-processors in the privacy notice and lists them on the trust page', () => {
    for (const [lang, docs] of Object.entries(DOCS)) {
      const sharing = allText(docs.privacy.sections.find((x) => x.id === 'sharing')).join('\n');
      expect(sharing, lang).toMatch(/Mayar/);
      expect(sharing, lang).toMatch(/NOWPayments/);
      const table = docs.trust.sections.find((x) => x.id === 'sub-processors').blocks.find((b) => b.table).table;
      expect(table.rows.map((row) => row[0]), lang).toEqual(expect.arrayContaining(['Mayar', 'NOWPayments']));
      for (const row of table.rows) expect(row.length, lang).toBe(table.head.length);
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
