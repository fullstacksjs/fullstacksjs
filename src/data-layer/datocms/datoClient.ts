import 'server-only';
import { serverConfig } from '@/config/serverConfig';
import { GraphQLClient } from 'graphql-request';

export const datoClient = new GraphQLClient(serverConfig.get('dato.endpoint'), {
  headers: { authorization: `Bearer ${serverConfig.get('dato.token')}` },
});
