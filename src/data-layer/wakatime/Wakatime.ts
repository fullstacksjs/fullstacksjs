export interface WakatimeLanguage {
  name: string;
  totalSeconds: number;
}

export interface WakatimeUser {
  id: string;
  name: string;
  avatar: string;
  username: string;
  lastTotalSeconds: number;
  lastDailyAverage: number;
  lastRank: number;
  diff: number;
  ordinalRank: string;
  languages: WakatimeLanguage[];
}

export interface WakatimeUsage {
  rank: number;
  dailyAverage: number;
  totalSeconds: number;
  humanReadableTotalSeconds: string;
  humanReadableDailyAverage: string;
  user: WakatimeUser;
}

export interface WakatimeReport {
  date: string;
  usages: WakatimeUsage[];
}
