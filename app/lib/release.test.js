import { describe, expect, it } from 'vitest';

import { isReleaseSha } from './release.js';

describe('release marker', () => {
  it('accepts only a full lowercase git sha', () => {
    expect(isReleaseSha('4baa90b58b0f84d605b9406392b26e4192640e97')).toBe(true);
    expect(isReleaseSha('4baa90b')).toBe(false);
    expect(isReleaseSha('4BAA90B58B0F84D605B9406392B26E4192640E97')).toBe(false);
    expect(isReleaseSha('')).toBe(false);
    expect(isReleaseSha(undefined)).toBe(false);
  });
});
