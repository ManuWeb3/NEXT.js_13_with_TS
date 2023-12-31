import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import prisma from '@/prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Option: 1 Signin with Credentials
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'name@domain.com' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },

      // until, we return a user, authorize() will throw a type-not-assignable-mismatch error - last line
      async authorize(credentials, req) {
        // Check # 1: (SCHEMA/FORMAT CHECK)
        // If any of the input cred. are falsy, return null
        // no need for Zod here as it'll be anyway shunted out for an invalid/falsy values
        if (!credentials?.email || !credentials.password) return null
        // null returned, user will be redirected to a built-in error page
        // http://localhost:3000/api/auth/signin?error=CredentialsSignin -> error msg display above signin form

        // Check # 2 (part 1): (PRESENCE of user CHECK)
        // creds. valid per syntax (not per DB for now - part 2 of check # 2)
        // BUT does any user exist?
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        // Check # 2 (part 2):
        if (!user) return null

        // Check # 3: (COMPARE PASSWORDS)
        // Finally, check if password matches with the email id supplied and verified = present in our DB
        // Library - bcrypt
        const passwordsMatched = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        )
        // by this time, we're sure that password is Not falsy => !
        return passwordsMatched ? user : null
      },
    }),
    // array for multiple options to signin

    // Option # 2: Signin with Google
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
