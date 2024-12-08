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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const auth = getAuth(app);
  const navigate = useNavigate(); // Initialize useNavigate



  // Function to fetch user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        toast.error("User data not found.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      toast.error("Failed to load user data.");
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
        console.log("User signed out");
      }
      setLoading(false);
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


      // const randomProfilePic = allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)];


      
      const randomNum = Math.floor(Math.random() * 16)+1;
      
      const randomProfilePic = `https://placeholder-image-ry0c.onrender.com/api/avatar?img=${randomNum}`;

      await setDoc(doc(firestore, "users", user.uid), {
        name: displayName,
        email: email,
        userID: user.uid,
        profilePic: randomProfilePic || defaultProfile,
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
        //  const randomProfilePic = allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)];

        const randomNum = Math.floor(Math.random() * 16)+1;

        const randomProfilePic = `https://placeholder-image-ry0c.onrender.com/api/avatar?img=${randomNum}`;


        await setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName || "Unknown User",
          email: user.email,
          userID: user.uid,
          profilePic: randomProfilePic,
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