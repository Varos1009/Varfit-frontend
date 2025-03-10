import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig"; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const userLoggedIn = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, userLoggedIn }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
