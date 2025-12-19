import { cacheLife, cacheTag } from 'next/cache';

import { cacheTags } from '@/config/cacheTags';

import { fetchFromGitHub } from './fetchFromGitHub';

interface GitHubRepo {
  name: string;
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Contributor {
  username: string;
  avatar: string;
  url: string;
}

const toContributor = (contributor: GitHubContributor): Contributor => ({
  username: contributor.login,
  avatar: contributor.avatar_url,
  url: contributor.html_url,
});

export async function getContributors() {
  'use cache';

  cacheLife('max');
  cacheTag(cacheTags.contributors());

  const repos = await fetchFromGitHub<GitHubRepo>('orgs/fullstacksjs/repos');

  const contributorPromises = repos.map(async (repo) =>
    fetchFromGitHub<GitHubContributor>(
      `repos/fullstacksjs/${repo.name}/contributors`,
    ),
  );

  const contributorsResult = await Promise.allSettled(contributorPromises);
  const contributorsMatrix = contributorsResult.flatMap((result) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return [];
    }
  });

  const members = await fetchFromGitHub<GitHubContributor>(
    '/orgs/fullstacksjs/members',
  );

  const contributors = contributorsMatrix.concat(members);

  const uniqueContributors = Array.from(
    new Map(contributors.map((c) => [c.login, c])).values(),
  );

  return uniqueContributors.map(toContributor);
}
