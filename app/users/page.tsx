// actual implementation of searchParams
import UserTable from './UserTable'

interface Props {
  searchParams: { sortOrder: string }
}

// captured at the page level (above) + passed into the Component (below)
const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  console.log(sortOrder)
  return (
    <>
      {/* <p>{new Date().toLocaleTimeString()}</p> */}
      <h1>User Names below:</h1>
      <p>Sorted as: {sortOrder}</p>
      <UserTable sortOrder={sortOrder} />
    </>
  )
}
export default UsersPage

// the name of the component has no bearing on the redering of the component

// export default function () {
//   return <div>Users' Page</div>
// }

// global.css' body styling applies to all the pages routed, by default

// <thead> optional - w3schools.com
