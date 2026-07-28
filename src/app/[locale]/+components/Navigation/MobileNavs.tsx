'use client';

import { Dialog } from 'radix-ui';
import { useMemo, useState } from 'react';
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
  const closeDrawer = useMemo(() => () => toggle(false), []);
  const openDrawer = useMemo(() => () => toggle(true), []);

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger
        aria-label="toggle navigation menu"
        className="cursor-pointer desktop:hidden"
        onClick={openDrawer}
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <MenuOverlay onClick={closeDrawer} />
        <SheetContent
          direction={direction}
          onClick={closeDrawer}
          onEscapeKeyDown={closeDrawer}
          aria-describedby="Navigation drawer"
        >
          <Dialog.Title hidden>Navigation</Dialog.Title>
          <ul className="flex flex-col">{children}</ul>
        </SheetContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
