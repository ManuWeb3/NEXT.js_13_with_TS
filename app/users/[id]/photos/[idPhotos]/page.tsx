interface Props {
  params: { id: number; idPhotos: number }
}

const page = ({ params: { id, idPhotos } }: Props) => {
  return (
    <div>
      At Dynamic Route # {idPhotos} inside Photos, inside users # {id}
    </div>
  )
}
export default page
