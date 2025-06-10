import { audios } from '@/components/Audio';

import type { ColorGameState } from './colorGameReducer';

export const handleCorrectAnswer = (state: ColorGameState): ColorGameState => {
  const { currentQuestionIndex, questions, score, highestScore } = state;
  const { win, click } = audios;
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;
  const newScore = score + 1;

  if (isLastQuestion) {
    win.play();
    return {
      currentQuestionIndex,
      questions,
      score: newScore,
      gameOver: true,
      hasWon: true,
      highestScore: Math.max(newScore, highestScore),
    };
  }

  click.play();
  return {
    ...state,
    score: newScore,
    currentQuestionIndex: currentQuestionIndex + 1,
  };
};
