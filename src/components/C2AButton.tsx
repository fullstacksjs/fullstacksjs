import { cn } from '@/utils/cn';

import type { ButtonProps } from './Button';

import { Button } from './Button';

export const C2AButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        'uppercase outline-1 outline-offset-4 outline-accent-0 ring-4 ring-accent-0/30 hover:ring-[6px] hover:ring-accent-0/40 focus:outline',
        className,
      )}
    />
  );
};
