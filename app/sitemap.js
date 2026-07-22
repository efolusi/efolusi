export default function sitemap() {
  const base = 'https://efolusi.com';

  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 }
  ];
}
