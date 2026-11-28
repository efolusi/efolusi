/* The footer line is stored with a {year} slot, so the year is never typed
   into a dictionary and never goes stale. */
export function withYear(template, now = new Date()) {
  return template.replace('{year}', String(now.getFullYear()));
}
