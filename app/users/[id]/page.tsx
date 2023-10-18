import { notFound } from 'next/navigation'

interface Props {
  params: { id: number }
}
// only "params" is a keyword here
// [_name] MUST be same as params: { [_name]: number }

// destructured original param "props" at double level here -->> { params: { id }
const page = ({ params: { id } }: Props) => {
  if (id > 10) notFound() // by default, it redirects to not-found.tsx in our app
  return <div>UserId entered in URL: {id}</div>
}
export default page
