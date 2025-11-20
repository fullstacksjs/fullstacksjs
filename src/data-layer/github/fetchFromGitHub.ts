import { joinPaths } from '@fullstacksjs/toolbox';

import { serverConfig } from '@/config/serverConfig';

export async function fetchFromGitHub<T>(path: string): Promise<T[]> {
  const res = await fetch(joinPaths('https://api.github.com/', path), {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${serverConfig.get('github.token')}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (res.status >= 400)
    throw new Error(`[GitHub]: Request failed with status ${res.status}`, {
      cause: await res.text(),
    });

  if (res.status === 204) return [];

  return res.json() as Promise<T[]>;
}
