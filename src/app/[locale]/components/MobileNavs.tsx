'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MenuOverlay, SheetContent } from './Menu';
import MenuIcon from './Menu.svg';

interface Props {
  children: React.ReactNode;
}

export const MobileNavs = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={() => setOpen(true)} className="tablet:hidden">
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <MenuOverlay onClick={() => setOpen(false)} />
        <SheetContent
          onEscapeKeyDown={() => setOpen(false)}
          onClick={() => setOpen(false)}
          direction="right"
        >
          <ul className="flex flex-col gap-8 text-md font-bold leading-tight tablet:gap-16">
            {children}
          </ul>
        </SheetContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
