// fetch users data from the fake API here in the "users/page.tsx" => fetch() will come here
import Link from 'next/link'
import { sort } from 'fast-sort' // in the same file as UserTable with prop sortOrder

// if multiple files use "interface User", then this will be kept in a different file and imported elsewhere
interface User {
  id: number
  name: string
  email: string
}

interface Props {
  sortOrder: string
}

const UserTable = async ({ sortOrder }: Props) => {
  // API call here, outside return <></>
  // API call won't be rendered
  // the data fetched from the API call is rendered => inside return<></>
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  })
  const users: User[] = await res.json()

  // using sort(), not inPlaceSort(), so a new array is needed to sotre the returned sorted array
  const sortedUsers = sort(users).asc(
    sortOrder === 'email' ? (user) => user.email : (user) => user.name
  )
  // default/undefined sorting by name unless set to email
  // 2 arrow fns. passed as argument in asc()

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              {/* <Link> = client-side navigation BUT done on server */}
              {/* as opposed to a "Name"-Button-click which is all done on the client */}
              <Link href="/users?sortOrder=name">Name</Link>
            </th>
            <th>
              <Link href="/users?sortOrder=email">Email</Link>
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default UserTable
