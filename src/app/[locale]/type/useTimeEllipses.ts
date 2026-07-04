import { differenceInMilliseconds } from 'date-fns';
import { useAtomValue } from 'jotai';
import { useEffect, useReducer } from 'react';

import { endTimeAtom, gameStateAtom, startTimeAtom } from './atoms';

export const useTimeEllipses = () => {
  const gameState = useAtomValue(gameStateAtom);
  const startTime = useAtomValue(startTimeAtom);
  const endTime = useAtomValue(endTimeAtom);
  const [, forceUpdate] = useReducer((x) => !x, false);

  useEffect(() => {
    if (gameState !== 'typing') return;
    const interval = setInterval(forceUpdate, 100);
    return () => clearInterval(interval);
  }, [forceUpdate, gameState]);

  switch (gameState) {
    case 'idle':
      return null;

    case 'typing':
      // eslint-disable-next-line react-hooks/purity
      return differenceInMilliseconds(Date.now(), startTime);

    case 'finished':
      return differenceInMilliseconds(endTime, startTime);
  }
};
