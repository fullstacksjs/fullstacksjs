export interface AdventOfCodeResponseUser {
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
  members: Record<string, AdventOfCodeUser>;
}

// cspell:disable
const mock = {
  owner_id: 3205245,
  event: '2023',
  members: {
    '3205318': {
      global_score: 1,
      local_score: 1,
      last_star_ts: 6,
      id: 3205318,
      stars: 6,
      name: 'Amup xm',
      completion_day_level: {},
    },
    '3190265': {
      global_score: 222,
      local_score: 2,
      last_star_ts: 4,
      id: 3190265,
      name: null,
      stars: 8,
      completion_day_level: {},
    },
    '3200952': {
      completion_day_level: {},
      stars: 3,
      name: 'Atyal',
      global_score: 16,
      id: 3200952,
      last_star_ts: 9,
      local_score: 3,
    },
    '3205245': {
      completion_day_level: {},
      name: 'ASafaeirad',
      stars: 20,
      global_score: 10,
      id: 3205245,
      last_star_ts: 2,
      local_score: 4,
    },
    '3205245554': {
      completion_day_level: {},
      name: 'Ali',
      stars: 6,
      global_score: 12,
      id: 3205245,
      last_star_ts: 2,
      local_score: 5,
    },
  },
};
// cspell:enable

export interface AdventOfCodeUser {
  id: number;
  name: string;
  username: string;
  stars: number;
  score: number;
  avatar: string;
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

export const AdventOfCodeClient = {
  getLeaderboard(): AdventOfCodeUser[] {
    const members = Object.values(mock.members).map(toAdventOfCodeUser);
    return members.sort((a, b) => a.score - b.score);
  },
};
