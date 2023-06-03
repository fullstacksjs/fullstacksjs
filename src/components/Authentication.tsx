import type { AuthorizationParams } from '@auth0/auth0-react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import { config } from '../libs/config';
import AuthBtnSkeleton from './AuthBtnSkeleton';
import LoginBtn from './LoginBtn';
import ProfileBtn from './ProfileBtn';

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
  const authParams: AuthorizationParams =
    typeof window !== 'undefined'
      ? { redirect_uri: `${window.location.origin}/auth/callback` }
      : {};
  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientId}
      authorizationParams={authParams}
    >
      <Authentication language={language} />
    </Auth0Provider>
  );
}

export default Wrapper;
