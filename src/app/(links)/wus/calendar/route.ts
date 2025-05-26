import { redirect } from 'next/navigation';

import { getWusEvent } from '@/data-layer/datocms/getWusEvent';

export async function GET() {
  const link = await getWusEvent();
  if (!link) redirect('https://fullstacksjs.com');

  redirect(link.links.calendar);
}
