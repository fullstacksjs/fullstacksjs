import clsx from 'clsx';

import type { WakatimeUsage } from '@/data-layer/domain';

import { Avatar } from './Avatar';
import Crown from './Crown.svg';
import { Diff } from './Diff';
import { Report, ReportItem, Sep, UserInfo } from './User';

interface Props {
  usage: WakatimeUsage;
  rank: number;
  className: string;
}

export function Winner({ usage, rank, className }: Props) {
  return (
    <div
      className={clsx(
        'flex grow-0 flex-col items-center gap-4 rounded-xl border-[#60657dcb] py-8',
        {
          'w-[280px] mb-8': rank === 1,
          'w-[230px]': rank !== 1,
        },
        className,
      )}
    >
      <p className="flex h-[54px] w-[54px] items-center justify-center text-3xl font-bold leading-tight text-bg-0">
        {rank === 1 ? <Crown /> : usage.user.ordinalRank}
      </p>
      <Avatar
        src={usage.user.avatar}
        size={rank === 1 ? 'lg' : 'md'}
        alt={`${usage.user.name}'s avatar`}
      />
      <Diff diff={usage.user.diff} />

      <UserInfo className="items-center" user={usage.user} />
      <Report>
        <ReportItem title="Total">{usage.humanReadableTotalSeconds}</ReportItem>
        <Sep />
        <ReportItem title="Daily">{usage.humanReadableDailyAverage}</ReportItem>
      </Report>
    </div>
  );
}
