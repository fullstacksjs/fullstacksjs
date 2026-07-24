import { useTranslations } from 'next-intl';

import type { WakatimeUsage } from '@/data-layer/wakatime/Wakatime';

import { Avatar } from '@/components/Avatar';
import { cn } from '@/utils/cn';

import { getLanguageColorClass, getTopLanguage } from './languages';

interface Props {
  winners: WakatimeUsage[];
}

const MEDAL_TEXT = [
  'text-medal-gold',
  'text-medal-silver',
  'text-medal-bronze',
];
const RANK_BG = ['rank-1', 'rank-2', 'rank-3'];

export function Podium({ winners }: Props) {
  const t = useTranslations('wakatime');

  return (
    <div className="mb-24 grid w-full grid-cols-1 gap-16 desktop:grid-cols-3">
      {winners.map((winner, i) => {
        const topLanguage = getTopLanguage(winner.user.languages);

        return (
          <div
            key={winner.rank}
            className={cn(
              'overflow-hidden rounded-xl bg-bg-raised px-14 py-12 transition-transform hover:-translate-y-4',
              // RANK_BG[i],
            )}
          >
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute -top-20 -right-8 text-6xl/none font-bold opacity-10 select-none bidi-plain',
                MEDAL_TEXT[i],
              )}
            >
              {winner.rank}
            </span>
            <div className="relative flex flex-col gap-20">
              <div className="flex items-center gap-12">
                <Avatar
                  size="sm"
                  alt={`${winner.user.name}'s avatar`}
                  src={winner.user.avatar}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {winner.user.name}
                  </p>
                  <p className="truncate font-mono text-xs text-fg-1 bidi-plain">
                    @{winner.user.username}
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-between gap-12">
                <div>
                  <p className="text-5xl/none font-bold bidi-plain">
                    {winner.humanReadableTotalSeconds}
                  </p>
                  <p className="mt-8 font-mono text-xs tracking-wide text-fg-1 uppercase">
                    {t('hoursToday')}
                  </p>
                </div>
                {topLanguage && (
                  <span className="inline-flex items-center gap-6 rounded-full border border-border bg-bg-0/60 px-10 py-5 font-mono text-xs text-fg-1">
                    <span
                      className={cn(
                        'size-6 rounded-sm',
                        getLanguageColorClass(topLanguage.name),
                      )}
                    />
                    {topLanguage.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
