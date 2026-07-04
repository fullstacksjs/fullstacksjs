import { atom } from 'jotai';

import { audios } from '@/components/Audio';

import type { ColorQuestion } from './+logic/questionGenerator';

import { COLOR } from './+logic/constants';
import { generateColorQuestions } from './+logic/questionGenerator';

export const questionsAtom = atom<ColorQuestion[]>([]);
export const currentQuestionIndexAtom = atom(0);
export const scoreAtom = atom(0);
export const highestScoreAtom = atom(0);
export const gameOverAtom = atom(false);
export const hasWonAtom = atom(false);
export const highlightedWrongIndexAtom = atom<number | undefined>(undefined);
export const highlightedCorrectIndexAtom = atom<number | undefined>(undefined);

export const currentQuestionAtom = atom((get) =>
  get(questionsAtom).at(get(currentQuestionIndexAtom)),
);

const loadHighestScore = () =>
  Number(localStorage.getItem('highestScore')) || 0;

type Setter = <Value>(
  anAtom: ReturnType<typeof atom<Value>>,
  value: Value,
) => void;

const resetGame = (set: Setter, questions: ColorQuestion[]) => {
  set(questionsAtom, questions);
  set(currentQuestionIndexAtom, 0);
  set(scoreAtom, 0);
  set(gameOverAtom, false);
  set(hasWonAtom, false);
  set(highlightedWrongIndexAtom, undefined);
  set(highlightedCorrectIndexAtom, undefined);
  set(highestScoreAtom, loadHighestScore());
};

export const initGameAtom = atom(null, (_, set, questions: ColorQuestion[]) => {
  resetGame(set, questions);
});

export const tryAgainAtom = atom(null, (_, set) => {
  audios.restart.play();
  resetGame(set, generateColorQuestions(COLOR.TOTAL_QUESTIONS));
});

export const selectAnswerAtom = atom(
  null,
  (
    get,
    set,
    { index, correctIndex }: { index: number; correctIndex: number },
  ) => {
    if (get(gameOverAtom) || get(questionsAtom).length === 0) return;

    const finishGame = () => {
      set(gameOverAtom, true);
      const score = get(scoreAtom);
      const savedHighestScore = loadHighestScore();
      if (score > savedHighestScore)
        localStorage.setItem('highestScore', String(score));
      set(highestScoreAtom, Math.max(savedHighestScore, score));
    };

    if (index === correctIndex) {
      set(scoreAtom, get(scoreAtom) + 1);
      const isLastQuestion =
        get(currentQuestionIndexAtom) >= get(questionsAtom).length - 1;

      if (isLastQuestion) {
        audios.win.play();
        set(hasWonAtom, true);
        finishGame();
      } else {
        audios.click.play();
        set(currentQuestionIndexAtom, get(currentQuestionIndexAtom) + 1);
      }
    } else {
      audios.wrong.play();
      set(highlightedCorrectIndexAtom, correctIndex);
      set(highlightedWrongIndexAtom, index);
      finishGame();
    }
  },
);
