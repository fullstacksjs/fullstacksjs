import { useAtom } from 'jotai';

import { formatStopWatch } from '@/utils/date';

import { isPerfectAtom, mistakesAtom } from '../atoms';
import { Retry } from './Retry';
import { Timer } from './Timer';

interface Props {
  record: number | null;
  loading?: boolean;
}

export const Result = ({ record, loading }: Props) => {
  const [mistakes] = useAtom(mistakesAtom);
  const [isPerfect] = useAtom(isPerfectAtom);

  return (
    <div className="w-full text-center">
      <div className="flex w-full flex-col items-center gap-2 text-5xl font-semibold">
        <Timer />
        {record ? (
          <span className="text-sm">
            {loading ? 'Loading' : `Your best time ${formatStopWatch(record)}`}
          </span>
        ) : null}
        {isPerfect ? (
          <span className="text-sm text-fg-success">Perfect</span>
        ) : (
          <span className="text-sm text-fg-error">Mistakes: {mistakes}</span>
        )}
        <Retry />
      </div>
    </div>
  );
};
