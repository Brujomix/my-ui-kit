import { RedirectLink } from "../tags/RedirectLink";

const filterStringText = (text: string) => {
  return text.slice(0, 2).toUpperCase();
};

type AvatarClientProps<T> = {
  user: T;
  keyField: keyof T;
  imageUrl?: keyof T;
  url: string;
  stateProp?: T;
};

export function Avatar_Circle<T>({
  user,
  keyField,
  url,
  imageUrl,
  stateProp,
}: AvatarClientProps<T>) {
  return (
    <RedirectLink
      stateProps={stateProp}
      url={url}
      className="rounded-full w-14 h-14 bg-lightGray text-darkBlue"
    >
     
        {imageUrl ? (
          <img src={String(user[imageUrl])} alt="Imagen Perfil usuario" />
        ) : (
          <span className="text-xl font-bold">
            {filterStringText(String(user[keyField]))}
          </span>
        )}
      
    </RedirectLink>
  );
}
