/** The repo that holds each product's releases. */
export const releaseRepos = { komando: 'sgnd/komando', toolips: 'sgnd/toolips', trady: 'sgnd/trady', kongkow: 'sgnd/kongkow', cuwan: 'sgnd/cuwan' };

const TAG = /^v\d+\.\d+\.\d+$/;

/**
 * The newest release tag of each repo, from the public GitHub API (no token).
 * A repo with no release is `null` and is not a failure. A lookup that fails
 * (network, rate limit, an answer that is not a version tag) is also `null`,
 * so the site shows no version rather than an old one, and the id is listed in
 * `failed` for the caller to report.
 */
export async function latestReleases(repos, fetchImpl = fetch) {
  const tags = {};
  const failed = [];
  await Promise.all(Object.entries(repos).map(async ([id, repo]) => {
    tags[id] = null;
    try {
      const res = await fetchImpl(`https://api.github.com/repos/${repo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'site-build' },
        signal: AbortSignal.timeout(8000)
      });
      if (res.status === 404) return;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { tag_name: tag } = await res.json();
      if (!TAG.test(tag)) throw new Error('not a version tag');
      tags[id] = tag;
    } catch {
      failed.push(id);
    }
  }));
  return { tags, failed };
}
