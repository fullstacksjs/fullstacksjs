import { atom } from 'jotai';

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

export const startTimeAtom = atom(Date.now());
export const endTimeAtom = atom(Date.now());

export const isPerfectAtom = atom((get) => get(mistakesAtom) === 0);
export const newRecordAtom = atom<number | undefined>(undefined);

export const handleSubmitLetter = atom(
  null,
  async (get, set, update: Alphabet) => {
    const activeLetter = get(activeLetterAtom);
    const isCorrect = activeLetter === update;
    const shouldFinish = get(isFinalStepAtom);

    if (get(gameStateAtom) === 'idle') {
      set(startTimeAtom, Date.now());
      set(gameStateAtom, 'typing');
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
        l.letter === activeLetter
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

    set(stepAtom, (p) => Math.min(alphabets.length - 1, p + 1));

    if (shouldFinish) {
      const endTime = Date.now();
      set(gameStateAtom, 'finished');
      set(endTimeAtom, endTime);
      const newRecord = await submitRecord({
        duration: endTime - get(startTimeAtom),
        mistakes: get(mistakesAtom),
      })
        .then((d) => d?.duration)
        .catch((e) => {
          console.error(e);
          return undefined;
        });
      set(newRecordAtom, newRecord);
    }
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
