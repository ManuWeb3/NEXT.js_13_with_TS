// Accessing authentication sessions on the Client
'use client'
// due to useSession() below + using a React Hook => it's a client component
// Though 'use client' directive is NOT mandatory as no browser interaction is happening with user - later - details

// all children (Home/Admin/Users) will be loaded in {children} underneath the NavBar
// Location => Ordering
// Link = Client-side nav happening on the server side
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Loading from './loading'

const NavBar = () => {
  // IMP - session is used in NavBar and at client side. There exactly we'll show the logged in user's name
  const { data: session, status } = useSession()
  // exists even if there is no session.
  // That's how we get loading = 'unauthenticated' and render "Login"

  // if-else conditional inside a component
  /*
  if (status === 'loading') return null 
  neither auth, not UNauth, somewhere in the middle = null
  */

  // else return below
  return (
    <div className="flex bg-blue-100 p-5 space-x-3">
      <Link href="/" className="mr-5">
        Home
      </Link>
      <Link href="/admin" className="mr-5">
        Admin
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>

      {/* {status === 'loading' && <Loading />}
      {status === 'authenticated' && <div>{session.user!.name}</div>}
      {status === 'unauthenticated' && (
        <Link href="/api/auth/signin" className="mr-5">
          Login
        </Link>
      )} */}

      {status === 'loading' ? (
        <Loading />
      ) : status === 'authenticated' ? (
        <>
          <div>{session.user!.name}</div>
          <Link href="./api/auth/signout">Sign Out</Link>
        </>
      ) : status === 'unauthenticated' ? (
        <Link href="/api/auth/signin" className="mr-5">
          Login
        </Link>
      ) : null}
    </div>
  )
}
export default NavBar

// "signin" inside "/api/auth/signin" is provided by NextAuth.js

/*
useSession()
Client Side: Yes
Server Side: No
The useSession() React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.
useSession() returns an object containing two values: data and status:

data: This can be three values: Session / undefined / null.
when the session hasn't been fetched yet, data will be undefined
in case it failed to retrieve the session, data will be null
in case of success, data will be Session.
status: enum mapping to three possible session states: "loading" | "authenticated" | "unauthenticated"
*/

/*
though user property is optional in session.user but when authenticated, definitely a user! is there.
*/
