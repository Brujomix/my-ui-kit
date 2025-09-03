import { useNavigate } from "react-router-dom";
import { Auth_Firebase } from "../../firebase/firebase-config";
import { useUsersStorage } from "./useUsersStorage"
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

type UserCredentials = {
    email: string
    password: string
}

export function useAuth() {

    const navigate = useNavigate()

    const { currentUser, logIn, logOut } = useUsersStorage()

    const logOutFirebase = () => {
        signOut(Auth_Firebase)
        logOut()
        navigate("/login")
    }

    const LoginFirebase = async (credentialsUser: UserCredentials) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                Auth_Firebase,
                credentialsUser.email,
                credentialsUser.password
            );

            logIn(userCredential);
            
            if(userCredential.user.emailVerified){
                return {message: "Verified"}
            }

            return {message : "UnVerified"}
            
        } catch (error: any) {
            console.error(error);
            return {message : "Credenciales Erroneas"}
        }
    };



    return { LoginFirebase, logOutFirebase, currentUser }
}