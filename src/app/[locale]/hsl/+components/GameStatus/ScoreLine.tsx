interface ScoreLineProps {
  label: string;
  score: number;
  questionCount: number;
}

export default function ScoreLine({
  label,
  score,
  questionCount,
}: ScoreLineProps) {
  return (
    <span>
      {label}{' '}
      <strong>
        {score} / {questionCount}
      </strong>
    </span>
  );
}
