import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'

// by default, user will be landed at this Home page
// Home word has nothing to do with this.
// basically, App folder-page.tsx is the Default landing page.
export default function Home() {
  return (
    <main>
      <h1>Han bai, Ki Banda fir...</h1>
      <Link href="./users">Users</Link>
      <ProductCard />
    </main>
  )
}
// replacing <a> with <Link> results in loading just thye content of Users-page.tsx
// not the entire font/css/scripts as it's NOT the apt way.
// CLient-side Navigation
