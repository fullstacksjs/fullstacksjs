import { Avatar } from '@/components/Avatar';
import { Medal } from '@/components/Medal';
import * as Table from '@/components/Table';
import { cn } from '@/utils/cn';

import type { AdventOfCodeUser } from '../../+components/AdventOfCodeClient';
import { Stars } from './Stars';

interface UserInfoProps {
  name: string;
  stars: number;
  avatar: string;
}

export function UserInfo({ name, stars, avatar }: Readonly<UserInfoProps>) {
  return (
    <div className="flex text-xs">
      <Avatar size="sm" src={avatar} alt={`${name}'s avatar`} />
      <div className="ml-4 flex flex-col justify-center">
        <p className="font-bold leading-none text-fg-0">
          {name || 'Anonymous'}
        </p>
        <Stars stars={stars} className="flex tablet:hidden" />
      </div>
    </div>
  );
}

interface UserRowProps {
  user: AdventOfCodeUser;
  className?: string;
}

export function UserRow({ user, className }: Readonly<UserRowProps>) {
  return (
    <Table.Row className={cn('border-none', className)}>
      <Table.Cell className="min-w-[40px] px-8 text-xsm font-semibold tablet:px-14">
        <Medal rank={user.local_score} fallback={user.local_score} />
      </Table.Cell>
      <Table.Cell className="w-full">
        <UserInfo stars={user.stars} name={user.name} avatar={user.avatar} />
      </Table.Cell>
      <Table.Cell className="px-16">
        <Stars stars={user.stars} className="hidden tablet:flex" />
      </Table.Cell>
    </Table.Row>
  );
}
