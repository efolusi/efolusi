'use client';

import { useState } from 'react';
import { Icon, Tag } from '@efolusi/meridian';
import { productMeta } from '../lib/products.js';

const groups = [
  { id: 'all', en: 'All products', idLabel: 'Semua produk' },
  { id: 'work', en: 'Work with AI', idLabel: 'Bekerja dengan AI', products: ['runa', 'sanctum', 'toolips'] },
  { id: 'build', en: 'Build & manage applications', idLabel: 'Bangun dan kelola aplikasi', products: ['zoyya', 'loop', 'komando'] },
  { id: 'create', en: 'Create & publish content', idLabel: 'Buat & terbitkan konten', products: ['trady', 'kongkow'] },
  { id: 'developer', en: 'For developers', idLabel: 'Untuk developer', products: ['relay', 'meridian'] },
  { id: 'trading', en: 'Trading', idLabel: 'Trading', products: ['cuwan'] },
  { id: 'foundation', en: 'Ecosystem essentials', idLabel: 'Fondasi ekosistem', products: ['my', 'pay'] }
];

function ProductMark({ product }) {
  return <span className={`portfolio-mark tint-${product.tint}`} aria-hidden="true">
    {product.brandMark ? <span className="meridian-mark" /> : product.logo ? <img src={product.logo} alt="" /> : product.mark}
  </span>;
}

function ProductAccessory({ product, featured = false }) {
  return <span className={`portfolio-accessory portfolio-accessory--${product.id}${featured ? ' portfolio-accessory--featured' : ''}`} aria-hidden="true">
    <Icon name={product.icon} size={featured ? 34 : 25} />
  </span>;
}

export default function ProductPortfolio({ products, lang, full = false }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const id = lang === 'id';
  const all = productMeta.map(meta => ({ ...meta, ...products[meta.id] }));
  const featured = ['runa'].map(key => all.find(product => product.id === key));
  const selectedGroup = groups.find(group => group.id === filter);
  const visible = full ? all.filter(product =>
    (filter === 'all' || selectedGroup.products.includes(product.id)) &&
    `${product.title} ${product.summary} ${product.section}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  ) : ['zoyya', 'trady', 'kongkow', 'cuwan', 'komando', 'meridian'].map(key => all.find(product => product.id === key));

  return <div className="portfolio-browser">
    {!full && <div className="portfolio-featured portfolio-featured--primary">
      {featured.map(product => <a className={`portfolio-feature portfolio-feature--${product.tint}`} href={product.href} target="_blank" rel="noopener noreferrer" key={product.id}>
        <div className="portfolio-card-top"><ProductMark product={product} /><span>{product.title}</span></div><ProductAccessory product={product} featured />
        <h3>{product.headline || product.title}</h3>
        <p>{product.desc}</p>
        <div className="portfolio-feature-bottom"><div className="portfolio-specs">{product.specs.map(spec => <Tag key={spec}>{spec}</Tag>)}</div><span className="portfolio-visit">{product.buttonLabel} <Icon name="arrow-up-right" size={16} /></span></div>
      </a>)}
    </div>}

    {!full && <>
      {['build', 'create', 'developer'].map(key => {
        const group = groups.find(item => item.id === key);
        return <section className="portfolio-use-case" data-group={key} key={key}>
          <h3>{id ? group.idLabel : group.en}</h3>
          <div className={`portfolio-grid portfolio-grid--${group.products.length}`}>
            {group.products.map(key => {
              const product = all.find(item => item.id === key);
              return <a className={`portfolio-card portfolio-card--${product.tint}`} href={product.href} target="_blank" rel="noopener noreferrer" key={key}>
                <div className="portfolio-card-top"><ProductMark product={product} /><span>{product.tag}</span></div><ProductAccessory product={product} />
                <h4>{product.title}</h4><p>{product.summary}</p>
              </a>;
            })}
          </div>
        </section>;
      })}
      <div className="portfolio-toolbar"><h3>{id ? 'Masih mencari yang lain?' : 'Looking for something else?'}</h3><a href={`/${lang}/portfolio`}>{id ? 'Lihat semua produk' : 'Explore all products'} ({all.length}) <Icon name="arrow-right" size={18} /></a></div>
    </>}
    {full && <>
    <div className="portfolio-toolbar">
      <h3>{full ? (id ? 'Temukan produkmu' : 'Find your next tool') : (id ? 'Jelajahi lebih banyak' : 'More to explore')}</h3>
      {full ? <label className="portfolio-search"><Icon name="search" size={18} /><input aria-label={id ? 'Cari produk' : 'Search products'} placeholder={id ? 'Cari produk…' : 'Search products…'} value={query} onChange={event => setQuery(event.target.value)} /></label> : <a href={`/${lang}/portfolio`}>{id ? 'Lihat semua produk' : 'Explore all products'} <span>({all.length})</span><Icon name="arrow-right" size={18} /></a>}
    </div>
    {full && <div className="portfolio-filters" aria-label={id ? 'Kategori produk' : 'Product categories'}>{groups.map(group => <button key={group.id} type="button" aria-pressed={filter === group.id} onClick={() => setFilter(group.id)}>{id ? group.idLabel : group.en}</button>)}</div>}
    {full && <p className="portfolio-results" role="status">{visible.length} {id ? 'produk ditemukan' : 'products found'}</p>}
    <div className="portfolio-grid">
      {visible.map(product => <a className={`portfolio-card portfolio-card--${product.tint}`} href={product.href} target="_blank" rel="noopener noreferrer" key={product.id}>
        <div className="portfolio-card-top"><ProductMark product={product} /><span>{product.tag}</span><Icon name="arrow-up-right" size={18} /></div>
        <h4>{product.title}</h4><p>{product.summary}</p>
      </a>)}
    </div>
    {full && visible.length === 0 && <div className="portfolio-empty"><p>{id ? 'Belum ada yang cocok. Coba kata lain atau kategori berbeda.' : 'No matches. Try another search or category.'}</p><button type="button" onClick={() => { setFilter('all'); setQuery(''); }}>{id ? 'Reset pencarian' : 'Clear search'}</button></div>}
    </>}
  </div>;
}
