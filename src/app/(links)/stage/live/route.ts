import { getStageEvent } from '@/data-layer/datocms/getStageEvent';
import { redirect } from 'next/navigation';

export async function GET() {
  const link = await getStageEvent();
  if (!link) redirect('https://fullstacksjs.com');

  redirect(link.links.session);
}
