import { cn } from '@/utils/cn';

interface Props {
  className?: string;
}

export const CircleBadge = ({ className }: Props) => {
  return <div className={cn('size-4 rounded-full bg-accent-0', className)} />;
};
