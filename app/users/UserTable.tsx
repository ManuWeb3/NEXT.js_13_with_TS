// fetch users data from the fake API here in the "users/page.tsx" => fetch() will come here
// if multiple files use "interface User", then this will be kept in a different file and imported elsewhere
interface User {
  id: number
  name: string
  email: string
}

const UserTable = async () => {
  // API call here, outside return <></>
  // API call won't be rendered
  // the data fetched from the API call is rendered => inside return<></>
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  })
  const users: User[] = await res.json()

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Id</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
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
