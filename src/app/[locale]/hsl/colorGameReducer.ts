import type { ColorQuestion } from './generateColorQuestions';

import { generateColorQuestions } from './generateColorQuestions';

interface State {
  currentQuestionIndex: number;
  score: number;
  highestScore: number;
  gameOver: boolean;
  wrongSelectedIndex?: number;
  showCorrectIndex?: number;
  hasWon: boolean;
  questions: ColorQuestion[];
}

type Action =
  | { type: 'CORRECT_ANSWER' }
  | { type: 'END_GAME' }
  | { type: 'SET_HIGHEST_SCORE'; payload: number }
  | { type: 'SET_QUESTIONS'; payload: ColorQuestion[] }
  | { type: 'TRY_AGAIN' }
  | {
      type: 'WRONG_ANSWER';
      payload: { wrongIndex: number; correctIndex: number };
    };

export const createInitialState = (initialColors: ColorQuestion[]): State => ({
  currentQuestionIndex: 0,
  score: 0,
  highestScore: 0,
  gameOver: false,
  wrongSelectedIndex: undefined,
  showCorrectIndex: undefined,
  hasWon: false,
  questions: initialColors,
});

export function colorGameReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_HIGHEST_SCORE':
      return { ...state, highestScore: action.payload };

    case 'CORRECT_ANSWER': {
      const newScore = state.score + 1;
      const isLastQuestion =
        state.currentQuestionIndex >= state.questions.length - 1;

      if (isLastQuestion) {
        return {
          ...state,
          score: newScore,
          gameOver: true,
          hasWon: true,
          highestScore: Math.max(newScore, state.highestScore),
        };
      }

      return {
        ...state,
        score: newScore,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    }

    case 'WRONG_ANSWER': {
      return {
        ...state,
        gameOver: true,
        showCorrectIndex: action.payload.correctIndex,
        wrongSelectedIndex: action.payload.wrongIndex,
      };
    }

    case 'END_GAME':
      return { ...state, gameOver: true };

    case 'TRY_AGAIN':
      return {
        ...createInitialState(generateColorQuestions(20)),
        highestScore: state.highestScore,
      };

    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };

    default:
      return state;
  }
}
