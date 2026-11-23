/** The release this build came from: the full git SHA that next.config.mjs resolves at build time. */
export const RELEASE_SHA = process.env.NEXT_PUBLIC_RELEASE_SHA ?? '';

export const isReleaseSha = (value) => typeof value === 'string' && /^[0-9a-f]{40}$/.test(value);
