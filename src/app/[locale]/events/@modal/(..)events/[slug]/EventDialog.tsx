'use client';
import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SRCImage } from 'react-datocms';

import { EventCardAction } from '../../../EventCardAction';
import { EventCardDescription } from '../../../EventCardDescription';
import { EventCardTitle } from '../../../EventCardTitle';

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
        className="bg-bg-darker max-w-[900px] flex flex-col gap-24 p-24 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
      >
        <SRCImage data={event.thumbnail} imgClassName="rounded-2xl" />
        <div className="flex flex-col gap-16">
          <Dialog.Title>
            <EventCardTitle className="text-xl" data={event.title} />
          </Dialog.Title>
          <EventCardDescription
            className="max-h-[30vh] overflow-y-auto"
            data={event.description}
          />
        </div>
        <EventCardAction
          mediaUrl={event.mediaUrl}
          isUpcoming={event.isUpcoming}
        ></EventCardAction>
      </Dialog.Content>
    </Dialog.Root>
  );
};
