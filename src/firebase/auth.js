import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const Register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await signOut(auth);
    return userCredential.user; 
};

export const  Login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
}


export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
};

export const signOut = async () => {
    return await auth.signOut();
};




