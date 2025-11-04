'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SRCImage } from 'react-datocms';

import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import { EventCardAction } from '../../../+components/EventCardAction';
import { EventCardDescription } from '../../../+components/EventCardDescription';
import { EventCardTitle } from '../../../+components/EventCardTitle';

interface Props {
  event: FullstacksJSEvent;
}

export const EventDialog = ({ event }: Props) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const close = () => {
    setOpen(false);
    router.back();
  };

  const handleOpenChange = (newOpen: boolean): void => {
    if (!newOpen) close();
  };

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={open}>
      <Dialog.Overlay className="fixed inset-0 backdrop-blur-2xl" />
      <Dialog.Content
        dir="rtl"
        className="bg-bg-darker desktop:max-w-[900px] flex flex-col gap-24 p-12 pt-32 desktop:p-16 fixed inset-0 desktop:left-1/2 desktop:top-1/2 desktop:bottom-auto desktop:transform desktop:-translate-x-1/2 desktop:-translate-y-1/2 rounded-2xl max-h-screen desktop:max-h-[90vh]"
      >
        <Dialog.Close className="desktop:hidden absolute left-12 top-10 cursor-pointer">
          <div className="close-icon size-14" />
        </Dialog.Close>
        <SRCImage data={event.thumbnail} imgClassName="rounded-2xl" />
        <div className="flex flex-col flex-1 gap-16 overflow-y-auto">
          <Dialog.Title>
            <EventCardTitle className="text-xl" data={event.title} />
          </Dialog.Title>
          <EventCardDescription data={event.description} />
        </div>
        <EventCardAction
          mediaUrl={event.mediaUrl}
          isUpcoming={event.isUpcoming}
        ></EventCardAction>
      </Dialog.Content>
    </Dialog.Root>
  );
};
