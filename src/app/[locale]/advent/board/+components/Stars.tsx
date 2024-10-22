import { Star } from '@/data-layer/advent/AdventOfCodeUser';
import { cn } from '@/utils/cn';
import { isNull, range } from '@fullstacksjs/toolbox';

import StarIcon from './Star.svg';

interface Props {
  stars: Star[];
  className: string;
}

export function Stars({ stars, className }: Props) {
  return (
    <span className={cn('flex flex-wrap gap-1 tablet:flex-nowrap', className)}>
      {range(25).map((i) => (
        <StarIcon
          key={i}
          className={cn({
            'text-advent-2': isNull(stars[i]),
            'text-fg-0': stars[i] === Star.Silver,
            'text-accent-0': stars[i] === Star.Gold,
          })}
        />
      ))}
    </span>
  );
}
