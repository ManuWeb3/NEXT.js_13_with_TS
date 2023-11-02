import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

// by default, user will be landed at this Home page
// Home word has nothing to do with this.
// basically, App folder-page.tsx is the Default landing page.
export default async function Home() {
  // access authentication-sessions on the Server - getServerSession(authOptions obj. passed here)
  // authOptions - the same that got passed in NextAuth object in [...nextauth]
  const session = await getServerSession(authOptions)
  // getServerSession() works both in the pages and routes

  return (
    <main>
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="./users">Users</Link>
      <ProductCard />
    </main>
  )
}
// replacing <a> with <Link> results in loading just thye content of Users-page.tsx
// not the entire font/css/scripts as it's NOT the apt way.
// CLient-side Navigation
