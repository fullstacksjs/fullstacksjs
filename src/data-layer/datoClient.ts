import 'server-only';

import { GraphQLClient } from 'graphql-request';

import { serverConfig } from '@/config/serverConfig';

export const datoClient = new GraphQLClient(serverConfig.dato.endpoint, {
  headers: { authorization: `Bearer ${serverConfig.dato.token}` },
});
