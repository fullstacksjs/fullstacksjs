'use client';
import type { FullstacksJSEvent } from '@/data-layer/datocms/Event';

import { EventTitle } from '@/app/[locale]/+components/Event/EventPage';
import { Button } from '@/components/Button';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SRCImage } from 'react-datocms';

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

  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay
        className="fixed inset-0 backdrop-blur-2xl"
        onClick={close}
      />
      <Dialog.Content
        dir="rtl"
        className="bg-bg-darker max-w-[800px] flex flex-col gap-24 p-24 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
      >
        <SRCImage data={event.thumbnail} imgClassName="rounded-2xl" />
        <div className="flex flex-col gap-16">
          <Dialog.Title>
            <EventCardTitle>{event.title}</EventCardTitle>
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Description
          </Dialog.Description>
        </div>
        <div className="flex gap-4">
          <Button asChild size="sm">
            <a href="/mob/calendar" target="_blank">
              افزودن به تقویم
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href="/mob/live" target="_blank">
              وارد جلسه شوید
            </a>
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
