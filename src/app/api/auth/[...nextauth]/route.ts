import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { config } from '@/config';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: config.github.clientId,
      clientSecret: config.github.clientSecret,
    }),
  ],
});

export { handler as GET, handler as POST };
