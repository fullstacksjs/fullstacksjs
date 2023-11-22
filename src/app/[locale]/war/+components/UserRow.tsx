import { Avatar } from '@/components/Avatar';
import { Emoji } from '@/components/Emoji';
import * as Table from '@/components/Table';
import { cn } from '@/utils/cn';

import type { AdventOfCodeUser } from './AdventOfCodeClient';
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

const medals = [
  <Emoji key={1} name="first" />,
  <Emoji key={2} name="second" />,
  <Emoji key={3} name="third" />,
];

interface UserRowProps {
  user: AdventOfCodeUser;
  className?: string;
}

export function UserRow({ user, className }: Readonly<UserRowProps>) {
  const rankIcon = medals[user.local_score - 1] ?? user.local_score;

  return (
    <Table.Row className={cn('border-none', className)}>
      <Table.Cell className="min-w-[40px] px-8 text-xsm font-semibold tablet:px-14">
        {rankIcon}
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
