import { range } from '@fullstacksjs/toolbox';

import { cn } from '@/utils/cn';

import Star from './Star.svg';

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
        <span
          key={i}
          className={cn({
            'text-accent-0': stars >= i,
            'text-bg-muted': stars < i,
          })}
        >
          <Star />
        </span>
      ))}
      <span className="ml-3 w-[40px]">120 pt</span>
    </p>
  );
}
