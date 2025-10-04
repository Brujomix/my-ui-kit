import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

type UserApp = {
  user: any
  rol?: string
}

type UserStorageProps = {
  currentUser: UserApp | null
  logIn: (user: UserApp) => void
  logOut: () => void
}

const UsersStorageContext = createContext<UserStorageProps | undefined>(undefined)

export const UsersStorageProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserApp | null>(() => {
    const stored = localStorage.getItem('user-storage')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user-storage', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('user-storage')
    }
  }, [currentUser])

  const logIn = useCallback((user: UserApp) => {
    setCurrentUser(user)
  }, [])

  const logOut = useCallback(() => {
    setCurrentUser(null)
  }, [])

  return (
    <UsersStorageContext.Provider value={{ currentUser, logIn, logOut }}>
      {children}
    </UsersStorageContext.Provider>
  )
}

export function useUsersStorage () {
  const ctx = useContext(UsersStorageContext)
  if (!ctx) throw new Error('useUsersStorage must be used within a UsersStorageProvider')
  return ctx
}
