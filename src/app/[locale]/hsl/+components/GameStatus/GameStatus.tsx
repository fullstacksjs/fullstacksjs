import { useTranslations } from 'next-intl';

import { GameOverStatus } from './GameOverStatus';
import { InProgressStatus } from './InProgressStatus';

interface GameStatusProps {
  score: number;
  highestScore: number;
  gameOver: boolean;
  hasWon: boolean;
  questionCount: number;
}

export function GameStatus({
  score,
  highestScore,
  gameOver,
  hasWon,
  questionCount,
}: GameStatusProps) {
  const t = useTranslations('hsl');

  return (
    <div className="border border-bg-muted rounded-lg p-8">
      {gameOver ? (
        <GameOverStatus
          hasWon={hasWon}
          highestScore={highestScore}
          questionCount={questionCount}
          score={score}
        />
      ) : (
        <InProgressStatus
          currentScoreLabel={t('currentScore')}
          questionCount={questionCount}
          score={score}
        />
      )}
    </div>
  );
}
