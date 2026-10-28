import { cn } from '@/utils/cn';

import TwoDown from './ranks/2down.svg';
import TwoUp from './ranks/2up.svg';
import Down from './ranks/down.svg';
import Up from './ranks/up.svg';
import Zero from './ranks/zero.svg';

function renderIcon(diff: number) {
  if (diff > 2) return <TwoUp height={16} width={16} />;
  if (diff > 0) return <Up height={16} width={16} />;
  if (!diff) return <Zero height={16} width={16} />;
  if (diff < -2) return <TwoDown height={16} width={16} />;
  return <Down height={16} width={16} />;
}

interface Props {
  diff: number;
  className?: string;
}

export function Diff({ diff, className }: Props) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className="flex items-center">
        {renderIcon(diff)}
      </span>
      <span className="text-xs/none font-semibold">{Math.abs(diff)}</span>
    </div>
  );
}
