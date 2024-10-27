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
import { setDoc, doc, getDoc } from "firebase/firestore";
import { allDefaultProfilePics } from "../assets/assets"; // Import correctly

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const auth = getAuth(app);

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setResetMessage("");
      setError("");
    }, 3000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData({
              userID: currentUser.uid,
              name: currentUser.displayName || "unknown",
              email: currentUser.email,
              role: "unknown",
              phone: "unknown",
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data.");
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Logged in successfully!");
      clearMessages();
    } catch (err) {
      setError(err.message || "Login failed.");
      clearMessages();
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      // Assign a random profile picture at the time of signup
      const randomProfilePic = allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)];

      const userData = {
        userID: user.uid,
        name: displayName,
        email: email,
        role: "unknown",
        phone: "unknown",
        profilePic: randomProfilePic,
      };

      await setDoc(doc(firestore, "users", user.uid), userData);

      setSuccessMessage("Account created successfully!");
      clearMessages();
    } catch (err) {
      setError(err.message || "Signup failed.");
      clearMessages();
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage("Logged in with Google successfully!");
      clearMessages();
    } catch (err) {
      setError(err.message || "Google login failed.");
      clearMessages();
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSuccessMessage("Logged out successfully!");
      clearMessages();
    } catch (err) {
      setError(err.message || "Logout failed.");
      clearMessages();
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent successfully!");
      clearMessages();
    } catch (err) {
      setError(err.message || "Failed to send password reset email.");
      clearMessages();
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
