import { cn } from '@/utils/cn';

interface Props {
  active: boolean;
  error: boolean;
  correct: boolean;
  children: string;
}

export const Letter = ({ children, active, error, correct }: Props) => {
  return (
    <div
      className={cn(
        `text-6xl inline-block uppercase w-32 select-none text-center font-semibold`,
        {
          'opacity-25': !active,
          'opacity-100': active,
          'text-red-500': error,
          'text-green-400': correct,
        },
      )}
    >
      {children}
    </div>
  );
};
