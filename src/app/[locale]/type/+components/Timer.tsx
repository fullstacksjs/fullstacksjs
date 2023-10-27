import { cn } from '@/utils/cn';
import { formatStopWatch } from '@/utils/date';

import { useTimeEllipses } from '../atoms';

export const Timer = ({ className }: { className?: string }) => {
  const diff = useTimeEllipses();

  return (
    <span className={cn('font-rajdhani', className)}>
      {formatStopWatch(diff)}
    </span>
  );
};
