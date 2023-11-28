'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

const MenuOverlay = forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
MenuOverlay.displayName = Dialog.Overlay.displayName;

interface MenuContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  direction: 'ltr' | 'rtl';
}

const SheetContent = forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  MenuContentProps
>(({ direction, className, children, ...props }, ref) => (
  <Dialog.Content
    ref={ref}
    className={cn(
      'fixed inset-y-0 z-50 h-full w-[300px] gap-4 bg-bg-0 p-12 outline-none transition duration-300 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out',
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
));
SheetContent.displayName = Dialog.Content.displayName;

export { MenuOverlay, SheetContent };
