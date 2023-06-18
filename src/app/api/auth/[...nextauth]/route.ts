import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { serverConfig } from '@/config/serverConfig';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: serverConfig.github.clientId,
      clientSecret: serverConfig.github.clientSecret,
    }),
  ],
});

export { handler as GET, handler as POST };
