import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { latestReleases } from '../app/lib/latest-releases.mjs';

const repos = { komando: 'sgnd/komando', cuwan: 'sgnd/cuwan', trady: 'sgnd/trady', toolips: 'sgnd/toolips' };

const answer = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body });

describe('release tags come from the repos, never from the source (EF23)', () => {
  it('reads the newest release tag of each repo', async () => {
    const fetchImpl = async (url) => answer(200, { tag_name: url.includes('/sgnd/komando/') ? 'v0.17.0' : 'v0.0.1' });
    const { tags, failed } = await latestReleases(repos, fetchImpl);
    expect(tags).toEqual({ komando: 'v0.17.0', cuwan: 'v0.0.1', trady: 'v0.0.1', toolips: 'v0.0.1' });
    expect(failed).toEqual([]);
  });

  it('a repo without a release has no tag, and that is not a failure', async () => {
    const { tags, failed } = await latestReleases({ cuwan: 'sgnd/cuwan' }, async () => answer(404, { message: 'Not Found' }));
    expect(tags).toEqual({ cuwan: null });
    expect(failed).toEqual([]);
  });

  it('a failed lookup gives no tag, never an old number, and is reported', async () => {
    const fetchImpl = async (url) => {
      if (url.includes('/sgnd/komando/')) throw new Error('network down');
      if (url.includes('/sgnd/trady/')) return answer(403, { message: 'rate limit exceeded' });
      if (url.includes('/sgnd/toolips/')) return answer(200, { tag_name: 'not-a-version' });
      return answer(200, { tag_name: 'v0.0.1' });
    };
    const { tags, failed } = await latestReleases(repos, fetchImpl);
    expect(tags).toEqual({ komando: null, cuwan: 'v0.0.1', trady: null, toolips: null });
    expect(failed.sort()).toEqual(['komando', 'toolips', 'trady']);
  });

  it('no version number is written into the site source', () => {
    for (const file of ['../app/lib/products.js', '../app/dictionaries/en.js', '../app/dictionaries/id.js', '../app/llms.txt/route.js']) {
      expect(readFileSync(new URL(file, import.meta.url), 'utf8'), file).not.toMatch(/'v\d+\.\d+\.\d+'|\bv\d+\.\d+\.\d+\b/);
    }
  });
});
