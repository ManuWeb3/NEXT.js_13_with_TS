// example of searchParams
interface Props {
  params: { slug: string[] }
  searchParams: { sortOrder: string }
}

const page = ({ params: { slug }, searchParams: { sortOrder } }: Props) => {
  return (
    <div>
      Products -- {slug} {sortOrder}
    </div>
  )
}
export default page
