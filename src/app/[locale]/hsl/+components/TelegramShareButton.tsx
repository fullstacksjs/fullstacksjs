import React from 'react';

import { Button } from '@/components/Button';
import Telegram from '@/components/Icons/Telegram.svg';

interface TelegramShareButtonProps {
  score: number;
  total: number;
  label: string;
}

function getShareTextByProgress(score: number, total: number): string {
  const percent = (score / total) * 100;

  if (percent === 100) {
    return `I got a perfect score of ${score}/${total} in the HSL Color Game! Can you do the same?`;
  } else if (percent >= 75) {
    return `I scored ${score}/${total} in the HSL Color Game! Amazing! Can you beat me?`;
  } else if (percent >= 50) {
    return `I scored ${score}/${total} in the HSL Color Game! Not bad — try to beat me!`;
  } else if (percent >= 25) {
    return `I scored ${score}/${total} in the HSL Color Game! Keep trying, you'll get better!`;
  } else {
    return `I only scored ${score}/${total} in the HSL Color Game... It's tougher than it looks!`;
  }
}

export default function TelegramShareButton({
  score,
  total,
  label,
}: TelegramShareButtonProps) {
  const shareText = getShareTextByProgress(score, total);
  return (
    <Button asChild size="md" type="button" variant="contained">
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent('https://fullstacksjs.com/en/hsl')}&text=${encodeURIComponent(shareText)}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
        <Telegram className="size-10" />
      </a>
    </Button>
  );
}
