import type { User as SUser } from '@supabase/supabase-js';

export interface User extends Pick<SUser, 'email'> {
  isGuildMember?: boolean;
}
