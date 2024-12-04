import  { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import toast from "react-hot-toast";
// import { toast } from "react-toastify";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mainLoading, setMainLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const env = import.meta.env.VITE_APP_PRODUCTION
  const auth = getAuth(app);
  const navigate = useNavigate();

  // Fetch user data from Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        toast.error("User data not found.");
      }
    } catch (err) {
      toast.error("Failed to load user data.");
    }
  };

  // Sync user data with Firestore
  const syncUserData = async (user) => {
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    if (!userDoc.exists()) {
      const randomProfilePic = allDefaultProfilePics?.length
        ? allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)]
        : defaultProfile;

      await setDoc(doc(firestore, "users", user.uid), {
        name: user.displayName || "Unknown User",
        email: user.email,
        userID: user.uid,
        profilePic: randomProfilePic,
      });
    }
  };

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified && env === "production") {
          toast.error("Please verify your email to access the application.", {
            icon: 'ℹ️',
          });
          setUser(null);
        } else {
          setUser(user);
          await fetchUserData(user.uid);
          navigate('/home')
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setMainLoading(false);
    });

    return () => unsubscribe();
  }, [auth, env]);

  // Sign up
  const signup = async (email, password, displayName) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const randomProfilePic = allDefaultProfilePics?.length
        ? allDefaultProfilePics[Math.floor(Math.random() * allDefaultProfilePics.length)]
        : defaultProfile;

      await updateProfile(user, {
        displayName: displayName,
        photoURL: randomProfilePic,
      });

      if (env === "production") {
        await sendEmailVerification(user);
        toast.success("Signup successful! Please verify your email.");
        setUser(null);
      } else {
        await syncUserData(user);
        toast.success("Signup successful!");
        navigate("/home");
      }
    } catch (err) {
      toast.error( "Signup failed.");
    } finally {
      setLoading(false);

    }
  };



  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (env === "production") {
        await user.reload();
        if (!auth.currentUser.emailVerified) {
          toast.error("Your email is not verified. Please verify it.", {
            icon: 'ℹ️',
          });
          setLoading(false);
          return;
        }
      }
      await syncUserData(user);
      toast.success("Login successful!");

    } catch (err) {
      toast.error( "Login failed.");
      
    } finally {
      setLoading(false);

    }
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await syncUserData(user);
      toast.success("Logged in with Google successfully!");
      navigate("/home");
    } catch (err) {
      toast.error( "Google login failed.");
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error( "Logout failed.");
    }
  };

  // Send Password Reset Email
  const sendPasswordResetEmail = async (email) => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent successfully!");
    } catch (err) {
      toast.error( "Failed to send password reset email.");
    }
  };

  // Handle resizing for `isMobile`
  useEffect(() => {
    const handleResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
