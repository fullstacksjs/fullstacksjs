import { serverConfig } from '@/config/serverConfig';

import type { Database } from '../supabase/models/Database';
import type { AdventOfCodeUser } from './AdventOfCodeUser';

import { createServerSupabaseClient } from '../supabase/SupabaseServer';
import { Star } from './AdventOfCodeUser';

interface Day {
  get_star_ts: number;
  star_index: number;
}

interface AdventOfCodeResponseUser {
  owner_id?: number;
  completion_day_level: Record<number, Record<number, Day>>;
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

type InsertAdvent = Database['public']['Tables']['advent']['Insert'];
const starMap = [Star.None, Star.Silver, Star.Gold];

export async function syncLeaderboard() {
  const { year } = serverConfig.get('advent');
  const supabase = createServerSupabaseClient();

  const leaderboard = await fetchLeaderboard();
  const members = leaderboard
    .filter((u) => u.name)
    .map<InsertAdvent>((acc) => ({
      id: acc.id.toString(),
      year,
      name: acc.name,
    }));

  const { data, error } = await supabase
    .from('advent')
    .upsert(members, { onConflict: 'id,year' })
    .select();

  if (error) throw error;

  console.log('Sync Advent:', data);
  return data;
}

export async function fetchLeaderboard() {
  const { url, session } = serverConfig.get('advent');
  const headers = new Headers();
  headers.set('cookie', `session=${session}`);
  const res = await fetch(url, { headers, next: { revalidate: 900 } });
  const json = (await res.json()) as AdventOfCodeResponse;

  return Object.values(json.members).filter((m) => m.name);
}

export async function getAdventLeaderboard(): Promise<AdventOfCodeUser[]> {
  try {
    const leaderboard = await fetchLeaderboard();
    const supabase = createServerSupabaseClient();

    const { data = [] } = await supabase.from('advent').select(`
      id,
      year,
      username,
      profiles (
        avatar_url
      )
    `);

    return (
      data
        ?.filter((d) => d.profiles)
        .map<AdventOfCodeUser | null>((d) => {
          const adventUser = leaderboard.find((l) => l.id.toString() === d.id);
          if (!adventUser) return null;

          const a = {
            avatar: d.profiles!.avatar_url ?? undefined,
            id: d.id,
            name: adventUser.name!,
            score: adventUser.local_score,
            stars: Object.values(adventUser.completion_day_level).map(
              (s) => starMap[Object.values(s).length] ?? Star.None,
            ),
          } satisfies AdventOfCodeUser;

          return a;
        })
        .filter(Boolean) ?? []
    ).toSorted((b, a) => a.score - b.score);
  } catch {
    return [];
  }
}
