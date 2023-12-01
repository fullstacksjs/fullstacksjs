export enum Star {
  None,
  Silver,
  Gold,
}

export interface AdventOfCodeUser {
  id: string;
  name: string;
  stars: Star[];
  score: number;
  avatar: string | undefined;
}
