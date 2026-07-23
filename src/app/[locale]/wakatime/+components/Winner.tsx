import type { WakatimeUsage } from '@/data-layer/wakatime/Wakatime';

import { Avatar } from '@/components/Avatar';
import { cn } from '@/utils/cn';

import Crown from './Crown.svg';
import { Diff } from './Diff';
import { Report, ReportItem, Sep, UserInfo } from './UserRow';

interface Props {
  usage: WakatimeUsage;
  rank: number;
  className: string;
}

export function Winner({ usage, rank, className }: Props) {
  return (
    <div
      className={cn(
        'flex grow-0 flex-col items-center rounded-xl border-[#60657dcb]',
        {
          'mb-8 w-[250px] gap-8 py-8': rank === 1,
          'w-[220px] gap-4 pt-4 pb-8': rank !== 1,
        },
        className,
      )}
    >
      <p
        className={cn({
          'text-yellow-400': rank === 1,
          'rank-silver leading-tight font-bold': rank !== 1,
        })}
      >
        {rank === 1 ? <Crown /> : usage.user.lastRank}
      </p>

      <div className="flex flex-col items-center gap-4">
        <Avatar
          size={rank === 1 ? 'lg' : 'md'}
          alt={`${usage.user.name}'s avatar`}
          src={usage.user.avatar}
        />
        <Diff diff={usage.user.diff} />

        <UserInfo
          className={cn('items-center', { 'text-xsm': rank === 1 })}
          user={usage.user}
        />
      </div>
      <Report>
        <ReportItem title="Total">{usage.humanReadableTotalSeconds}</ReportItem>
        <Sep />
        <ReportItem title="Daily">{usage.humanReadableDailyAverage}</ReportItem>
      </Report>
    </div>
  );
}
