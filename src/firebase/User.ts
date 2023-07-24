import type { User as FUser } from 'firebase/auth';

export interface User extends Pick<FUser, 'email'> {
  isGuildMember?: boolean;
}
