import ScoreLine from './ScoreLine';

interface InProgressStatusProps {
  score: number;
  questionCount: number;
  currentScoreLabel: string;
}

export default function InProgressStatus({
  score,
  questionCount,
  currentScoreLabel,
}: InProgressStatusProps) {
  return (
    <ScoreLine
      label={currentScoreLabel}
      questionCount={questionCount}
      score={score}
    />
  );
}
