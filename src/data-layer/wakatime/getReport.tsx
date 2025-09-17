import { joinPaths } from '@fullstacksjs/toolbox';
import { getDayOfYear, secondsToHours, secondsToMinutes } from 'date-fns';
import { unstable_cacheLife as cacheLife } from 'next/cache';

import { serverConfig } from '@/config/serverConfig';
import { addLeadingZero, formatOrdinals } from '@/utils/number';

import type { WakatimeReport, WakatimeUsage } from './Wakatime';

function toHumanHM(seconds: number) {
  const hours = secondsToHours(seconds);
  const minutes = secondsToMinutes(seconds % 3600);
  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
}

export const getReportWithCache = async (count: number) => {
  'use cache';
  cacheLife('hours');

  const url = joinPaths(
    serverConfig.get('wakatime.endpoint'),
    `day?size=${count}`,
  );
  const res = await fetch(joinPaths(url), { cache: 'no-cache' });

  if (!res.ok)
    throw new Error(
      `Failed to fetch Wakatime report "${res.status}: ${res.statusText}"`,
    );

  const report = (await res.json()) as WakatimeReport;
  const date = new Date(report.date);

  const year = date.getFullYear();
  const day = getDayOfYear(date);
  const usages = report.usages.map<WakatimeUsage>((u) => {
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

export const getReportWithoutCache = async (count: number) => {
  const url = joinPaths(
    serverConfig.get('wakatime.endpoint'),
    `day?size=${count}`,
  );
  const res = await fetch(joinPaths(url), { cache: 'no-cache' });

  if (!res.ok)
    throw new Error(
      `Failed to fetch Wakatime report "${res.status}: ${res.statusText}"`,
    );

  const report = (await res.json()) as WakatimeReport;
  const date = new Date(report.date);

  const year = date.getFullYear();
  const day = getDayOfYear(date);
  const usages = report.usages.map<WakatimeUsage>((u) => {
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
