import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from "firebase/auth";
import { app, firestore } from "../Firebase"; // Ensure Firebase is initialized here.
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [currentUserDetails, setCurrentUserDetails] = useState(null);

  const auth = getAuth(app);

  const userData = user
    ? {
        userID: user.uid,
        name: user.displayName,
        email: user.email,
        role: "unknown", 
        phone: "unknown", 
      }
    : null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user
      setLoading(false); // Once auth state is known, set loading to false
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Logged in successfully!");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user object
      const user = userCredential.user;

      // Update the user's profile with displayName
      await updateProfile(user, { displayName });

      const userData = {
        userID: user.uid,
        name: displayName,
        email: email,
      };

      // Save the user data to Firestore
      await setDoc(doc(firestore, "users", user.uid), userData); // 'users' is the collection name

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
        loading,
        signup,
        signInWithGoogle,
        logout,
        error,
        setError,
        successMessage,
        resetMessage,
        sendPasswordResetEmail,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
