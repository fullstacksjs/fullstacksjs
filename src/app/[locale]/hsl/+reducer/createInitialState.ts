import type { ColorQuestion } from '../+logic/questionGenerator';
import type { ColorGameState } from './colorGameReducer';

export const createInitialState = (
  initialColors: ColorQuestion[],
): ColorGameState => ({
  currentQuestionIndex: 0,
  score: 0,
  highestScore: 0,
  gameOver: false,
  highlightedWrongIndex: undefined,
  highlightedCorrectIndex: undefined,
  hasWon: false,
  questions: initialColors,
});
