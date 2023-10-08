// fetch users data from the fake API here in the "users/page.tsx" => fetch() will come here

interface User {
  id: number
  name: string
}

const UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  })
  const users: User[] = await res.json()
  // API call here, outside return <></>
  // API call won't be rendered
  // the data fetched from the API call is rendered => inside return<></>
  return (
    <>
      <p>{new Date().toLocaleTimeString()}</p>
      <h1>User names below:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}
export default UsersPage

// the name of the component has no bearing on the redering of the component

// export default function () {
//   return <div>Users' Page</div>
// }

// global.css' body styling applies to all the pages routed, by default
