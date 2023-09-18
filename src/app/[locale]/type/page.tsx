import { getRecord } from '@/data-layer/supabase/getRecord';
import { getUser } from '@/data-layer/supabase/getUser';

import { TypeContent } from './TypeContent';

export default async function TypePage() {
  const record = await getRecord();
  const user = await getUser();

  return <TypeContent user={user} initialRecord={record?.duration} />;
}
