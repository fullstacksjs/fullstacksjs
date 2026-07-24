'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { WakatimeUsage } from '@/data-layer/wakatime/Wakatime';

import { Podium } from './Podium';
import { RankingTable } from './RankingTable';
import { SearchInput } from './SearchInput';

interface Props {
  winners: WakatimeUsage[];
  usages: WakatimeUsage[];
  day: number;
  year: number;
}

export function Leaderboard({ winners, usages, day, year }: Props) {
  const t = useTranslations('wakatime');
  const [query, setQuery] = useState('');

  const allUsages = useMemo(
    () => combineUsages(winners, usages),
    [winners, usages],
  );
  const normalizedQuery = query.trim();
  const visibleUsages = normalizedQuery
    ? filterUsages(allUsages, normalizedQuery)
    : usages;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-2xl font-semibold uppercase">
          {t('day', { day, year })}
        </h2>
        <SearchInput
          label={t('searchPlaceholder')}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </div>

      {!normalizedQuery && <Podium winners={winners} />}

      <div className="overflow-hidden rounded-lg border border-border bg-bg-raised shadow-sm">
        <div className="max-h-[calc(440px+34.4rem)] scrollbar-gutter-stable overflow-y-auto overscroll-contain">
          <RankingTable usages={visibleUsages} />
        </div>

        {normalizedQuery && visibleUsages.length === 0 && (
          <p className="p-40 text-center text-sm text-fg-1">
            {t('noResults', { query })}
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <span className="rounded-full border border-border px-14 py-7 font-mono text-sm text-fg-1">
          {t('footerNote')}
        </span>
      </div>
    </div>
  );
}

function combineUsages(
  winners: readonly WakatimeUsage[],
  usages: readonly WakatimeUsage[],
): WakatimeUsage[] {
  return [...winners, ...usages];
}

function filterUsages(
  usages: readonly WakatimeUsage[],
  query: string,
): WakatimeUsage[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return [...usages];

  return usages.filter(({ user }) =>
    [user.name, user.username]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
}
