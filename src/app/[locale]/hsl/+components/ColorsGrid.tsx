'use client';
import { Button } from '@/components/Button';
import { useTranslations } from 'next-intl';
import React from 'react';

import type { ColorQuestion } from '../generateColorQuestions';

import { useColorGame } from '../useColorGame';
import ColorBlocks from './ColorBlocks';
import GameStatus from './GameStatus';

export default function ColorsGrid({ colors }: { colors: ColorQuestion[] }) {
  const t = useTranslations('hsl');
  const {
    currentQuestion,
    score,
    highestScore,
    gameOver,
    wrongSelectedIndex,
    hasWon,
    handleBlockClick,
    handleTryAgain,
  } = useColorGame(colors);

  return (
    <>
      <ColorBlocks
        blocks={currentQuestion?.blocks ?? []}
        correctIndex={currentQuestion?.correctIndex ?? -1}
        onBlockClick={handleBlockClick}
        wrongSelectedIndex={wrongSelectedIndex}
      />
      <GameStatus
        gameOver={gameOver}
        hasWon={hasWon}
        highestScore={highestScore}
        score={score}
      />
      <Button size="md" variant="outline" onClick={handleTryAgain}>
        {gameOver ? t('tryAgain') : t('reset')}
      </Button>
    </>
  );
}
