import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfinitySpin } from "react-loader-spinner";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PostModel from "./Components/PostModel";
import ConnectModel from "./Components/ConnectModel";
import SigninForm from "./Components/SigninForm";
import SignupForm from "./Components/SignupForm";
import { app } from "./FIrebase"; // Ensure Firebase config is correct in this file
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Home from "./Pages/HomePage";

// Initialize Firebase Authentication
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Once auth state is known, set loading to false
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className=" flex items-center justify-center h-screen">
        <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    ); // Add a loading spinner or message if needed
  }

  return (
    <>
      <Router>
        <Header />
        <div className="App">
          {user ? (
            <Home user={user} signOut={signOut} auth={auth} />
          ) : (
            <Routes>
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/signin" element={<SigninForm />} />
              <Route path="*" element={<Navigate to="/signin" />} />{" "}
              {/* Redirect to signin if user not authenticated */}
            </Routes>
          )}
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
