import { twMerge } from 'tailwind-merge';

interface Props {
  children: string;
  className?: string;
}

export const Badge = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        'inline-flex items-center rounded-md bg-accent-0 px-2 py-0 text-xs font-bold text-bg-0',
        className,
      )}
    >
      {children}
    </div>
  );
};
