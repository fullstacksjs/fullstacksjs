import { Medal } from '@/components/Medal';
import * as Table from '@/components/Table';
import { cn } from '@/utils/cn';

import type { AdventOfCodeUser } from '../../+components/AdventOfCodeClient';
import { Stars } from './Stars';
import { UserInfo } from './UserInfo';

interface Props {
  user: AdventOfCodeUser;
  className?: string;
}

export function UserRow({ user, className }: Props) {
  return (
    <Table.Row className={cn('border-none', className)}>
      <Table.Cell className="min-w-[40px] px-8 text-xsm font-semibold tablet:px-14">
        <Medal rank={user.score} fallback={user.score} />
      </Table.Cell>
      <Table.Cell className="w-full">
        <UserInfo {...user} />
      </Table.Cell>
      <Table.Cell className="px-16">
        <Stars stars={user.stars} className="hidden tablet:flex" />
      </Table.Cell>
      <Table.Cell>
        <span className="ml-3 w-[40px]">{user.score}pt</span>
      </Table.Cell>
    </Table.Row>
  );
}
