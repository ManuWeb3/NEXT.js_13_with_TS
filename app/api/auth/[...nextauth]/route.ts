// here, app/auth/Provider = wrapper VS app/api/auth/[...nextauth]/NExtAuth object {Google provider}

import prisma from '@/prisma/client' // "prisma" showed up by default bcz we've 1 single global instance of it
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

// currently only 1 auth options = sign in with Google
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // clientID won't accept undefined but process.env may return undefined, hence typesetting needed
      // ! - tells the TS compiler that we have definitely provided a value to it (hence, cannot be undefined with us)
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  // debug: true,
}
// providers: [] = Authentication options provided to the user
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
// the same handler fn. is being exported as 2 different names: GET and POST
