import { range } from '@fullstacksjs/toolbox';

import { cn } from '@/utils/cn';

import Star from './Star.svg';

interface Props {
  stars: number;
  className: string;
}

export function Stars({ stars, className }: Props) {
  return (
    <span
      className={cn('items-center text-xs font-semibold text-fg-1', className)}
    >
      {range(25).map((i) => (
        <Star
          key={i}
          className={cn({
            'text-accent-0': stars >= i,
            'text-bg-muted': stars < i,
          })}
        />
      ))}
    </span>
  );
}
