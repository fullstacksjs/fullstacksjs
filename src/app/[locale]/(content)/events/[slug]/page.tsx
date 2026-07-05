import type { Metadata } from 'next';

import { render } from 'datocms-structured-text-to-plain-text';
import { notFound } from 'next/navigation';
import { SRCImage } from 'react-datocms';

import type { OGProps } from '@/components/SEO';

import { generatePageOG } from '@/components/SEO';
import { getEventBySlug } from '@/data-layer/datocms/getEvent';

import { EventCardAction } from '../+components/EventCardAction';
import { EventCardDescription } from '../+components/EventCardDescription';
import { EventCardTitle } from '../+components/EventCardTitle';

export async function generateMetadata({
  params,
}: SafeLocale<PageProps<'/[locale]/events/[slug]'>>): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return generatePageOG({
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    });
  }

  const title = render(event.title);
  const image = event.thumbnail;

  const metadata: OGProps = {
    title: '',
    description: '',
  };
  if (title) metadata.title = title;
  metadata.description = image.alt!;
  metadata.images = image.src!;

  return generatePageOG(metadata);
}

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
