import { parseInline } from '../lib/legal-inline.js';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';

function Inline({ text, lang }) {
  return parseInline(text, lang).map((part, i) => {
    if (part.type === 'strong') return <strong key={i}>{part.text}</strong>;
    if (part.type === 'link') {
      const external = /^https?:\/\//.test(part.href);
      return (
        <a key={i} href={part.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {part.text}
        </a>
      );
    }
    return part.text;
  });
}

function Block({ block, lang }) {
  if (typeof block === 'string') {
    return (
      <p>
        <Inline text={block} lang={lang} />
      </p>
    );
  }
  if (block.h3) {
    return (
      <h3 id={block.id}>
        <Inline text={block.h3} lang={lang} />
      </h3>
    );
  }
  if (block.table) {
    return (
      <div className="legal-table">
        <table>
          <thead>
            <tr>
              {block.table.head.map((cell) => (
                <th key={cell} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <ul>
      {block.ul.map((item) => (
        <li key={item}>
          <Inline text={item} lang={lang} />
        </li>
      ))}
    </ul>
  );
}

/*
 * Shared page of every legal document (terms, privacy, dpa, sla, aup, cookie, trust), inside the same header and footer as
 * every other page of the site. `doc` comes from the dictionaries
 * (app/dictionaries/legal-*.js): intro blocks plus sections, each with an id
 * that other pages and products link to (for example /terms#refunds). A block is a
 * paragraph, { h3, id }, { ul } or { table: { head, rows } }. `t` is
 * the dictionary's `common` block for the header and footer.
 */
export default function LegalDocument({ doc, lang, t }) {
  return (
    <>
      <SiteHeader lang={lang} t={t} />
      <main id="top" tabIndex={-1} className="legal-page">
        <h1 className="ef-page-title">{doc.title}</h1>
        <p className="legal-meta">{doc.metaLine}</p>

        {doc.intro.map((block, i) => (
          <Block key={i} block={block} lang={lang} />
        ))}

        <nav className="legal-toc" aria-label={doc.contentsHead}>
          <p className="legal-toc-head">{doc.contentsHead}</p>
          <ol>
            {doc.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.head}</a>
              </li>
            ))}
          </ol>
        </nav>

        {doc.sections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id}>{section.head}</h2>
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} lang={lang} />
            ))}
          </section>
        ))}
      </main>
      <SiteFooter lang={lang} t={t} />
    </>
  );
}
