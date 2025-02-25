'use client';

import { cn } from '@/utils/cn';
import * as Dialog from '@radix-ui/react-dialog';

const MenuOverlay = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Overlay>) => (
  <Dialog.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/30 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
);

interface MenuContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  direction: 'ltr' | 'rtl';
}

const SheetContent = ({
  direction,
  className,
  children,
  ...props
}: MenuContentProps) => (
  <Dialog.Content
    className={cn(
      'fixed inset-y-0 z-50 h-full w-[300px] gap-4 bg-bg-0 p-12 outline-hidden transition duration-300 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out',
      {
        'left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left':
          direction === 'ltr',
        'right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right':
          direction === 'rtl',
      },
      className,
    )}
    {...props}
  >
    {children}
  </Dialog.Content>
);

export { MenuOverlay, SheetContent };
