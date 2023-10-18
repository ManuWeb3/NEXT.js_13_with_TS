import { ReactNode } from 'react'

// all {children} of this layout.tsx component MUST be of type ReactNode (it's TS, dude!)
interface Props {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="bg-green-200 p-5 mr-5">Admin Sidebar</aside>
      <div className="p-2">{children}</div>
    </div>
    // aside = semantic tag in HTML
  )
}
export default AdminLayout
