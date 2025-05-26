import { redirect } from 'next/navigation';

import { getMobEvent } from '@/data-layer/datocms/getMobEvent';

export async function GET() {
  const link = await getMobEvent();
  if (!link) redirect('https://fullstacksjs.com');

  redirect(link.links.calendar);
}
