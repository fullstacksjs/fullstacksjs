import { getWusEvent } from '@/data-layer/datocms/getWusLinks';
import { redirect } from 'next/navigation';

export async function GET() {
  const link = await getWusEvent();
  if (!link) redirect('https://fullstacksjs.com');

  redirect(link.links.calendar);
}
