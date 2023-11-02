import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      // clientID won't accept undefined but process.env may return undefined, hence typesetting needed
      // ! - tells the TS compiler that we have definitely provided a value to it (hence, cannot be undefined with us)
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
// the same handler fn. is being exported as 2 different names: GET and POST
