import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ConnectModel from "./Components/ConnectModel";
import SigninForm from "./Components/SigninForm";
import SignupForm from "./Components/SignupForm";
import { app } from "./FIrebase"; // Ensure Firebase config is correct in this file
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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
    return <div>Loading...</div>; // Add a loading spinner or message if needed
  }

  return (
    <>
      <Router>
        <Header />
        <div className="App">
          {user ? (
            <>
              <h1>Hello, {user.email}</h1>
              <button onClick={() => signOut(auth)}>Logout</button>
            </>
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
