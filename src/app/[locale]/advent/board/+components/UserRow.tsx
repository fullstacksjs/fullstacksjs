import { Medal } from '@/components/Medal';
import * as Table from '@/components/Table';
import type { AdventOfCodeUser } from '@/data-layer/advent';
import { cn } from '@/utils/cn';
import { formatOrdinals } from '@/utils/number';

import { Stars } from './Stars';
import { UserInfo } from './UserInfo';

interface Props {
  user: AdventOfCodeUser;
  className?: string;
  rank: number;
}

export function UserRow({ user, className, rank }: Props) {
  return (
    <Table.Row className={cn('border-none', className)}>
      <Table.Cell className="text-center text-xsm font-semibold">
        <Medal rank={rank} fallback={formatOrdinals(rank)} />
      </Table.Cell>
      <Table.Cell className="w-full whitespace-nowrap">
        <UserInfo {...user} />
      </Table.Cell>
      <Table.Cell className="hidden tablet:table-cell tablet:w-full">
        <Stars stars={user.stars} className="hidden tablet:flex" />
      </Table.Cell>
      <Table.Cell className="text-center text-sm text-fg-1">
        {user.score}pt
      </Table.Cell>
    </Table.Row>
  );
}
