import { useTranslations } from 'next-intl';
import { use } from 'react';

import { getProfile } from '@/data-layer/supabase/getProfile';

import GithubOutlineIcon from './GithubIcon.svg?url';
import { LoginButton } from './LoginButton';
import { ProfileButton } from './ProfileButton';

export function Authentication() {
  const t = useTranslations('header');
  const profile = use(getProfile());

  if (profile != null)
    return (
      <ProfileButton avatar={profile.avatar}>{profile.username}</ProfileButton>
    );

  return (
    <LoginButton
      avatar={GithubOutlineIcon.src}
      alt="Github Logo"
      width={16}
      height={16}
    >
      {t('auth.login')}
    </LoginButton>
  );
}
