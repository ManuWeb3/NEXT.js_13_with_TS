interface Props {
  params: { slug: string[] }
  searchParams: { sortOrdering: string }
}

const page = ({ params: { slug }, searchParams: { sortOrdering } }: Props) => {
  return (
    <div>
      Products -- {slug} {sortOrdering}
    </div>
  )
}
export default page
