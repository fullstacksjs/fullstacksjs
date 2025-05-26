import { getUser } from '@/data-layer/supabase/getUser';
import { getLocale, getTranslations } from 'next-intl/server';

import GithubOutlineIcon from './GithubIcon.svg?url';
import { LoginButton } from './LoginButton';
import { ProfileButton } from './ProfileButton';

export async function Authentication() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'header' });
  const profile = await getUser();

  if (profile != null)
    return (
      <ProfileButton avatar={profile.avatar}>{profile.username}</ProfileButton>
    );

  return (
    <LoginButton
      height={16}
      width={16}
      alt="Github Logo"
      avatar={GithubOutlineIcon.src}
    >
      {t('auth.login')}
    </LoginButton>
  );
}
