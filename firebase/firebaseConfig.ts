import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBvQrJhQDXoJMn4iHNoOhfSwLYPqJSHLxI",
    authDomain: "onfix-sistema.firebaseapp.com",
    projectId: "onfix-sistema",
    storageBucket: "onfix-sistema.firebasestorage.app",
    messagingSenderId: "404788285688",
    appId: "1:404788285688:web:42c4ab0ab27137bbe7eb0d"
};


const app = initializeApp(firebaseConfig);
export const Auth_Firebase = getAuth(app)
