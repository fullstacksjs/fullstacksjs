import type { ResponsiveImageType } from 'react-datocms/image';

export interface Lecturer {
  name: string;
  avatar: ResponsiveImageType;
}

export interface FullstacksJSEvent {
  slug: string;
  title: any;
  date: Date;
  thumbnail: ResponsiveImageType;
  subscribersCount?: number;
  lecturers: Lecturer[];
  isUpcoming: boolean;
  mediaUrl?: string;
}

export interface Events {
  upcoming: FullstacksJSEvent[];
  archived: FullstacksJSEvent[];
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
