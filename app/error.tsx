'use client'

import { resolveTypeReferenceDirective } from 'typescript'

// why we made this a 'use client' component => due to reset()

interface Props {
  error: Error
  reset: () => void
}
// next.js automatically pass Error object to this component due to "Error" in the Props

const ErrorPage = ({ error, reset }: Props) => {
  console.log(`Error: ${error}`)

  return (
    <>
      <div>An Unexpected Error Has Occured</div>
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
    </>
  )
}
export default ErrorPage
