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
    <div className="flex text-xs">
      <Avatar size="sm" src={avatar} alt={`${name}'s avatar`} />
      <div className="ml-4 flex flex-col justify-center">
        <p className="font-bold leading-none text-fg-0">{name}</p>
        <Stars stars={stars} className="flex tablet:hidden" />
      </div>
    </div>
  );
}
