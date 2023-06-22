import { useAuth0 } from '@auth0/auth0-react';

import useIsDeviceTablet from '../hooks/useDeviceSize';
import GithubOutlineIcon from './Icons/GithubOutlineIcon';
import SecondaryButton from './SecondaryButton';

interface Props {
  language: string;
}

function LoginBtn({ language }: Props) {
  const { loginWithPopup } = useAuth0();
  const [isMobile] = useIsDeviceTablet();

  const handleLogin = async () => {
    try {
      await loginWithPopup();
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <SecondaryButton onClick={handleLogin}>
      <div className="rounded-full border border-fg-0 bg-bg-0 p-3.5">
        <GithubOutlineIcon className="h-6 w-6" />
      </div>
      <p className={isMobile ? 'hidden' : 'mr-2'}>
        {language === 'en' ? 'Login with Github' : 'ورود با گیت‌هاب'}
      </p>
    </SecondaryButton>
  );
}

export default LoginBtn;
