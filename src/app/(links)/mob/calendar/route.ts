import { getMobEvent } from '@/data-layer/datocms/getMobEvent';
import { redirect } from 'next/navigation';

export async function GET() {
  const link = await getMobEvent();
  if (!link) redirect('https://fullstacksjs.com');

  redirect(link.links.calendar);
}
