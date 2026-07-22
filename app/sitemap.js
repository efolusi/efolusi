export default function sitemap() {
  const base = 'https://efolusi.com';

  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/token`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/careers`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/brand`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 }
  ];
}
