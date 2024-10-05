import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../Firebase"; // Ensure Firebase is initialized here.

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Logged in successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Account created successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage("Logged in with Google successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSuccessMessage("Logged out successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        signInWithGoogle,
        logout,
        error,
        setError,
        successMessage,
        resetMessage,
        sendPasswordResetEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
