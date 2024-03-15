import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {params: {scope: "user,repo"}}
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // If the user has just logged in, store the access token in the JWT
      if (account && account.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Forward the access token to the session
      session.accessToken = token.accessToken;
      return session;
    },
  },
};