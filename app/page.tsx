import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import googleImage from '@/public/images/googleImage.png'

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
      <Image src={googleImage} alt="Google"></Image>
      <Image
        src="https://www.google.ca/search?q=google+logo&sca_esv=580323760&tbm=isch&sxsrf=AM9HkKmrHzSDqvxLXViAhIR8DSDuva_IdQ%3A1699409704067&source=hp&biw=1536&bih=695&ei=J-9KZdLNN73k0PEP5cOiwAU&iflsig=AO6bgOgAAAAAZUr9ODkDxhk58uQSBBL98sxlwbuAEaB3&ved=0ahUKEwiS_eq9qrOCAxU9MjQIHeWhCFgQ4dUDCAc&uact=5&oq=google+logo&gs_lp=EgNpbWciC2dvb2dsZSBsb2dvMggQABiABBixAzIIEAAYgAQYsQMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEjDI1D5B1itIHACeACQAQCYAdIBoAHuCaoBBTguMy4xuAEDyAEA-AEBigILZ3dzLXdpei1pbWeoAgrCAgcQIxjqAhgnwgIEECMYJw&sclient=img#imgrc=2FEMalISLOerzM"
        alt="Google Logo"
      ></Image>
    </main>
  )
}
// replacing <a> with <Link> results in loading just thye content of Users-page.tsx
// not the entire font/css/scripts as it's NOT the apt way.
// CLient-side Navigation
