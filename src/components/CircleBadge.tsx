import { cn } from '@/utils/cn';

interface Props {
  className?: string;
}

export const CircleBadge = ({ className }: Props) => {
  return <div className={cn('rounded-full w-4 h-4 bg-accent-0', className)} />;
};
