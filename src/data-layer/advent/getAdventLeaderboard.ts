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

type InsertAdvent = Database['public']['Tables']['advent']['Insert'];

export async function syncLeaderboard() {
  const { year } = serverConfig.advent;
  const supabase = createServerSupabaseClient();

  const leaderboard = await fetchLeaderboard();
  const members = leaderboard
    .filter((u) => u.name)
    .map<InsertAdvent>((acc) => ({
      id: acc.id.toString(),
      year,
      name: acc.name,
    }));

  await supabase.from('advent').upsert(members, { onConflict: 'id,year' });
}

async function fetchLeaderboard() {
  const { url, session } = serverConfig.advent;
  const headers = new Headers();
  headers.set('cookie', `session=${session}`);
  const res = await fetch(url, { headers, next: { revalidate: 1800 } });
  const json = (await res.json()) as AdventOfCodeResponse;

  return Object.values(json.members)
    .filter((m) => m.name)
    .sort((a, b) => b.local_score - a.local_score);
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

          return {
            avatar: d.profiles!.avatar_url,
            id: d.id,
            name: adventUser.name!,
            score: adventUser.local_score,
            stars: adventUser.stars,
          };
        })
        .filter(Boolean) ?? []
    );
  } catch {
    return [];
  }
}
