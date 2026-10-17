'use client';

import { usePathname } from 'next/navigation';
import { isLocale } from '../dictionaries/config.js';
import NotFoundView from '../components/NotFoundView.jsx';

/* Reached on client-side navigation to a missing page. A full page load of an
   unknown URL is rendered by app/global-not-found.js instead. not-found
   boundaries receive no params, so the locale comes from the path. */
export default function NotFound() {
  const pathname = usePathname() || '';
  const segment = pathname.split('/')[1];
  return <NotFoundView lang={isLocale(segment) ? segment : 'en'} />;
}
