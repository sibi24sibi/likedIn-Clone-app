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
import { app } from "../Firebase"; // Make sure to adjust the import according to your file structure

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(""); // Handle error messages
  const [successMessage, setSuccessMessage] = useState(""); // Handle success messages
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(""); // Clear previous errors
      setSuccessMessage("Login successful!"); // Set success message
    } catch (error) {
      setError("Email and Password do not match."); // Set the error message
      setSuccessMessage(""); // Clear success message
    }
  };

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(""); // Clear previous errors
      setSuccessMessage("Account created successfully!"); // Set success message
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError(
          "This email is already in use. Please try signing in or use a different email."
        );
      } else {
        setError("Error creating user: " + error.message);
      }
      setSuccessMessage(""); // Clear success message
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in success: ", result.user);
      setError(""); // Clear previous errors
      setSuccessMessage("Google sign-in successful!"); // Set success message
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setError("Failed to sign in with Google. Try again."); // Set the error message
      setSuccessMessage(""); // Clear success message
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSuccessMessage("Logged out successfully!"); // Set success message
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent. Check your inbox.");
      setError("");
    } catch (error) {
      setError("Failed to send password reset email. Try again.");
      setSuccessMessage("");
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
        sendPasswordResetEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
