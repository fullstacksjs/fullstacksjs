'use client';

import { useEffect, useReducer } from 'react';

import type { ColorQuestion } from './generateColorQuestions';

import { colorGameReducer, createInitialState } from './colorGameReducer';

export const useColorGame = (initialColors: ColorQuestion[]) => {
  const [state, dispatch] = useReducer(
    colorGameReducer,
    initialColors,
    createInitialState,
  );

  useEffect(() => {
    const savedScore = Number(localStorage.getItem('highestScore')) || 0;
    dispatch({ type: 'SET_HIGHEST_SCORE', payload: savedScore });
  }, []);

  useEffect(() => {
    if (!state.gameOver) return;
    if (state.score > state.highestScore) {
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
      dispatch({ type: 'CORRECT_ANSWER' });
    } else {
      dispatch({
        type: 'WRONG_ANSWER',
        payload: { correctIndex, wrongIndex: index },
      });
    }
  };

  const handleTryAgain = () => {
    dispatch({ type: 'TRY_AGAIN' });
    const savedScore = Number(localStorage.getItem('highestScore')) || 0;
    dispatch({ type: 'SET_HIGHEST_SCORE', payload: savedScore });
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
