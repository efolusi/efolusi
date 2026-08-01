const base = 'https://efolusi.com';

const pages = [
  ['', 'monthly', 1],
  ['/token', 'weekly', 0.9],
  ['/about', 'monthly', 0.7],
  ['/careers', 'monthly', 0.7],
  ['/brand', 'yearly', 0.4],
  ['/privacy', 'yearly', 0.3],
  ['/terms', 'yearly', 0.3]
];

export default function sitemap() {
  const entries = [];

  for (const [path, changeFrequency, priority] of pages) {
    const languages = { en: `${base}/en${path}`, id: `${base}/id${path}` };
    for (const lang of ['en', 'id']) {
      entries.push({
        url: `${base}/${lang}${path}`,
        changeFrequency,
        priority,
        alternates: { languages }
      });
    }
  }

  return entries;
}
