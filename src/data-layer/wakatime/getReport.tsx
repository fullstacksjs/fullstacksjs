import { joinPaths } from '@fullstacksjs/toolbox';
import { getDayOfYear, secondsToHours, secondsToMinutes } from 'date-fns';

import { serverConfig } from '@/config/serverConfig';
import { addLeadingZero, formatOrdinals } from '@/utils/number';

import type { WakatimeReport, WakatimeUsage } from './Wakatime';

export function toHumanHM(seconds: number) {
  const hours = secondsToHours(seconds);
  const minutes = secondsToMinutes(seconds % 3600);
  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
}

export const getReport = async (count: number) => {
  const res = await fetch(
    joinPaths(serverConfig.wakatime.endpoint, `day?size=${count}`),
    { cache: 'no-cache' },
  );
  const report = (await res.json()) as WakatimeReport;
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
    year,
    day,
    winners: usages.slice(0, 3),
    usages: usages.slice(3),
  };
};
