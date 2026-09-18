import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries/config.js';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).common.notFound.meta, robots: { index: false } };
}

/* Any path under a locale that no page claims renders the branded 404 in
   app/[lang]/not-found.js, inside the locale layout, with a real 404 status. */
export default function UnknownPage() {
  notFound();
}
