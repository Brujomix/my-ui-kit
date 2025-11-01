const filterStringText = (text: string) => {
  return text.slice(0, 2).toUpperCase()
}

type AvatarClientProps<T> = {
  user: T
  keyField: keyof T
  imageUrl?: keyof T
}

export function AvatarCircle<T> ({
  user,
  keyField,
  imageUrl,
}: AvatarClientProps<T>) {
  return (
    <div className='w-fit text-md rounded-full border p-3 bg-gray-600 border-gray-600'>
      {imageUrl
        ? (
          <img src={String(user[imageUrl])} alt='Imagen Perfil usuario' />
          )
        : (
          <span className='font-bold'>
            {filterStringText(String(user[keyField]))}
          </span>
          )}
    </div>
  )
}
