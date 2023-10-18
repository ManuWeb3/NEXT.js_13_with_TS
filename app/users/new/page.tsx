'use client'
// import { useRouter } from 'next/router'
// because this will throw an error as this belongs to v12 (Pages router)
// use 'next/navigation' instead

import { useRouter } from 'next/navigation'
const NewUsersPage = () => {
  const router = useRouter()
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        router.push('/users')
      }}
    >
      Create
    </button>
  )
}
export default NewUsersPage
// The useRouter hook allows you to programmatically change routes inside Client Components.
