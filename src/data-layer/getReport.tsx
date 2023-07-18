import { getDayOfYear, secondsToHours, secondsToMinutes } from 'date-fns';

import type { WakatimeReport, WakatimeUsage } from './domain';

export const addLeadingZero = (num: number) => num.toString().padStart(2, '0');

const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
]);

export function formatOrdinals(n: number) {
  const rule = pr.select(n);
  const suffix = suffixes.get(rule) ?? 'th';
  return `${n}${suffix}`;
}

export function toHumanHM(seconds: number) {
  const hours = secondsToHours(seconds);
  const minutes = secondsToMinutes(seconds % 3600);
  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
}

export const getReport = async (count: number) => {
  const res = await fetch(
    `https://wakatime.fullstacksjs.com/api/day?size=${count}`,
    { next: { revalidate: 2 * 60 * 12, tags: ['wakatime'] } },
  );
  const report: WakatimeReport = await res.json();
  const date = new Date(report.date);

  const year = date.getFullYear();
  const day = getDayOfYear(date);
  const usages: WakatimeUsage[] = report.usages.map((u) => {
    return {
      ...u,
      humanReadableTotalSeconds: toHumanHM(u.totalSeconds),
      humanReadableDailyAverage: toHumanHM(u.dailyAverage),
      user: {
        ...u.user,
        ordinalRank: formatOrdinals(u.rank),
      },
    };
  });

  return {
    title: `${year} - Day ${day}`,
    winners: usages.slice(0, 3),
    usages: usages.slice(3),
  };
};
