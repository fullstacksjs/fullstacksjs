import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { audios } from '@/components/Audio';

import type { ColorQuestion } from './+logic/questionGenerator';

import { COLOR } from './+logic/constants';
import { generateColorQuestions } from './+logic/questionGenerator';

type GameStatus = 'lost' | 'playing' | 'won';

export const questionsAtom = atom<ColorQuestion[]>([]);
const currentQuestionIndexAtom = atom(0);
const statusAtom = atom<GameStatus>('playing');

export const scoreAtom = atom(0);
export const highestScoreAtom = atomWithStorage('highestScore', 0);
export const wrongIndexAtom = atom<number | undefined>(undefined);

export const gameOverAtom = atom((get) => get(statusAtom) !== 'playing');
export const hasWonAtom = atom((get) => get(statusAtom) === 'won');

export const currentQuestionAtom = atom((get) =>
  get(questionsAtom).at(get(currentQuestionIndexAtom)),
);

export const revealedCorrectIndexAtom = atom((get) =>
  get(statusAtom) === 'lost'
    ? get(currentQuestionAtom)?.correctIndex
    : undefined,
);

const finishGameAtom = atom(null, (get, set, status: 'lost' | 'won') => {
  set(statusAtom, status);
  set(highestScoreAtom, Math.max(get(highestScoreAtom), get(scoreAtom)));
});

export const tryAgainAtom = atom(null, (_, set) => {
  audios.restart.play();
  set(questionsAtom, generateColorQuestions(COLOR.TOTAL_QUESTIONS));
  set(currentQuestionIndexAtom, 0);
  set(scoreAtom, 0);
  set(statusAtom, 'playing');
  set(wrongIndexAtom, undefined);
});

export const selectAnswerAtom = atom(null, (get, set, index: number) => {
  const question = get(currentQuestionAtom);
  if (get(gameOverAtom) || !question) return;

  if (index !== question.correctIndex) {
    audios.wrong.play();
    set(wrongIndexAtom, index);
    set(finishGameAtom, 'lost');
    return;
  }

  set(scoreAtom, (score) => score + 1);

  const isLastQuestion =
    get(currentQuestionIndexAtom) >= get(questionsAtom).length - 1;

  if (isLastQuestion) {
    audios.win.play();
    set(finishGameAtom, 'won');
  } else {
    audios.click.play();
    set(currentQuestionIndexAtom, (i) => i + 1);
  }
});
