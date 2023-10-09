import UserTable from './UserTable'

const UsersPage = () => {
  return (
    <>
      {/* <p>{new Date().toLocaleTimeString()}</p> */}
      <h1>User names below:</h1>
      <UserTable />
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
