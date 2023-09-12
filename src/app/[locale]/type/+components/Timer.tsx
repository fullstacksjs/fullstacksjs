import { formatStopWatch } from '@/utils/date';

import { useTimeEllipses } from '../atoms';

export const Timer = ({ className }: { className?: string }) => {
  const diff = useTimeEllipses();

  return <span className={className}>{formatStopWatch(diff)}</span>;
};
