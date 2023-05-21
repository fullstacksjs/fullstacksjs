import { createAuth0Client } from '@auth0/auth0-spa-js';

import { config } from './config';

export function createAuthClient() {
  return createAuth0Client({
    clientId: config.auth0.clientId,
    domain: config.auth0.domain,
    authorizationParams: {
      redirect_uri: 'http://localhost:3000/auth/callback',
    },
  });
}
