import { useUpdate } from 'ahooks';
import { differenceInMilliseconds } from 'date-fns';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

import { audios } from '@/components/Audio';
import { submitRecord } from '@/data-layer/supabase/submitRecord';

import type { Alphabet } from './alphabet';

import { alphabets } from './alphabet';

export type LetterStatus = 'correct' | 'corrected' | 'error' | 'idle';
export type GameStatus = 'finished' | 'idle' | 'typing';

export interface LetterItem {
  letter: Alphabet;
  status: LetterStatus;
}

const initialLetters = alphabets.map<LetterItem>((char) => ({
  letter: char,
  status: 'idle',
}));

export const lettersAtom = atom(initialLetters);
export const mistakesAtom = atom(0);
export const stepAtom = atom(0);
export const isFinalStepAtom = atom(
  (get) => get(stepAtom) === alphabets.length - 1,
);
export const gameStateAtom = atom<GameStatus>('idle');
export const isFinishedAtom = atom((get) => get(gameStateAtom) === 'finished');
export const activeLetterAtom = atom((get) => alphabets[get(stepAtom)]);

const startTimeAtom = atom(Date.now());
const endTimeAtom = atom(Date.now());

export const useTimeEllipses = () => {
  const [gameState] = useAtom(gameStateAtom);
  const [startTime] = useAtom(startTimeAtom);
  const [endTime] = useAtom(endTimeAtom);
  const forceUpdate = useUpdate();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (gameState === 'typing')
      interval = setInterval(() => {
        forceUpdate();
      }, 100);
    else if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    return () => {
      clearInterval(interval);
      interval = undefined;
    };
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

export const isPerfectAtom = atom((get) => get(mistakesAtom) === 0);
export const newRecordAtom = atom<number | undefined>(undefined);

export const handleSubmitLetter = atom(
  null,
  async (get, set, update: Alphabet) => {
    const isCorrect = get(activeLetterAtom) === update;
    const shouldFinish = get(isFinalStepAtom);
    const nextStep = Math.min(alphabets.length - 1, get(stepAtom) + 1);
    const activeLetter = get(activeLetterAtom);

    if (get(gameStateAtom) === 'idle') {
      set(startTimeAtom, Date.now());
      set(gameStateAtom, 'typing');
    }

    if (shouldFinish) {
      const endTime = Date.now();
      set(gameStateAtom, 'finished');
      set(endTimeAtom, endTime);
      const duration = endTime - get(startTimeAtom);
      const newRecord = await submitRecord({
        duration,
        mistakes: get(mistakesAtom),
      })
        .then((d) => d?.duration)
        .catch((e) => {
          console.error(e);
          return undefined;
        });
      set(newRecordAtom, newRecord);
    }

    const currentLetter = get(lettersAtom).find(
      (l) => l.letter === activeLetter,
    );

    if (!isCorrect && currentLetter?.status !== 'error')
      set(mistakesAtom, (p) => p + 1);
    else if (isCorrect && currentLetter?.status === 'error')
      set(mistakesAtom, (p) => p - 1);

    set(lettersAtom, (prev) =>
      prev.map((l) =>
        l.letter === get(activeLetterAtom)
          ? {
              letter: l.letter,
              status: !isCorrect
                ? 'error'
                : l.status === 'error'
                  ? 'corrected'
                  : 'correct',
            }
          : l,
      ),
    );

    set(stepAtom, nextStep);
  },
);

export const handleCorrectAtom = atom(null, (get, set) => {
  if (get(gameStateAtom) === 'typing' && get(stepAtom) > 0)
    set(stepAtom, (p) => p - 1);
});

export const handleReset = atom(null, (_, set) => {
  audios.restart.play();
  set(stepAtom, 0);
  set(mistakesAtom, 0);
  set(gameStateAtom, 'idle');
  set(lettersAtom, initialLetters);
});
