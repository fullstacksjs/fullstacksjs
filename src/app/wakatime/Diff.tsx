import TwoDown from './ranks/2down.svg';
import TwoUp from './ranks/2up.svg';
import Down from './ranks/down.svg';
import Up from './ranks/up.svg';
import Zero from './ranks/zero.svg';

function getIcon(diff: number) {
  if (diff > 3) return <TwoUp />;
  if (diff > 0) return <Up />;
  if (!diff) return <Zero />;
  if (diff < -2) return <TwoDown />;
  return <Down />;
}

export function Diff({ diff }: { diff: number }) {
  return (
    <div className=" flex items-center gap-1">
      <span className="flex items-center">{getIcon(diff)}</span>
      <span className="text-sm font-semibold text-fg-0">{diff}</span>
    </div>
  );
}
