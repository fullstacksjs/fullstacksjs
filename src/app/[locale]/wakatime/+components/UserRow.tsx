import { twMerge } from 'tailwind-merge';

import { Emoji } from '@/components/Emoji';
import * as Table from '@/components/Table';
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
    <div className={twMerge('flex flex-col text-xs', className)}>
      <p className="font-bold leading-none text-fg-0">{user.name}</p>
      <p className="text-xs font-semibold text-fg-1">@{user.username}</p>
    </div>
  );
}

export function Sep({ className }: { className?: string }) {
  return <div className={twMerge('h-[34px] w-[1px] bg-bg-muted', className)} />;
}

const medals = [
  <Emoji key={1} category="Activities" name="1st Place Medal" />,
  <Emoji key={2} category="Activities" name="2nd Place Medal" />,
  <Emoji key={3} category="Activities" name="3rd Place Medal" />,
];

interface Props {
  usage: WakatimeUsage;
  className?: string;
}

export function UserRow({ usage, className }: Props) {
  const rankIcon =
    usage.user.lastRank < 4
      ? medals[usage.user.lastRank - 1]
      : usage.user.ordinalRank;

  return (
    <Table.Row className={className}>
      <Table.Cell className="min-w-[40px] px-8 text-xsm font-semibold tablet:px-14">
        {rankIcon}
      </Table.Cell>
      <Table.Cell className="w-full">
        <div className="flex items-center gap-5">
          <Avatar
            size="sm"
            src={usage.user.avatar}
            alt={`${usage.user.name}'s avatar`}
          />
          <UserInfo className="w-[200px]" user={usage.user} />
        </div>
      </Table.Cell>
      <Table.Cell className="min-w-[64px] text-xs font-semibold">
        {usage.humanReadableTotalSeconds}
      </Table.Cell>
      <Table.Cell className="min-w-[64px] text-xs font-semibold">
        {usage.humanReadableDailyAverage}
      </Table.Cell>
      <Table.Cell className="hidden pe-8 tablet:table-cell tablet:pe-14">
        <Diff className="justify-center" diff={usage.user.diff} />
      </Table.Cell>
    </Table.Row>
  );
}
