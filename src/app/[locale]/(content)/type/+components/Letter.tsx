import { cn } from '@/utils/cn';

import type { LetterStatus } from '../atoms';

interface Props {
  active: boolean;
  status: LetterStatus;
  children: string;
  current: boolean;
}

export const Letter = ({ children, active, status, current }: Props) => {
  return (
    <div
      className={cn(
        `inline-block w-32 text-center leading-none uppercase select-none`,
        {
          'opacity-25': !active,
          'opacity-100': active,
          'text-fg-error': !current && status === 'error',
          'text-fg-success': !current && status === 'correct',
          'text-fg-warning': !current && status === 'corrected',
        },
      )}
    >
      {children}
    </div>
  );
};
