'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/Button';

import type { ColorQuestion } from '../+logic/questionGenerator';

import {
  currentQuestionAtom,
  gameOverAtom,
  hasWonAtom,
  highestScoreAtom,
  questionsAtom,
  revealedCorrectIndexAtom,
  scoreAtom,
  selectAnswerAtom,
  tryAgainAtom,
  wrongIndexAtom,
} from '../atoms';
import { ColorBlocks } from './ColorBlocks';
import { Confetti } from './Confetti';
import { GameStatus } from './GameStatus/GameStatus';
import { TelegramShareButton } from './TelegramShareButton';

export function ColorsGrid({ colors }: { colors: ColorQuestion[] }) {
  useHydrateAtoms([[questionsAtom, colors]]);
  const t = useTranslations('hsl');

  const currentQuestion = useAtomValue(currentQuestionAtom);
  const score = useAtomValue(scoreAtom);
  const highestScore = useAtomValue(highestScoreAtom);
  const gameOver = useAtomValue(gameOverAtom);
  const hasWon = useAtomValue(hasWonAtom);
  const wrongIndex = useAtomValue(wrongIndexAtom);
  const revealedCorrectIndex = useAtomValue(revealedCorrectIndexAtom);

  const selectAnswer = useSetAtom(selectAnswerAtom);
  const tryAgain = useSetAtom(tryAgainAtom);

  return (
    <>
      <ColorBlocks
        blocks={currentQuestion?.blocks ?? []}
        highlightedCorrectIndex={revealedCorrectIndex}
        highlightedWrongIndex={wrongIndex}
        onBlockClick={selectAnswer}
      />
      <GameStatus
        gameOver={gameOver}
        hasWon={hasWon}
        highestScore={highestScore}
        questionCount={colors.length}
        score={score}
      />
      {hasWon && <Confetti />}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {gameOver && (
          <TelegramShareButton
            label={t('shareOn')}
            score={score}
            total={colors.length}
          />
        )}
        <Button size="md" variant="outline" onClick={tryAgain}>
          {gameOver ? t('tryAgain') : t('reset')}
        </Button>
      </div>
    </>
  );
}
