import { getWusLinks } from '@/data-layer/datocms/getWusLinks';
import { redirect } from 'next/navigation';

export async function GET() {
  const link = await getWusLinks();
  if (!link) redirect('https://fullstacksjs.com');

  redirect(link.session);
}
