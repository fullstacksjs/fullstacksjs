import { Button } from '@/components/Button';
import { Suspense } from 'react';
import Telegram from '@/components/Icons/Telegram.svg';
import Contributor from '@/components/Contributor';
import Link from 'next/link';
import ContributorsSkeleton from '@/components/ContributorsSkeleton';

type RepoType = {
  name: string;
};

type ContributorType = {
  login: string;
  avatar_url: string;
  html_url: string;
};

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

    const text = await res.text();
    if (!text) return [];

    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      return [];
    }

    return Array.isArray(json) ? (json as T[]) : [];
  } catch {
    return [];
  }
}

async function Contributors({
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

  const allContributors = contributorsArray.flat();

  const members = (await fetchFromGitHub(
    'https://api.github.com/orgs/fullstacksjs/members',
  )) as ContributorType[];
  
  members.map((item) => allContributors.push(item));

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
              key={item.login}
              name={item.login}
              avatar={item.avatar_url}
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

export default Contributors;
