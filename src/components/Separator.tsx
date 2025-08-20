import { cn } from '@/utils/cn';

export const Separator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) => (
  <hr className={cn('border-t border-bg-muted', className)} {...props} />
);
