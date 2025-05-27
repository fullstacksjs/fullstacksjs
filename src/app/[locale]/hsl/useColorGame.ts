'use client';

import { useEffect, useReducer } from 'react';

import { audios } from '@/components/Audio';

import type { ColorQuestion } from './generateColorQuestions';

import { colorGameReducer, createInitialState } from './colorGameReducer';

export const useColorGame = (initialColors: ColorQuestion[]) => {
  const [
    {
      score,
      highestScore,
      gameOver,
      questions,
      currentQuestionIndex,
      wrongSelectedIndex,
      showCorrectIndex,
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

  const handleBlockClick = (
    index: number,
    correctIndex: number,
    isCorrect: boolean,
  ) => {
    if (gameOver || !questions.length) return;

    if (isCorrect) {
      audios.click.play();

      const isLastQuestion = currentQuestionIndex === questions.length - 1;

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

  const currentQuestion = questions[currentQuestionIndex];

  return {
    currentQuestion,
    score,
    highestScore,
    gameOver,
    wrongSelectedIndex,
    showCorrectIndex,
    hasWon,
    handleBlockClick,
    handleTryAgain,
  };
};
