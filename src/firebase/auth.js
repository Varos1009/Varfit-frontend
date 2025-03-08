import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signOut as firebaseSignOut } from "firebase/auth";

// Register a new user with email and password
export const Register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    localStorage.setItem("userId", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Login with email and password
export const Login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Get the user object
    localStorage.setItem("userId", user.uid); // Store userId in localStorage
    return user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // Get the user object

    // Store userId in localStorage after Google login
    localStorage.setItem("userId", user.uid);

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Log out and remove userId from localStorage
export const Logout = async () => {
  try {
    await firebaseSignOut(auth); // Sign out of Firebase
    localStorage.removeItem("userId"); // Remove userId from localStorage
  } catch (error) {
    console.error("Logout Error:", error);
    throw error; // Handle error in the component
  }
};
