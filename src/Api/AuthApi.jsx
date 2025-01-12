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
} from "firebase/auth";
import { app, firestore } from "../Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { allDefaultProfilePics, defaultProfile } from "../assets/assets";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const auth = getAuth(app);
  const navigate = useNavigate(); 

  const randomNum = Math.floor(Math.random() * 49) + 1;
  const generateRandomProfilePic = `https://avatar.iran.liara.run/public/${randomNum}`;
 

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
       
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());  
        }
      } else {
        setCurrentUser(null);
        setUserData(null);  
        console.log("User signed out");
      }
      setIsLoading(false);
      
    });

  
    return () => unsubscribe();
  }, [auth]);



  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/home");

    } catch (err) {
      toast.error(err.message || "Login failed.");
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(firestore, "users", user.uid), {
        name: displayName,
        email: email,
        userID: user.uid,
        profilePic: generateRandomProfilePic || defaultProfile,
      });

      toast.success("Account created successfully!");
      navigate("/home");

    } catch (err) {
      toast.error(err.message || "Signup failed.");

    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;


      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (!userDoc.exists()) {
        
        
        await setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName || "Unknown User",
          email: user.email,
          userID: user.uid,
          profilePic: generateRandomProfilePic,
        });
      }

      toast.success("Logged in with Google successfully!");
      navigate("/home");

    } catch (err) {
      toast.error(err.message || "Google login failed.");

    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Logout failed.");
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully!");

    } catch (err) {
      toast.error(err.message || "Failed to send password reset email.");

    }
  };





  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
        login,
        isLoading,
        signup,
        signInWithGoogle,
        logout,
        sendPasswordResetEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);