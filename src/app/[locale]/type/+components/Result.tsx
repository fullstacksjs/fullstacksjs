import { useAtom } from 'jotai';

import { isPerfectAtom, mistakesAtom } from '../atoms';
import { Retry } from './Retry';
import { Timer } from './Timer';

export const Result = () => {
  const [mistakes] = useAtom(mistakesAtom);
  const [isPerfect] = useAtom(isPerfectAtom);

  return (
    <div className="w-full text-center">
      <div className="flex w-full flex-col items-center gap-2 text-5xl font-semibold">
        <Timer isPerfect={isPerfect} />
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
