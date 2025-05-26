import { range } from '@fullstacksjs/toolbox';

import { cn } from '@/utils/cn';

import { ListItem } from '../ListItem';
import { Skeleton } from '../Skeleton';

interface Props {
  lines: number;
  className?: string;
}

export const FocusItemListSkeleton = ({ lines, className }: Props) => {
  const items = range(lines);

  return (
    <ol>
      {items.map((item) => (
        <ListItem key={item}>
          <Skeleton className={cn('relative h-10', className)} />
        </ListItem>
      ))}
    </ol>
  );
};
