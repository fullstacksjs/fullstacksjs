import type { ColorQuestion } from '../+logic/questionGenerator';
import type { Action } from './actions';

import { ActionTypes } from './actions';
import { handleCorrectAnswer } from './handleCorrectAnswer';
import { handleTryAgain } from './handleTryAgain';
import { handleWrongAnswer } from './handleWrongAnswer';

export interface ColorGameState {
  currentQuestionIndex: number;
  score: number;
  highestScore: number;
  gameOver: boolean;
  highlightedWrongIndex?: number;
  highlightedCorrectIndex?: number;
  hasWon: boolean;
  questions: ColorQuestion[];
}

export function colorGameReducer(
  state: ColorGameState,
  action: Action,
): ColorGameState {
  switch (action.type) {
    case ActionTypes.SET_HIGHEST_SCORE:
      return { ...state, highestScore: action.payload };

    case ActionTypes.SELECT_ANSWER: {
      const { index, correctIndex } = action.payload;
      return index === correctIndex
        ? handleCorrectAnswer(state)
        : handleWrongAnswer(state, correctIndex, index);
    }

    case ActionTypes.TRY_AGAIN: {
      return handleTryAgain();
    }

    default:
      return state;
  }
}
