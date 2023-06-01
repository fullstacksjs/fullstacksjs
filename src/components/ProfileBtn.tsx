import { useAuth0 } from '@auth0/auth0-react';

import useIsDeviceMobile from '../custom hooks/useDeviceSize';
import AuthButtonsWrapper from './AuthButtonsWrapper';
import LogoutIcon from './Icons/LogoutIcon';

function ProfileBtn() {
  const { user, logout } = useAuth0();
  const [isMobile] = useIsDeviceMobile();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="flex gap-2">
      <AuthButtonsWrapper>
        <img
          src={user?.picture}
          className="h-14 w-14 rounded-full border border-white"
        />
        <p className={isMobile ? 'hidden' : 'mr-2'}>{user?.name}</p>
      </AuthButtonsWrapper>
      <AuthButtonsWrapper
        className="w-[53px] justify-center"
        onClick={handleLogout}
      >
        <LogoutIcon className="h-10 w-10" />
      </AuthButtonsWrapper>
    </div>
  );
}

export default ProfileBtn;
