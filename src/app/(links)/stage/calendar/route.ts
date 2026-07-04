import { redirect } from 'next/navigation';

import { getLiveEvent } from '@/data-layer/datocms/getLiveEvent';

export async function GET() {
  const link = await getLiveEvent('stage');
  if (!link) redirect('https://fullstacksjs.com');

  redirect(link.links.calendar);
}
