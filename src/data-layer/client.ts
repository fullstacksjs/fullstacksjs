import { GraphQLClient } from 'graphql-request';

import { config } from '../libs/config';

export const datoClient = new GraphQLClient(config.dato.endpoint, {
  headers: { authorization: `Bearer ${config.dato.token}` },
});
