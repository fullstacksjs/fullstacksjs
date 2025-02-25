import type { Metadata } from 'next';

import { Button } from '@/components/Button';
import { generatePageOG } from '@/components/SEO';
import { getWusEvent } from '@/data-layer/datocms/getWusEvent';
import { notFound } from 'next/navigation';

import { EventActions, EventPage } from '../+components/Event/EventPage';

export const metadata: Metadata = {
  ...generatePageOG({
    title: "What's up S-Kill",
    description:
      'Bi-weekly stream about the latest news in the world of web development',
    images: '/og/wus.png',
  }),
};

export default async function Page() {
  const event = await getWusEvent();
  if (!event) return notFound();

  return (
    <EventPage
      heading={event.heading}
      thumbnail={event.thumbnail}
      description={event.description}
    >
      <EventActions>
        <Button asChild size="sm">
          <a href="/wus/calendar" target="_blank">
            افزودن به تقویم
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href="/wus/live" target="_blank">
            وارد جلسه شوید
          </a>
        </Button>
      </EventActions>
    </EventPage>
  );
}
