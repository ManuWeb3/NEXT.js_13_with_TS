import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import googleImage from '@/public/images/googleImage.png'
import { Metadata } from 'next'

// by default, user will be landed at this Home page
// Home word has nothing to do with this.
// basically, App folder-page.tsx is the Default landing page.
export default async function Home() {
  // access authentication-sessions on the Server - getServerSession(authOptions obj. passed here)
  // authOptions - the same that got passed in NextAuth object in [...nextauth]
  const session = await getServerSession(authOptions)
  // getServerSession() works both in the pages and routes

  return (
    <main className="relative h-screen">
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="./users">Users</Link>
      <ProductCard />

      {/* <Image src={googleImage} alt="Google" priority></Image>
      <Image
        src="https://www.gstatic.com/webp/gallery/1.webp"
        alt="Google Logo"
        // width={300}  // approiach # 1: fixed-sized
        // height={170}
        fill // approach # 2: responsive sizes across all devies + when the width and height are unknown.
        // style={{ objectFit: 'cover' }} // approach # 2(1): using inline styling
        // style={{ objectFit: 'contain' }}
        className="object-cover" // approach # 2(2) - using Tailwind
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        // if single column on a desktop, it won't be 33%
        // it'll still be 100%.
        // to render 33%, there have to be like 3 columns-grid on the viewport for 1/3
        quality={100} // The quality of the optimized image, an integer between 1 and 100, where 100 is the best quality and therefore largest file size. Defaults to 75
        priority // default - true (bool). If an image must appear from the get go, then use it else lazy loading
      ></Image> */}
    </main>
  )
}
// replacing <a> with <Link> results in loading just thye content of Users-page.tsx
// not the entire font/css/scripts as it's NOT the apt way.
// CLient-side Navigation

// This local MD overrides the global one in RootLayout, for this specific page
export const metadata: Metadata = {
  title: '...',
}

// DYNAMIC Metadata
export async function generateMetadata(): Promise<Metadata> {
  const product = await fetch('') // from an API Or from DB using Prisma - network include - hence - async/await
  const productJS = await product.json()

  return {
    // destructured object of type Metadata
    title: 'product.title', // ideally, not a string, will have some value = title of product
  }
}

/*
priority:
When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.

You should use the priority property on any image detected as the Largest Contentful Paint (LCP) element. It may be appropriate to have multiple priority images, as different images may be the LCP element for different viewport sizes.

Should only be used when the image is visible above the fold. Defaults to false.
*/
