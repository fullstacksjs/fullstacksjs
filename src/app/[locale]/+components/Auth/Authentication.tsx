import { useTranslations } from 'next-intl';

import { getUser } from '@/data-layer/supabase/getUser';

import GithubOutlineIcon from './GithubIcon.svg?url';
import { LoginButton } from './LoginButton';
import { ProfileButton } from './ProfileButton';

export async function Authentication() {
  const t = useTranslations('header');
  const profile = await getUser();

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
