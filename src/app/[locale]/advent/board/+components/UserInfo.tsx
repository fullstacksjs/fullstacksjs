import type { Star } from '@/data-layer/advent/AdventOfCodeUser';

import { Avatar } from '@/components/Avatar';

import { Stars } from './Stars';

interface Props {
  name: string | undefined;
  stars: Star[];
  avatar: string | undefined;
}

export function UserInfo({ name = 'Anonymous', stars, avatar }: Props) {
  return (
    <div className="flex items-start gap-4 text-xs tablet:items-center">
      {avatar ? (
        <Avatar size="sm" alt={`${name}'s avatar`} src={avatar} />
      ) : null}
      <div className="flex flex-col justify-center">
        <span className="font-bold text-fg-0">{name}</span>
        <Stars className="flex tablet:hidden" stars={stars} />
      </div>
    </div>
  );
}
