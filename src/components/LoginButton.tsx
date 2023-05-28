import { useAuth0 } from '@auth0/auth0-react';
import { Auth0Provider } from '@auth0/auth0-react';
import { config } from '../libs/config';
import GithubOutlineIcon from './Icons/GithubOutlineIcon.';
import LogoutIcon from './Icons/LogoutIcon';
import LoginBtnSkeleton from './Skeletons/LoginBtnSkeleton';
import { useEffect, useState } from 'react';

interface Iprop {
  language: string;
}

function LoginButton({ language }: Iprop): JSX.Element {
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
      isMobile && setIsExtended(false);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    isMobile && setIsExtended(false);
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
      <div className="flex gap-3 items-center rounded-lg bg-[rgba(255,255,255,0.1)] text-white px-4 py-3 text-xsm font-semibold capitalize leading-snug focus:outline hover:cursor-pointer">
        <div
          onClick={() => {
            if (isMobile) setIsExtended((pre) => !pre);
          }}
        >
          <img
            src={user?.picture}
            className="w-14 h-14 rounded-full border border-white"
          />
        </div>
        <div
          className={`text-xsm ${
            isExtended ? 'flex' : 'hidden'
          } tablet:flex items-center gap-3`}
        >
          <p className="text-xsm">{user?.name}</p>
          <button type="button" onClick={handleLogout}>
            <LogoutIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center rounded-lg bg-[rgba(255,255,255,0.1)] text-[rgba(230,230,230,1)] px-4 py-3 font-semibold capitalize leading-snug focus:outline hover:cursor-pointer">
      <div
        className="py-2.5 bg-[rgba(35,37,46,1)] pl-2 pr-3 rounded-full border border-[rgba(230,230,230,1)]"
        onClick={() => {
          if (isMobile) setIsExtended((pre) => !pre);
        }}
      >
        <GithubOutlineIcon className="w-8 h-8" />
      </div>
      <button
        type="button"
        className={`text-xsm ${
          isExtended ? 'block' : 'hidden'
        } tablet:block font-normal`}
        onClick={handleLogin}
      >
        {language === 'en' ? 'Login with Github' : 'ورود با گیت‌هاب'}
      </button>
    </div>
  );
}

function Wrapper({ language }: Iprop) {
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
