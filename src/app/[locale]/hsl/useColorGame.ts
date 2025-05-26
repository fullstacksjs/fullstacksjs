'use client';

import { useEffect, useReducer } from 'react';

import { audios } from '@/components/Audio';

import type { ColorQuestion } from './generateColorQuestions';

import { colorGameReducer, createInitialState } from './colorGameReducer';

export const useColorGame = (initialColors: ColorQuestion[]) => {
  const [state, dispatch] = useReducer(
    colorGameReducer,
    initialColors,
    createInitialState,
  );

  useEffect(() => {
    const savedHighScore = Number(localStorage.getItem('highestScore')) || 0;
    dispatch({ type: 'SET_HIGHEST_SCORE', payload: savedHighScore });

    if (state.gameOver && state.score > state.highestScore) {
      localStorage.setItem('highestScore', String(state.score));
      dispatch({ type: 'SET_HIGHEST_SCORE', payload: state.score });
    }
  }, [state.gameOver, state.highestScore, state.score]);

  const handleBlockClick = (
    index: number,
    correctIndex: number,
    isCorrect: boolean,
  ) => {
    if (state.gameOver || !state.questions.length) return;

    if (isCorrect) {
      audios.click.play();

      const isLastQuestion =
        state.currentQuestionIndex === state.questions.length - 1;

      dispatch({ type: 'CORRECT_ANSWER' });

      if (isLastQuestion) {
        audios.win.play();
      }
    } else {
      audios.wrong.play();
      dispatch({
        type: 'WRONG_ANSWER',
        payload: { correctIndex, wrongIndex: index },
      });
    }
  };

  const handleTryAgain = () => {
    audios.restart.play();
    dispatch({ type: 'TRY_AGAIN' });
  };

  const currentQuestion = state.questions[state.currentQuestionIndex];

  return {
    currentQuestion,
    score: state.score,
    highestScore: state.highestScore,
    gameOver: state.gameOver,
    wrongSelectedIndex: state.wrongSelectedIndex,
    showCorrectIndex: state.showCorrectIndex,
    hasWon: state.hasWon,
    handleBlockClick,
    handleTryAgain,
  };
};
