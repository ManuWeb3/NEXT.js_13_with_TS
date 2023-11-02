// global.css stylesheet imported, to apply the styles to every route ({children}) in your application
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import { Suspense } from 'react'
// import { SessionProvider } from 'next-auth/react' - use AuthProvider123 wrapper instead
import AuthProvider123 from './auth/Provider'
// bcz using <SessionProvider> directly in RootLayout will cause errors

const inter = Inter({ subsets: ['latin'] })

// attempting to export "metadata" from a component marked with "use client" is disallowed.
// Either remove the export, or the "use client" directive.
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="winter" lang="en">
      <body className={inter.className}>
        <AuthProvider123>
          <NavBar />
          <main className="p-5">
            {children}
            {/* <Suspense fallback={<p>Loading...</p>}>{children}</Suspense> */}
          </main>
        </AuthProvider123>
      </body>
    </html>
  )
}

// "children" gets replaced by the run time pages depending upon where the user is at Runtime.
