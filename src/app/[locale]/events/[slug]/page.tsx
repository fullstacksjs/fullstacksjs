import { notFound } from 'next/navigation';
import { SRCImage } from 'react-datocms';

import { getEventBySlug } from '@/data-layer/datocms/getEvent';

import { EventCardAction } from '../EventCardAction';
import { EventCardDescription } from '../EventCardDescription';
import { EventCardTitle } from '../EventCardTitle';

export default async function Page({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div dir="rtl" className="flex flex-col gap-16">
      <SRCImage data={event.thumbnail} imgClassName="rounded-2xl" priority />
      <div className="flex flex-col items-start gap-16">
        <EventCardTitle className="text-2xl" data={event.title} />
        <EventCardDescription data={event.description} />
        <EventCardAction
          mediaUrl={event.mediaUrl}
          isUpcoming={event.isUpcoming}
        />
      </div>
    </div>
  );
}
