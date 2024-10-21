import { generatePageOG } from '@/components/SEO';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { getEvents } from '@/data-layer/datocms/getEvents';
import { routing } from '@/i18n/routing';
import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  getTranslations,
  unstable_setRequestLocale as setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isEmpty } from 'radash';

import EventList from './EventList';

export const metadata = generatePageOG({
  title: 'FullstacksJS Events: Learn from the Past, Prepare for the Future',
  description:
    'The FullstacksJS Events page provides a look back at our past events, including the topics that were covered, the speakers who presented, and the resources that were shared. It also lists our upcoming events, so you can stay up-to-date on our latest events and find opportunities to learn and network with other developers.',
  images: '/og/og.png',
});

interface Props {
  params: { locale: string };
}

export default async function EventsPage({ params: { locale } }: Props) {
  if (!getServerFeature('events')) notFound();
  const t = await getTranslations('events');

  setRequestLocale(locale);
  const { upcoming, archived } = await getEvents();

  return (
    <>
      <EventList events={upcoming} title={t('upcoming.title')} />
      {isEmpty(upcoming) || isEmpty(archived) ? null : <Separator />}
      <EventList events={archived} title={t('archived.title')} />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
