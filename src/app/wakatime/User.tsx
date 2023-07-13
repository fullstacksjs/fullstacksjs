import { twMerge } from 'tailwind-merge';

import type { WakatimeUsage, WakatimeUser } from '@/data-layer/domain';

import { Avatar } from './Avatar';
import { Diff } from './Diff';

interface ReportItemProps {
  children: React.ReactNode;
  title: string;
}

export function ReportItem({ children, title }: ReportItemProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[1.4rem] font-semibold leading-none text-fg-1">
        {title}
      </p>
      <p className="text-[1.4rem] font-semibold leading-tight text-fg-0">
        {children}
      </p>
    </div>
  );
}

export function Report({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-8">{children}</div>;
}

export function UserInfo({
  className,
  user,
}: {
  className?: string;
  user: WakatimeUser;
}) {
  return (
    <div className={twMerge('flex flex-col', className)}>
      <p className="text-sm font-bold leading-none text-fg-0">{user.name}</p>
      <p className="text-[1.4rem] font-semibold text-fg-1">@{user.username}</p>
    </div>
  );
}

export function Sep({ className }: { className?: string }) {
  return <div className={twMerge('h-[34px] w-[1px] bg-bg-muted', className)} />;
}

export function User({ usage }: { usage: WakatimeUsage }) {
  return (
    <div className="user-bg flex items-center rounded-[50px] border-[#60657d33] px-12 py-4">
      <p className="w-[3ch] text-xsm font-semibold leading-tight text-fg-0">
        {usage.user.ordinalRank}
      </p>
      <Sep className="mx-8" />
      <div className="flex items-center gap-4">
        <Avatar
          size="sm"
          src={usage.user.avatar}
          alt={`${usage.user.name}'s avatar`}
        />
        <UserInfo className="w-[200px]" user={usage.user} />
      </div>
      <Sep className="mx-8" />
      <Report>
        <ReportItem title="Total">{usage.humanReadableTotalSeconds}</ReportItem>
        <ReportItem title="Daily">{usage.humanReadableDailyAverage}</ReportItem>
      </Report>
      <Sep className="mx-8" />
      <Diff diff={usage.user.diff} />
    </div>
  );
}
