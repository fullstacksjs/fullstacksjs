'use client';

import { isNull } from '@fullstacksjs/toolbox';
import clsx from 'clsx';
import { useState } from 'react';

export type RuleState = 'faded' | 'focused' | 'idle';

interface Props {
  target: string;
  children: React.ReactNode;
  state?: RuleState;
  onSelect?: (target: string) => void;
}

export const Rule = ({ state, target, children, onSelect }: Props) => {
  return (
    <li
      id={target}
      className="group relative mb-3 ms-6 cursor-pointer scroll-m-10 list-dot leading-tight motion-reduce:transition-none"
    >
      <a
        className={clsx('block w-full transition-[color]', {
          'text-accent-1 hover:text-fg-0': state === 'idle',
          'text-accent-1': state === 'focused',
          'opacity-25': state === 'faded',
        })}
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

export function useRuleTarget() {
  const [activeTarget, setActive] = useState<string | undefined>();

  const getState = (target: string): RuleState => {
    if (isNull(activeTarget)) return 'idle';
    if (activeTarget === target) return 'focused';
    return 'faded';
  };

  const handleSelect = (target: string) => {
    if (target === activeTarget) setActive(undefined);
    else setActive(target);
  };

  return { handleSelect, getState };
}
