'use client';

import * as Dialog from '@radix-ui/react-dialog';

import { cn } from '@/utils/cn';

const MenuOverlay = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Overlay>) => (
  <Dialog.Overlay
    className={cn('bg-black/30 fixed inset-0 z-50 backdrop-blur-xs', className)}
    {...props}
  />
);

interface MenuContentProps extends React.ComponentPropsWithoutRef<
  typeof Dialog.Content
> {
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
      'fixed inset-y-0 z-50 h-full w-150 gap-4 bg-bg-raised p-8 outline-hidden',
      {
        '[view-transition-name:menu-content-ltr] left-0': direction === 'ltr',
        '[view-transition-name:menu-content-rtl] right-0': direction === 'rtl',
      },
      className,
    )}
    {...props}
  >
    {children}
  </Dialog.Content>
);

export { MenuOverlay, SheetContent };
