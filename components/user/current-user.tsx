import { useAuth } from "../../hooks";

export function CurrentUser() {

  const { currentUser } = useAuth()

  return (
    <>
      {
        currentUser &&
        <div className="flex justify-center items-center gap-2">
          <div className="hidden md:block">
            {currentUser.user.photoURL
              ?
              <img src={currentUser.user.photoURL || ""} alt="Image Profile" />
              : <>A</>}
          </div>
       
            <p className="text-xs">{currentUser && currentUser.user.email}</p>

        </div>
      }
    </>
  );
}
