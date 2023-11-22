export interface AdventOfCodeUser {
  completion_day_level: unknown;
  global_score: 0;
  id: 3190265;
  last_star_ts: 0;
  local_score: 0;
  name: string;
  stars: 0;
  username: string;
  avatar: string;
}

export const AdventOfCodeClient = {
  getLeaderboard() {
    return {
      owner_id: 3205245,
      event: '2023',
      members: {
        '3205318': {
          global_score: 1,
          local_score: 1,
          last_star_ts: 6,
          id: 3205318,
          stars: 6,
          name: 'Amup xm', // cspell:disable-line
          completion_day_level: {},
          username: 'mahdi-sheibak', // cspell:disable-line
          avatar: 'https://avatars.githubusercontent.com/u/76112461?v=4',
        },
        '3190265': {
          global_score: 222,
          local_score: 2,
          last_star_ts: 4,
          id: 3190265,
          name: null,
          stars: 8,
          completion_day_level: {},
          username: 'mahdi-sheibak', // cspell:disable-line
          avatar: 'https://avatars.githubusercontent.com/u/76112461?v=4',
        },
        '3200952': {
          completion_day_level: {},
          stars: 3,
          name: 'Atyal', // cspell:disable-line
          global_score: 16,
          id: 3200952,
          last_star_ts: 9,
          local_score: 3,
          username: 'mahdi-sheibak', // cspell:disable-line
          avatar: 'https://avatars.githubusercontent.com/u/76112461?v=4',
        },
        '3205245': {
          completion_day_level: {},
          name: 'ASafaeirad',
          stars: 20,
          global_score: 10,
          id: 3205245,
          last_star_ts: 2,
          local_score: 4,
          username: 'mahdi-sheibak', // cspell:disable-line
          avatar: 'https://avatars.githubusercontent.com/u/76112461?v=4',
        },
        '3205245554': {
          completion_day_level: {},
          name: 'Ali',
          stars: 6,
          global_score: 12,
          id: 3205245,
          last_star_ts: 2,
          local_score: 5,
          username: 'mahdi-sheibak', // cspell:disable-line
          avatar: 'https://avatars.githubusercontent.com/u/76112461?v=4',
        },
      },
    };
  },
};
