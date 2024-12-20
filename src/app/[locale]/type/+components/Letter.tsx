import { cn } from '@/utils/cn';

import type { LetterStatus } from '../atoms';

interface Props {
  active: boolean;
  status: LetterStatus;
  children: string;
}

export const Letter = ({ children, active, status }: Props) => {
  return (
    <div
      className={cn(
        `inline-block w-32 select-none text-center font-semibold uppercase leading-none`,
        {
          'opacity-25': !active,
          'opacity-100': active,
          'text-red-500': status === 'error',
          'text-green-400': status === 'correct',
          'text-yellow-300': status === 'corrected',
        },
      )}
    >
      {children}
    </div>
  );
};
