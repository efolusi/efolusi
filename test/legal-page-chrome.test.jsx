import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getDictionary, locales } from '../app/dictionaries/config.js';
import LegalDocument from '../app/components/LegalDocument.jsx';

vi.mock('next/navigation', () => ({ usePathname: () => globalThis.__pathname }));
// social-icons.js holds JSX in a .js file, which Vitest does not transform; the icons are not under test.
vi.mock('../app/lib/social-icons.js', () => ({ SocialIcon: () => null }));

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('app/globals.css');

function render(lang, kind) {
  globalThis.__pathname = `/${lang}/${kind}`;
  const dict = getDictionary(lang);
  return renderToStaticMarkup(<LegalDocument doc={dict[kind]} lang={lang} t={dict.common} />);
}

afterEach(() => vi.useRealTimers());

describe.each(locales)('legal pages carry the site chrome (%s)', (lang) => {
  describe.each(['privacy', 'terms', 'dpa', 'sla', 'aup', 'cookie', 'trust'])('/%s', (kind) => {
    const html = render(lang, kind);
    const other = lang === 'en' ? 'id' : 'en';

    it('renders the site header, the footer and the page body', () => {
      expect(html).toContain('<header class="site-header');
      expect(html).toContain('<footer class="footer"');
      expect(html).toContain('<h1 class="ef-page-title">');
    });

    it('has the theme toggle, in the page language', () => {
      expect(html).toMatch(/ef-themetoggle|data-theme-toggle|aria-label="[^"]*(theme|tema)[^"]*"/i);
    });

    it('has the language switch to the same page, with hreflang and lang', () => {
      const link = html.match(/<a[^>]*class="lang-switch"[^>]*>/)?.[0];
      expect(link).toBeDefined();
      expect(link).toContain(`href="/${other}/${kind}"`);
      // React writes the attribute as hrefLang; HTML attribute names are case-insensitive.
      expect(link).toMatch(new RegExp(`hreflang="${other}"`, 'i'));
      expect(link).toContain(`lang="${other}"`);
    });

    it('puts the page body in the skip link target', () => {
      expect(html).toContain('<a class="skip-link" href="#top">');
      expect(html).toMatch(/<main[^>]*id="top"[^>]*tabindex="-1"/);
    });

    it('links the legal row of the footer to every legal page', () => {
      for (const page of ['privacy', 'terms', 'dpa', 'sla', 'aup', 'cookie', 'trust']) {
        expect(html).toContain(`href="/${lang}/${page}"`);
      }
    });
  });
});

describe('the footer year is computed', () => {
  it.each(locales)('%s dictionary types no year', (lang) => {
    expect(getDictionary(lang).common.footer.rights).not.toMatch(/\d{4}/);
  });

  it.each([
    ['en', 2031, '© 2031 PT Efolusi Dunia Teknologi.'],
    ['id', 2040, '© 2040 PT Efolusi Dunia Teknologi.']
  ])('%s footer shows the current year (%i)', (lang, year, expected) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(year, 5, 15)));
    expect(render(lang, 'privacy')).toContain(expected);
  });
});

describe('legal titles are sentence case', () => {
  const sentenceCase = (title) => {
    // Names (Efolusi, Pay) and acronyms such as (DPA) keep their capitals.
    const words = title
      .split(' · ')[0]
      .split(' ')
      .filter((w) => w !== 'Efolusi' && w !== 'Pay' && !/^\(?[A-Z]{2,}\)?$/.test(w));
    // Only the first word of the title may start with a capital.
    return words.slice(1).every((w) => w === w.toLowerCase());
  };

  it.each(locales)('%s page title, tab title and heading', (lang) => {
    const d = getDictionary(lang);
    for (const kind of ['privacy', 'terms', 'dpa', 'sla', 'aup', 'cookie', 'trust']) {
      expect(sentenceCase(d[kind].title), d[kind].title).toBe(true);
      expect(sentenceCase(d[kind].meta.title), d[kind].meta.title).toBe(true);
    }
  });

  it('llms.txt names the same titles', () => {
    expect(read('app/llms.txt/route.js')).not.toMatch(/Platform Terms|Platform Privacy Notice/);
  });
});

describe('the language link (EF38)', () => {
  const header = read('app/components/SiteHeader.jsx');

  it('names its language to browsers and assistive technology', () => {
    expect(header).toMatch(/className="lang-switch"[^>]*hrefLang=\{other\}/);
    expect(header).toMatch(/className="lang-switch"[^>]*\blang=\{other\}/);
  });

  it('is the md control size from the Meridian token (44 px on touch)', () => {
    const block = css.match(/\.lang-switch,\n\.menu-toggle,\n\.site-header \.ef-theme-toggle \{[^}]*\}/)[0];
    expect(block).toMatch(/width: var\(--control-h-md\);/);
    expect(block).toMatch(/height: var\(--control-h-md\);/);
  });
});

describe('the accent word follows the accent edge (EF37, MD109)', () => {
  it('has one --accent-word token that points at --accent-edge', () => {
    expect(css).toMatch(/--accent-word: var\(--accent-edge\);/);
  });

  it('.accent uses it and has no dark override', () => {
    expect(css).toMatch(/\.accent \{\n {2}color: var\(--accent-word\);\n\}/);
    expect(css).not.toMatch(/\[data-theme='dark'\] \.accent \{/);
  });
});

describe('header buttons and the contact submit are Meridian sizes (MD94)', () => {
  const header = read('app/components/SiteHeader.jsx');
  const home = read('app/components/HomeClient.jsx');

  it('the header pills take their look from Meridian buttonVariants at lg (44)', () => {
    expect(header).toMatch(/import \{[^}]*buttonVariants[^}]*\} from '@efolusi\/meridian';/);
    expect(header.match(/buttonVariants\(\{[^}]*size: 'lg'[^}]*shape: 'pill'/g)).toHaveLength(2);
    expect(header).not.toMatch(/pill--sm|pill--plain/);
  });

  it('the site keeps no 40 px pill size', () => {
    expect(css).not.toMatch(/\.pill--sm|\.pill--plain|\.sign-in-pill/);
  });

  it('the contact submit is a Meridian lg button with no own height', () => {
    expect(home).toMatch(/<Button type="submit" size="lg" fullWidth iconRight="send"/);
    expect(css).not.toMatch(/\.contact-form \.ef-btn\[type='submit'\]/);
  });
});
