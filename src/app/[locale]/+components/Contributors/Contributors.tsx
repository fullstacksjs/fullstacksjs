import Link from 'next/link';
import { Suspense } from 'react';

import { Contributor } from '@/app/[locale]/+components/Contributors/Contributor';
import { ContributorsSkeleton } from '@/app/[locale]/+components/Contributors/ContributorsSkeleton';
import { Button } from '@/components/Button';
import Telegram from '@/components/Icons/Telegram.svg';

interface RepoType {
  name: string;
}

interface ContributorType {
  login: string;
  avatar_url: string;
  html_url: string;
}

async function fetchFromGitHub<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    if (!json) return [];

    return Array.isArray(json) ? (json as T[]) : [];
  } catch {
    return [];
  }
}

export async function Contributors({
  title,
  buttonText,
}: {
  title: string;
  buttonText: string;
}) {
  const repos = await fetchFromGitHub<RepoType>(
    'https://api.github.com/orgs/fullstacksjs/repos',
  );

  const contributorPromises = repos.map((repo) =>
    fetchFromGitHub<ContributorType>(
      `https://api.github.com/repos/fullstacksjs/${repo.name}/contributors`,
    ),
  );

  const contributorsArray = await Promise.all(contributorPromises);

  let allContributors = contributorsArray.flat();

  const members = await fetchFromGitHub<ContributorType>(
    'https://api.github.com/orgs/fullstacksjs/members',
  );

  allContributors = allContributors.concat(members);

  const uniqueContributors = Array.from(
    new Map(allContributors.map((c) => [c.login, c])).values(),
  );

  return (
    <div className="flex flex-col items-center justify-center text-4xl gap-20">
      <p className="font-bold">{title}</p>

      <Suspense fallback={<ContributorsSkeleton />}>
        <div className="flex gap-5 flex-wrap justify-center items-center">
          {uniqueContributors.map((item) => (
            <Contributor
              avatar={item.avatar_url}
              key={item.login}
              name={item.login}
              url={item.html_url}
            />
          ))}
        </div>
      </Suspense>

      <Link href="https://t.me/fullstacksjs/163197">
        <Button>
          {buttonText}
          <Telegram />
        </Button>
      </Link>
    </div>
  );
}
