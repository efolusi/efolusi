import { describe, it, expect } from 'vitest';
import { escapeHtml, parseSender } from './route.js';

describe('escapeHtml', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml('<script>"&"</script>')).toBe(
      '&lt;script&gt;&quot;&amp;&quot;&lt;/script&gt;'
    );
  });

  it('leaves plain text untouched', () => {
    expect(escapeHtml('hello there')).toBe('hello there');
  });
});

describe('parseSender', () => {
  it('parses the "Name <address>" form', () => {
    expect(parseSender('Efolusi <hi@efolusi.com>')).toEqual({
      name: 'Efolusi',
      email: 'hi@efolusi.com'
    });
  });

  it('strips surrounding quotes from the name', () => {
    expect(parseSender('"Efolusi Studio" <hi@efolusi.com>')).toEqual({
      name: 'Efolusi Studio',
      email: 'hi@efolusi.com'
    });
  });

  it('falls back to a default name for a bare address', () => {
    expect(parseSender('hi@efolusi.com')).toEqual({
      name: 'Efolusi website',
      email: 'hi@efolusi.com'
    });
  });
});
