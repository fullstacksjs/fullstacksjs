import { useTranslations } from 'next-intl';

import ScoreLine from './ScoreLine';

interface GameOverStatusProps {
  score: number;
  highestScore: number;
  hasWon: boolean;
  questionCount: number;
}

export default function GameOverStatus({
  score,
  highestScore,
  hasWon,
  questionCount,
}: GameOverStatusProps) {
  const t = useTranslations('hsl');
  return (
    <div className="flex flex-col gap-0.5 items-center">
      <span>{hasWon ? t('congratulations') : t('gameOver')}</span>
      <ScoreLine
        label={hasWon ? t('finalScore') : t('lastScore')}
        questionCount={questionCount}
        score={score}
      />
      <ScoreLine
        label={t('highestScore')}
        questionCount={questionCount}
        score={highestScore}
      />
    </div>
  );
}
