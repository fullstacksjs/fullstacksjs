import { cn } from '@/utils/cn';

import type { ButtonProps } from './Button';

import { Button } from './Button';

export const C2AButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        'ring-4 ring-accent-0/30 outline-offset-4 outline-accent-0 focus-within:outline hover:ring-[6px] hover:ring-accent-0/40',
        className,
      )}
    />
  );
};
