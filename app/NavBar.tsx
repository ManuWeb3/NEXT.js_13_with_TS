// all children (Home/Admin/Users) will be loaded in {children} underneath the NavBar
// Location => Ordering
// Link = Client-side nav happening on the server side
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="flex">
      <Link href="/" className="mr-5">
        Home
      </Link>
      <Link href="/admin" className="mr-5">
        Admin
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
    </div>
  )
}
export default NavBar
