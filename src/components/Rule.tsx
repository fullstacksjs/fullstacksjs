'use client';

import clsx from 'clsx';

interface Props {
  target: string;
  children: React.ReactNode;
  isActive?: boolean;
  onSelect?: (target: string) => void;
}

export const Rule = ({
  isActive,
  target,
  children,
  onSelect,
}: Props): React.JSX.Element => {
  return (
    <li
      id={target}
      className="group relative mb-3 ms-6 cursor-pointer scroll-m-10 list-dot leading-tight motion-reduce:transition-none"
    >
      <a
        className={clsx(
          'block w-full transition-[color] hover:text-fg-0',
          { 'text-accent-1 ': isActive },
          { 'text-fg-muted': !isActive },
        )}
        href={`#${target}`}
        onClick={() => {
          onSelect?.(target);
        }}
      >
        {children}
      </a>
    </li>
  );
};
