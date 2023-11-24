import { range } from '@fullstacksjs/toolbox';

import { cn } from '@/utils/cn';

import Star from './Star.svg';

interface Props {
  stars: number;
  className: string;
}

export function Stars({ stars, className }: Props) {
  return (
    <span className={cn('flex flex-wrap tablet:flex-nowrap', className)}>
      {range(25).map((i) => (
        <Star
          key={i}
          className={cn({
            'text-accent-0': stars >= i,
            'text-advent-2': stars < i,
          })}
        />
      ))}
    </span>
  );
}
