import { useTranslations } from 'next-intl';
import React from 'react';

interface GameStatusProps {
  score: number;
  highestScore: number;
  gameOver: boolean;
  hasWon: boolean;
  questionCount: number;
}

export default function GameStatus({
  score,
  highestScore,
  gameOver,
  hasWon,
  questionCount,
}: GameStatusProps) {
  const t = useTranslations('hsl');

  return (
    <div className="border border-advent-2 rounded-lg p-8">
      {gameOver ? (
        <p className="flex flex-col gap-0.5 items-center">
          {hasWon ? (
            <>
              <span>{t('congratulations')}</span>
              <span>
                {t('finalScore')}{' '}
                <strong>
                  {score} / {questionCount}
                </strong>
              </span>
            </>
          ) : (
            <>
              <span>{t('gameOver')}</span>
              <span>
                {t('lastScore')}{' '}
                <strong>
                  {score} / {questionCount}
                </strong>
              </span>
            </>
          )}
          <span>
            {t('highestScore')}{' '}
            <strong>
              {highestScore} / {questionCount}
            </strong>
          </span>
        </p>
      ) : (
        <span>
          {t('currentScore')}{' '}
          <strong>
            {score} / {questionCount}
          </strong>
        </span>
      )}
    </div>
  );
}
