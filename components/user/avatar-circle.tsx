
const filterStringText = (text: string) => {
  return text.slice(0, 2).toUpperCase();
};

type AvatarClientProps<T> = {
  user: T;
  keyField: keyof T;
  imageUrl?: keyof T;
};

export function AvatarCircle<T>({
  user,
  keyField,
  imageUrl,
}: AvatarClientProps<T>) {
  return (
    <div className="text-3xl">
        {imageUrl ? (
          <img src={String(user[imageUrl])} alt="Imagen Perfil usuario" />
        ) : (
          <span className="font-bold">
            {filterStringText(String(user[keyField]))}
          </span>
        )}
    </div>
  );
}
