import { twMerge } from 'tailwind-merge';

import TwoDown from './ranks/2down.svg';
import TwoUp from './ranks/2up.svg';
import Down from './ranks/down.svg';
import Up from './ranks/up.svg';
import Zero from './ranks/zero.svg';

function getIcon(diff: number) {
  if (diff > 3) return TwoUp;
  if (diff > 0) return Up;
  if (!diff) return Zero;
  if (diff < -2) return TwoDown;
  return Down;
}

interface Props {
  diff: number;
  className?: string;
}

export function Diff({ diff, className }: Props) {
  const Icon = getIcon(diff);
  return (
    <div className={twMerge('flex items-center gap-1', className)}>
      <span className="flex items-center">
        {<Icon width={16} height={16} />}
      </span>
      <span className="text-xs font-semibold leading-none">{diff}</span>
    </div>
  );
}
