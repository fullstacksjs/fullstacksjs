import { redirect } from 'next/navigation';

import { getStageEvent } from '@/data-layer/datocms/getStageEvent';

export async function GET() {
  const link = await getStageEvent();
  if (!link) redirect('https://fullstacksjs.com');

  redirect(link.links.calendar);
}
