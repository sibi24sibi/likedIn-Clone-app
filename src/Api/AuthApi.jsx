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
  updateProfile,
} from "firebase/auth";
import { app, firestore } from "../Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { allDefaultProfilePics, defaultProfile } from "../assets/assets";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mainLoading, setMainLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const env = import.meta.env.VITE_APP_PRODUCTION

  const auth = getAuth(app);
  const navigate = useNavigate();


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

      if (user) {
        if (!user.emailVerified) {

          setUser(null);
        } else {
          setUser(user);
          await fetchUserData(user.uid);
        }
      } else {
        setUser(null);
        setUserData(null);
        console.log("User signed out");
      }


      setMainLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);



  const signup = async (email, password, displayName) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const randomProfilePic = allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)];

      const user = userCredential.user;
      if (env === "production") {

        await sendEmailVerification(user);

        toast.success("Signup successful! Please verify your email.");

        await updateProfile(user, {
          displayName: displayName,
          photoURL: randomProfilePic,
        })

        setUser(null);

      } else {

        toast.success("Signup successful!");
        navigate("/home");

      }



    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        toast.warn("Email already in use. Please verify your email.");
      } else {
        toast.error(err.message || "Signup failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      if (env === "production") {
        if (!user.emailVerified) {
          toast.warn("Your email is not verified. Please verify your email before logging in.");
          setLoading(false);
          return;
        } else {
          await setDoc(doc(firestore, "users", user.uid), {
            name: user.displayName,
            email: email,
            userID: user.uid,
            profilePic: user.photoURL,
          });
          setLoading(false);
          navigate("/home");
        }
      } else {
        await setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName,
          email: email,
          userID: user.uid,
          profilePic: user.photoURL,
        });
        setLoading(false);
        navigate("/home");
      }

    } catch (err) {
      toast.error(err.message || "Login failed.");
    } finally {
      setLoading(false);
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
      setResetMessage("Password reset email sent successfully!");
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
        resetMessage,
        sendPasswordResetEmail,
        userData,
        isMobile,
        mainLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
