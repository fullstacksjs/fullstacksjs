import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

import { config } from '../libs/config';
import GithubOutlineIcon from './Icons/GithubOutlineIcon.';
import LogoutIcon from './Icons/LogoutIcon';
import LoginBtnSkeleton from './Skeletons/LoginBtnSkeleton';

interface Props {
  language: string;
}

function LoginButton({ language }: Props): JSX.Element {
  const { loginWithPopup, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const [isExtended, setIsExtended] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
  }

  const handleLogin = async () => {
    try {
      await loginWithPopup();
      if (isMobile) setIsExtended(false);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    if (isMobile) setIsExtended(false);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  if (isLoading) {
    return <LoginBtnSkeleton isMobile={isMobile} />;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-bg-muted px-4 py-3 text-xsm font-semibold capitalize leading-snug text-white hover:cursor-pointer focus:outline">
        <div
          onClick={() => {
            if (isMobile) setIsExtended((pre) => !pre);
          }}
        >
          <img
            src={user?.picture}
            className="h-14 w-14 rounded-full border border-white"
          />
        </div>
        <div
          className={`text-xsm ${
            isExtended ? 'flex' : 'hidden'
          } items-center gap-3 tablet:flex`}
        >
          <p className="text-xsm">{user?.name}</p>
          <button type="button" onClick={handleLogout}>
            <LogoutIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-lg bg-bg-muted px-4 py-3 font-semibold capitalize leading-snug text-fg-0/10 hover:cursor-pointer focus:outline">
      <div
        className="rounded-full border border-fg-0 bg-bg-0 py-2.5 pl-2 pr-3"
        onClick={() => {
          if (isMobile) setIsExtended((pre) => !pre);
        }}
      >
        <GithubOutlineIcon className="h-8 w-8" />
      </div>
      <button
        type="button"
        className={`text-xsm ${
          isExtended ? 'block' : 'hidden'
        } font-normal tablet:block`}
        onClick={handleLogin}
      >
        {language === 'en' ? 'Login with Github' : 'ورود با گیت‌هاب'}
      </button>
    </div>
  );
}

function Wrapper({ language }: Props) {
  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientId}
      authorizationParams={{
        redirect_uri: 'http://localhost:3000/auth/callback',
      }}
    >
      <LoginButton language={language} />
    </Auth0Provider>
  );
}

export default Wrapper;
