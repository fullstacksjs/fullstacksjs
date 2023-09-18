import { useAtom } from 'jotai';

import { formatStopWatch } from '@/utils/date';

import { isPerfectAtom, mistakesAtom } from '../atoms';
import { NeedToLogin } from './NeedToLogin';
import { Retry } from './Retry';
import { Timer } from './Timer';

interface Props {
  record?: number;
}

export const Result = ({ record }: Props) => {
  const [mistakes] = useAtom(mistakesAtom);
  const [isPerfect] = useAtom(isPerfectAtom);
  console.log(record);

  return (
    <div className="w-full text-center">
      <div className="flex w-full flex-col items-center gap-2 text-sm font-semibold">
        <Timer className="text-5xl" />
        {record ? (
          <span>Your best time {formatStopWatch(record)}</span>
        ) : (
          <NeedToLogin />
        )}
        {isPerfect ? (
          <span className="text-fg-success">Perfect</span>
        ) : (
          <span className="text-fg-error">Mistakes: {mistakes}</span>
        )}
        <Retry />
      </div>
    </div>
  );
};
