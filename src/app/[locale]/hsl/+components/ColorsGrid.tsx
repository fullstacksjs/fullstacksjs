'use client';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/Button';

import type { ColorQuestion } from '../+logic/questionGenerator';

import { useColorGame } from '../useColorGame';
import { ColorBlocks } from './ColorBlocks';
import { Confetti } from './Confetti';
import { GameStatus } from './GameStatus/GameStatus';
import { TelegramShareButton } from './TelegramShareButton';

export function ColorsGrid({ colors }: { colors: ColorQuestion[] }) {
  const t = useTranslations('hsl');
  const {
    currentQuestion,
    score,
    highestScore,
    gameOver,
    highlightedWrongIndex,
    hasWon,
    handleBlockClick,
    handleTryAgain,
    highlightedCorrectIndex,
  } = useColorGame(colors);

  return (
    <>
      <ColorBlocks
        blocks={currentQuestion?.blocks ?? []}
        correctIndex={currentQuestion?.correctIndex ?? -1}
        highlightedCorrectIndex={highlightedCorrectIndex}
        highlightedWrongIndex={highlightedWrongIndex}
        onBlockClick={handleBlockClick}
      />
      <GameStatus
        gameOver={gameOver}
        hasWon={hasWon}
        highestScore={highestScore}
        questionCount={colors.length}
        score={score}
      />
      {hasWon && <Confetti />}
      <div className="flex flex-wrap justify-center items-center gap-6">
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
