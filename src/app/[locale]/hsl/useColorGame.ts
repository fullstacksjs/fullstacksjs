import { useEffect, useState } from 'react';

import type { ColorQuestion } from './generateColorQuestions';

import { generateColorQuestions } from './generateColorQuestions';

export const useColorGame = (initialColors: ColorQuestion[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [wrongSelectedIndex, setWrongSelectedIndex] = useState<number | null>(
    null,
  );
  const [hasWon, setHasWon] = useState(false);
  const [questions, setQuestions] = useState<ColorQuestion[]>(initialColors);

  useEffect(() => {
    const savedScore = localStorage.getItem('highestScore');
    if (savedScore && !isNaN(+savedScore)) {
      setHighestScore(Number(savedScore));
    }
  }, []);

  const endGame = (finalScore: number) => {
    setGameOver(true);
    if (finalScore > highestScore) {
      setHighestScore(finalScore);
      localStorage.setItem('highestScore', String(finalScore));
    }
  };

  const handleBlockClick = (index: number, isCorrect: boolean) => {
    if (gameOver || !questions.length) return;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setHasWon(true);
        endGame(newScore);
      }
    } else {
      setWrongSelectedIndex(index);
      endGame(score);
    }
  };

  const handleTryAgain = () => {
    setQuestions(generateColorQuestions(20));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setHasWon(false);
    setWrongSelectedIndex(null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return {
    currentQuestion,
    score,
    highestScore,
    gameOver,
    wrongSelectedIndex,
    hasWon,
    handleBlockClick,
    handleTryAgain,
  };
};
