import { cn } from '@/utils/cn';
import { formatStopWatch } from '@/utils/date';

import { useTimeEllipses } from '../useTimeEllipses';

export const Timer = ({ className }: { className?: string }) => {
  const diff = useTimeEllipses();

  return (
    <span className={cn('font-mono text-fg-1', className)}>
      {formatStopWatch(diff)}
    </span>
  );
};
