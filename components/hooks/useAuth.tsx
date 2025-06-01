import { useUsersStorage } from "./useUsersStorage"

export function useAuth() {

    const {currentUser, logIn, logOut} = useUsersStorage()

    
    return {logIn, logOut, currentUser}
}