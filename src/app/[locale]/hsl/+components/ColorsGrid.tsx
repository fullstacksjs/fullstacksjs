'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button } from '@/components/Button';

import type { ColorQuestion } from '../+logic/questionGenerator';

import {
  currentQuestionAtom,
  gameOverAtom,
  hasWonAtom,
  highestScoreAtom,
  highlightedCorrectIndexAtom,
  highlightedWrongIndexAtom,
  initGameAtom,
  questionsAtom,
  scoreAtom,
  selectAnswerAtom,
  tryAgainAtom,
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
  const highlightedWrongIndex = useAtomValue(highlightedWrongIndexAtom);
  const highlightedCorrectIndex = useAtomValue(highlightedCorrectIndexAtom);

  const selectAnswer = useSetAtom(selectAnswerAtom);
  const tryAgain = useSetAtom(tryAgainAtom);
  const initGame = useSetAtom(initGameAtom);

  useEffect(() => {
    initGame(colors);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- start a fresh game once per mount with the server-generated questions
  }, []);

  return (
    <>
      <ColorBlocks
        blocks={currentQuestion?.blocks ?? []}
        correctIndex={currentQuestion?.correctIndex ?? -1}
        highlightedCorrectIndex={highlightedCorrectIndex}
        highlightedWrongIndex={highlightedWrongIndex}
        onBlockClick={(index, correctIndex) =>
          selectAnswer({ index, correctIndex })
        }
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
