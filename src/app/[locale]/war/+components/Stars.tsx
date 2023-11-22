import { range } from '@fullstacksjs/toolbox';

import { cn } from '@/utils/cn';

import StarActive from './Star-Active.svg';
import StarInactive from './Star-Inactive.svg';

interface StarsProps {
  stars: number;
  className: string;
}

export function Stars({ stars, className }: Readonly<StarsProps>) {
  return (
    <p
      className={cn('items-center text-xs font-semibold text-fg-1', className)}
    >
      {range(25).map((i) => (
        <span key={i}>{stars >= i ? <StarActive /> : <StarInactive />}</span>
      ))}
      <span className="ml-3 w-[40px]">120 pt</span>
    </p>
  );
}
