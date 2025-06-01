import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
    displayName: string
    email: string
    rol: string
}

type UserStorageProps = {
    currentUser: User | null,
    logIn: (user : User) => void
    logOut: () => void
}

export const useUsersStorage = create<UserStorageProps>()(
  persist(
    (set) => ({
      currentUser: null,
      logIn: (user) => set({ currentUser: user }),
      logOut: () => set({ currentUser: null }),
    }),
    {
      name: "user-storage",
    }
  )
)