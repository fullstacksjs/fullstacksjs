import { serverConfig } from '@/config/serverConfig';

import type { AdventOfCodeUser } from './AdventOfCodeUser';

interface AdventOfCodeResponseUser {
  owner_id?: number;
  completion_day_level: unknown;
  global_score: number;
  id: number;
  last_star_ts: number;
  local_score: number;
  name: string | null;
  stars: number;
}

interface AdventOfCodeResponse {
  owner_id: number;
  event: string;
  members: Record<string, AdventOfCodeResponseUser>;
}

function toAdventOfCodeUser(res: AdventOfCodeResponseUser): AdventOfCodeUser {
  return {
    id: res.id,
    name: res.name ?? 'Anon',
    username: 'IDK',
    score: res.local_score,
    stars: res.stars,
    avatar: 'https://avatars.githubusercontent.com/u/76112461',
  };
}

export async function getAdventLeaderboard(): Promise<AdventOfCodeUser[]> {
  const { url, session } = serverConfig.advent;
  const headers = new Headers();
  headers.set('cookie', `session=${session}`);

  try {
    const res = await fetch(url, { headers, next: { revalidate: 1800 } });
    const json = (await res.json()) as AdventOfCodeResponse;
    const apiResponse = Object.values(json.members);
    const members = apiResponse.map(toAdventOfCodeUser);

    return members.sort((a, b) => b.score - a.score);
  } catch {
    return [];
  }
}
