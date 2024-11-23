import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { app, firestore } from "../Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { allDefaultProfilePics, defaultProfile } from "../assets/assets";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const env = import.meta.env.VITE_APP_PRODUCTION

  const auth = getAuth(app);
  const navigate = useNavigate(); // Initialize useNavigate

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setResetMessage("");
      setError("");
    }, 3000);
  };

  // Function to fetch user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        setError("User data not found.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        await fetchUserData(user.uid);

      } else {
        setUser(null);
        setUserData(null);

      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);


  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;


      if (env === "production") {

        await sendEmailVerification(user);
        setDisplayName(displayName)
        setSuccessMessage("Signup successful! A verification email has been sent to your email address.");
      } else {

        const randomProfilePic = allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)];

        await setDoc(doc(firestore, "users", user.uid), {
          name: displayName,
          email: email,
          userID: user.uid,
          profilePic: randomProfilePic || defaultProfile,
        });

        setSuccessMessage("Signup successful, and your account has been created.");

      }

      clearMessages();
    } catch (err) {
      setError(err.message || "Signup failed.");
      clearMessages();
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (env === "production") {
        // In production, enforce email verification
        if (!user.emailVerified) {
          setError("Your email is not verified. Please verify your email before logging in.");
          clearMessages();
          return;
        } else {

          const randomProfilePic = allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)];

          await setDoc(doc(firestore, "users", user.uid), {
            name: displayName,
            email: email,
            userID: user.uid,
            profilePic: randomProfilePic || defaultProfile,
          });

        }
      }

      setSuccessMessage("Logged in successfully!");
      navigate("/home");
      clearMessages();
    } catch (err) {
      setError(err.message || "Login failed.");
      clearMessages();
    }
  };


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;


      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (!userDoc.exists()) {
        const randomProfilePic = allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)];

        await setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName || "Unknown User",
          email: user.email,
          userID: user.uid,
          profilePic: randomProfilePic,
        });
      }

      setSuccessMessage("Logged in with Google successfully!");
      navigate("/home");
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
      navigate("/");
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


  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


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
        isMobile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
