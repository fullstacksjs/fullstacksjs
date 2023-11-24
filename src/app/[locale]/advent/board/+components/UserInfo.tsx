import { Avatar } from '@/components/Avatar';

import { Stars } from './Stars';

interface Props {
  name: string;
  stars: number;
  avatar: string;
  score: number;
}

export function UserInfo({ name, stars, avatar }: Readonly<Props>) {
  return (
    <div className="flex items-start gap-4 text-xs tablet:items-center">
      <Avatar size="sm" src={avatar} alt={`${name}'s avatar`} />
      <div className="flex flex-col justify-center">
        <span className="font-bold text-fg-0">{name}</span>
        <Stars stars={stars} className="flex tablet:hidden" />
      </div>
    </div>
  );
}
