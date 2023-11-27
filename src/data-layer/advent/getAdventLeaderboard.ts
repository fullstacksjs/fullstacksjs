import { serverConfig } from '@/config/serverConfig';

import type { Database } from '../supabase/models/Database';
import { createServerSupabaseClient } from '../supabase/SupabaseServer';
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

type Insert = Database['public']['Tables']['advent']['Insert'];

export async function syncLeaderboard() {
  const { url, session, year } = serverConfig.advent;
  const supabase = createServerSupabaseClient();
  const headers = new Headers();
  headers.set('cookie', `session=${session}`);

  const res = await getLeaderboard(url, headers);
  const apiResponse = Object.values(res.members);
  const members = apiResponse
    .filter((u) => u.name)
    .map<Insert>((acc) => ({ id: acc.id.toString(), year, name: acc.name }));

  await supabase.from('advent').upsert(members, { onConflict: 'id,year' });
}

async function getLeaderboard(url: string, headers: Headers) {
  const res = await fetch(url, { headers, next: { revalidate: 1800 } });
  return res.json() as Promise<AdventOfCodeResponse>;
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
