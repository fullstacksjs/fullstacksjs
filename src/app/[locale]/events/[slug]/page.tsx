import { notFound } from 'next/navigation';
import { SRCImage } from 'react-datocms';

import { getEventBySlug } from '@/data-layer/datocms/getEvent';

import { EventCardAction } from '../+components/EventCardAction';
import { EventCardDescription } from '../+components/EventCardDescription';
import { EventCardTitle } from '../+components/EventCardTitle';

export default async function Page({
  params,
}: SafeLocale<PageProps<'/[locale]/events/[slug]'>>) {
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
