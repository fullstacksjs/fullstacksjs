import type { User } from '@/data-layer/supabase/models/User';

import { NeedToLogin } from './NeedToLogin';
import { SubscribeButton } from './SubscribeButton';
import { Unsubscribe } from './Unsubscribe';

interface Props {
  user: User | undefined;
  isSubscribed: boolean;
}

export const Subscription = ({ isSubscribed, user }: Props) => {
  if (!user) return <NeedToLogin />;
  if (isSubscribed) return <Unsubscribe />;
  return <SubscribeButton />;
};
