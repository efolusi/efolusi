/* Request header middleware sets to the locale a page renders in, so that
   app/global-not-found.js (which receives no params) can render the 404 in the
   reader's language. */
export const LOCALE_HEADER = 'x-efolusi-locale';
