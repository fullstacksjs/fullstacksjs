'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/Button';

import type { ColorQuestion } from '../generateColorQuestions';

import { useColorGame } from '../useColorGame';
import ColorBlocks from './ColorBlocks';
import { Confetti } from './Confetti';
import GameStatus from './GameStatus';
import TelegramShareButton from './TelegramShareButton';

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
    showCorrectIndex,
  } = useColorGame(colors);

  return (
    <>
      <ColorBlocks
        blocks={currentQuestion?.blocks ?? []}
        correctIndex={currentQuestion?.correctIndex ?? -1}
        onBlockClick={handleBlockClick}
        showCorrectIndex={showCorrectIndex}
        wrongSelectedIndex={wrongSelectedIndex}
      />
      <GameStatus
        gameOver={gameOver}
        hasWon={hasWon}
        highestScore={highestScore}
        questionCount={colors.length}
        score={score}
      />
      {hasWon && <Confetti />}
      <div className="flex flex-col mobile:flex-row items-center gap-6">
        {gameOver && (
          <TelegramShareButton
            label={t('shareOn')}
            score={score}
            total={colors.length}
          />
        )}
        <Button size="md" variant="outline" onClick={handleTryAgain}>
          {gameOver ? t('tryAgain') : t('reset')}
        </Button>
      </div>
    </>
  );
}
