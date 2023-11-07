// import middleware from 'next-auth/middleware' // not needed ideally, because export {default}
// import { NextRequest, NextResponse } from 'next/server' // not needed ideally, needed only for our custom definition.

/*
import middleware from 'next-auth/middleware'
// no need to define your own middleware fn. now. + auto-redirects us to the login page
export default middleware
*/

/*
// middleware = convention
export function middleware(request: NextRequest) {
  // idealy, this should check user's session and redirect,
  // if it's trying to access a private page without session (already doen in NextAuth demo)
  return NextResponse.redirect(new URL('/new-page', request.url))
}
*/

// default - execute middleware at every request = NOT ideal
// execute only at select requests (array - paths)

// =====================================================================
export { default } from 'next-auth/middleware'

// config  = convention
export const config = {
  // * = zero / more parameters after users slug
  // + = 1 or more
  // ? = 0 or 1
  // ['/users/:id123+]
  matcher: ['/dashboard/:path+'], // though dashboard does not exist
  // IDEALLY, matcher: ['/dashboard/:path*] => dashboard inclusive (*), then any path ahead of it.
  // "path" / "id" is NO convetion
}
