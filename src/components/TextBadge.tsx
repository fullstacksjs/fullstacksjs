import { cn } from '@/utils/cn';

interface Props {
  children?: string;
  className?: string;
}

export const TextBadge = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md bg-accent-0 px-2 py-0 text-xs font-bold text-bg-0',
        className,
      )}
    >
      {children}
    </div>
  );
};
