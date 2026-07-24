import en from './en.js';
import id from './id.js';

export const locales = ['en', 'id'];
export const defaultLocale = 'en';

const dictionaries = { en, id };

export function getDictionary(lang) {
  return dictionaries[lang] || dictionaries[defaultLocale];
}

export function isLocale(value) {
  return locales.includes(value);
}
