import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signOut as firebaseSignOut } from "firebase/auth";


export const Register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await firebaseSignOut(auth);
    return userCredential.user; 
};

export const  Login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
}


export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in:", result.user);
        return result.user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
};
  

export const Logout = async () => {
    return await auth.signOut();
};




