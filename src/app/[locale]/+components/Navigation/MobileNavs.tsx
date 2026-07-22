'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { flushSync } from 'react-dom';

import type { Direction } from '@/i18n/direction';

import { MenuOverlay, SheetContent } from '../Menu';
import MenuIcon from './Menu.svg';

interface Props {
  children: React.ReactNode;
  direction: Direction;
}

export const MobileNavs = ({ children, direction }: Props) => {
  const [open, setOpen] = useState(false);

  const toggle = (next: boolean) => {
    if (!document.startViewTransition) {
      setOpen(next);
      return;
    }

    document.startViewTransition(() => flushSync(() => setOpen(next)));
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger
        aria-label="toggle navigation menu"
        className="cursor-pointer desktop:hidden"
        onClick={() => toggle(true)}
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <MenuOverlay onClick={() => toggle(false)} />
        <SheetContent
          direction={direction}
          onClick={() => toggle(false)}
          onEscapeKeyDown={() => toggle(false)}
        >
          <Dialog.Title hidden>Navigation</Dialog.Title>
          <ul className="flex flex-col gap-8 desktop:gap-16">{children}</ul>
        </SheetContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
