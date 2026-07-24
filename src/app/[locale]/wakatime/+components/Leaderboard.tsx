'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { WakatimeUsage } from '@/data-layer/wakatime/Wakatime';

import { Avatar } from '@/components/Avatar';
import * as Table from '@/components/Table';
import { cn } from '@/utils/cn';

import { Diff } from './Diff';
import { SearchIcon } from './Icons';
import { getLanguageColorClass, getTopLanguage } from './languages';
import { Podium } from './Podium';

interface Props {
  winners: WakatimeUsage[];
  usages: WakatimeUsage[];
}

const RANK_COLOR: Record<number, string> = {
  1: 'text-medal-gold',
  2: 'text-medal-silver',
  3: 'text-medal-bronze',
};

function matches(usage: WakatimeUsage, query: string) {
  return (
    usage.user.name.toLowerCase().includes(query) ||
    usage.user.username.toLowerCase().includes(query)
  );
}

export function Leaderboard({ winners, usages }: Props) {
  const t = useTranslations('wakatime');
  const [query, setQuery] = useState('');

  const all = useMemo(() => [...winners, ...usages], [winners, usages]);

  const q = query.trim().toLowerCase();
  const rows = q ? all.filter((usage) => matches(usage, q)) : usages;
  const showPodium = !q;

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('fullRanking')}
        </h2>
        <div className="relative w-full max-w-96">
          <SearchIcon className="pointer-events-none absolute inset-s-7 top-1/2 size-10 -translate-y-1/2 text-fg-1" />
          <input
            className="w-full rounded-lg border border-border bg-bg-raised py-6 ps-22 pe-6 text-sm text-fg-0 outline-none placeholder:text-fg-1 focus:border-accent-0"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            value={query}
          />
        </div>
      </div>

      {showPodium && <Podium winners={winners} />}

      <div className="overflow-hidden rounded-lg border border-border bg-bg-raised shadow-sm">
        <Table.Root>
          <Table.Header>
            <Table.Row className="border-b border-border">
              <Table.Head className="px-14 font-mono text-xs tracking-wide uppercase">
                {t('rank')}
              </Table.Head>
              <Table.Head className="font-mono text-xs tracking-wide uppercase">
                {t('member')}
              </Table.Head>
              <Table.Head className="hidden font-mono text-xs tracking-wide uppercase tablet:table-cell">
                {t('language')}
              </Table.Head>
              <Table.Head className="font-mono text-xs tracking-wide uppercase">
                {t('today')}
              </Table.Head>
              <Table.Head className="hidden pe-14 text-end font-mono text-xs tracking-wide uppercase tablet:table-cell">
                ±
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((usage) => {
              const topLanguage = getTopLanguage(usage.user.languages);

              return (
                <Table.Row key={usage.rank}>
                  <Table.Cell
                    className={cn(
                      'px-14 text-lg font-bold bidi-plain',
                      RANK_COLOR[usage.rank] ?? 'text-fg-1',
                    )}
                  >
                    {usage.user.ordinalRank}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-12">
                      <Avatar
                        alt={`${usage.user.name}'s avatar`}
                        size="sm"
                        src={usage.user.avatar}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {usage.user.name}
                        </p>
                        <p className="truncate font-mono text-xs text-fg-1 bidi-plain">
                          @{usage.user.username}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden tablet:table-cell">
                    {topLanguage && (
                      <span className="inline-flex items-center gap-7 font-mono text-xs text-fg-1">
                        <span
                          className={cn(
                            'size-8 shrink-0 rounded-sm',
                            getLanguageColorClass(topLanguage.name),
                          )}
                        />
                        {topLanguage.name}
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-md font-bold bidi-plain">
                    {usage.humanReadableTotalSeconds}
                  </Table.Cell>
                  <Table.Cell className="hidden pe-14 text-end tablet:table-cell">
                    <Diff className="justify-end" diff={usage.user.diff} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>

        {q && rows.length === 0 && (
          <p className="p-40 text-center text-sm text-fg-1">
            {t('noResults', { query })}
          </p>
        )}
      </div>

      <div className="mt-24 flex justify-center">
        <span className="rounded-full border border-border px-14 py-7 font-mono text-xs text-fg-1">
          {t('footerNote')}
        </span>
      </div>
    </div>
  );
}
