'use client';

import { useDirection } from '@/i18n/direction';
import * as Dialog from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MenuOverlay, SheetContent } from '../Menu';
import MenuIcon from './Menu.svg';

interface Props {
  children: React.ReactNode;
}

export const MobileNavs = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const direction = useDirection();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger
        aria-label="toggle navigation menu"
        className="desktop:hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <MenuOverlay onClick={() => setOpen(false)} />
        <SheetContent
          direction={direction}
          onClick={() => setOpen(false)}
          onEscapeKeyDown={() => setOpen(false)}
        >
          <Dialog.Title hidden>Navigation</Dialog.Title>
          <ul className="flex flex-col gap-8 text-md font-bold leading-tight desktop:gap-16">
            {children}
          </ul>
        </SheetContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
