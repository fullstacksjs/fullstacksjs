import 'server-only';
import { serverConfig } from '@/config/serverConfig';
import { GraphQLClient } from 'graphql-request';

export const datoClient = new GraphQLClient(serverConfig.dato.endpoint, {
  headers: { authorization: `Bearer ${serverConfig.dato.token}` },
});
