import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

type Props = React.JSX.IntrinsicElements['a'] & {
  asChild?: boolean;
};

export const Anchor = forwardRef<HTMLAnchorElement, Props>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp
        className={cn('text-accent-0 underline', className)}
        {...props}
        ref={ref}
      />
    );
  },
);
