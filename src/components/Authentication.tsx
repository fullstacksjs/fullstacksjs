import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import { config } from '../libs/config';
import LoginBtn from './LoginBtn';
import ProfileBtn from './ProfileBtn';
import AuthBtnSkeleton from './Skeletons/AuthBtnSkeleton';

interface Props {
  language: string;
}

function Authentication({ language }: Props): JSX.Element {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <AuthBtnSkeleton />;
  if (isAuthenticated) return <ProfileBtn />;
  return <LoginBtn language={language} />;
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
      <Authentication language={language} />
    </Auth0Provider>
  );
}

export default Wrapper;
