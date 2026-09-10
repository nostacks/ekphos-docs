const REPO = 'nostacks/ekphos';

export const GITHUB_URL = `https://github.com/${REPO}`;

export interface RepoInfo {
  stars: string;
  version: string | null;
}

const FALLBACK: RepoInfo = {
  stars: '★',
  version: null,
};

export async function getRepoInfo(): Promise<RepoInfo> {
  try {
    const [repoRes, releaseRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`, {
        next: { revalidate: 1800 },
      }),
      fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
        next: { revalidate: 1800 },
      }),
    ]);

    const repo = repoRes.ok ? await repoRes.json() : null;
    const release = releaseRes.ok ? await releaseRes.json() : null;

    return {
      stars:
        typeof repo?.stargazers_count === 'number'
          ? repo.stargazers_count.toLocaleString('en-US')
          : FALLBACK.stars,
      version: typeof release?.tag_name === 'string' ? release.tag_name : null,
    };
  } catch {
    return FALLBACK;
  }
}
