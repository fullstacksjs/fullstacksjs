'use client';

import { useEffect, useReducer } from 'react';

import type { ColorQuestion } from './+logic/questionGenerator';

import { colorGameReducer } from './+reducer/colorGameReducer';
import { createInitialState } from './+reducer/createInitialState';

export const useColorGame = (initialColors: ColorQuestion[]) => {
  const [
    {
      score,
      highestScore,
      gameOver,
      questions,
      currentQuestionIndex,
      highlightedWrongIndex,
      highlightedCorrectIndex,
      hasWon,
    },
    dispatch,
  ] = useReducer(colorGameReducer, initialColors, createInitialState);

  useEffect(() => {
    const savedHighScore = Number(localStorage.getItem('highestScore')) || 0;
    dispatch({ type: 'SET_HIGHEST_SCORE', payload: savedHighScore });
  }, [gameOver]);

  useEffect(() => {
    if (gameOver && score > highestScore) {
      localStorage.setItem('highestScore', String(score));
      dispatch({ type: 'SET_HIGHEST_SCORE', payload: score });
    }
  }, [gameOver, score, highestScore]);

  const handleBlockClick = (index: number, correctIndex: number) => {
    if (gameOver || !questions.length) return;
    dispatch({
      type: 'SELECT_ANSWER',
      payload: { index, correctIndex },
    });
  };

  const handleTryAgain = () => {
    dispatch({ type: 'TRY_AGAIN' });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return {
    currentQuestion,
    score,
    highestScore,
    gameOver,
    highlightedCorrectIndex,
    highlightedWrongIndex,
    hasWon,
    handleBlockClick,
    handleTryAgain,
  };
};
