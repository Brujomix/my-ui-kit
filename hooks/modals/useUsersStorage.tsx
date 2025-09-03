import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserApp = {
    user : any
    rol?: string
}

type UserStorageProps = {
    currentUser: UserApp | null,
    logIn: (user : UserApp) => void
    logOut: () => void
}

export const useUsersStorage = create<UserStorageProps>()(
  persist(
    (set) => ({
      currentUser: null,
      logIn: (user) => set({ currentUser: user }),
      logOut: () => {
        localStorage.removeItem("user-storage");
        set({ currentUser: null });
      },
    }),
    {
      name: "user-storage",
    }
  )
)