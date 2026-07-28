import { useTranslations } from 'next-intl';

import type { WakatimeUsage } from '@/data-layer/wakatime/Wakatime';

import { cn } from '@/utils/cn';

import { LanguageBadge, Member } from './Member';

interface Props {
  winners: WakatimeUsage[];
}

const WinnerCard = ({
  winner,
  className,
  first,
}: {
  winner: WakatimeUsage;
  className?: string;
  first?: boolean;
}) => {
  const t = useTranslations('wakatime');
  const topLanguage = winner.user.languages.slice(0, 3);

  return (
    <div
      key={winner.user.id}
      className={cn(
        'relative overflow-hidden rounded-xl bg-bg-raised px-14 py-12 transition-transform hover:-translate-y-4',
        { 'max-desktop:order-first': first },
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -top-10 -right-9 w-[1ch] text-6xl/none font-bold opacity-10 select-none bidi-plain',
        )}
      >
        {winner.rank}
      </span>
      <div
        className={cn('relative flex flex-col justify-between gap-6', {
          'desktop:gap-10': first,
        })}
      >
        <Member size="md" nameClassName="font-semibold" user={winner.user} />
        <div className="flex flex-col gap-2">
          <p className="text-4xl/none font-bold">
            {winner.humanReadableTotalSeconds}
          </p>
          <p className="font-mono text-xs tracking-wide text-fg-1 uppercase fa:font-fa">
            {t('hoursToday')}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {topLanguage.map((language) => (
            <LanguageBadge key={language.name} language={language} />
          ))}
        </div>
      </div>
    </div>
  );
};

export function Podium({ winners }: Props) {
  return (
    <div className="grid w-full grid-cols-1 items-end gap-8 desktop:grid-cols-3">
      <WinnerCard winner={winners[1]} />
      <WinnerCard winner={winners[0]} first />
      <WinnerCard winner={winners[2]} />
    </div>
  );
}
