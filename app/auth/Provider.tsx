// here, app/auth/Provider = wrapper VS app/api/auth/[...nextauth]/NExtAuth object {Google provider}

'use client'
// no Metadata here unlike RootLayout, hence 'use client' works fine
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

// Destructured the object to tis "children" property
// AuthProvider123 acted as a wrapper around <SessionProvider> here
// using <SessionProvider> directly in RootLayout will cause errors
const AuthProvider123 = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider123
