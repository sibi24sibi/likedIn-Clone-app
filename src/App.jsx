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
import { auth } from "./Firebase";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import HomePage from "./Pages/HomePage";
import JobDetail from "./Components/JobDetail";
import { AuthProvider } from "./Api/AuthApi";
import Home from "./Pages/HomePage";
import ProfileSection from "./Components/ProfileSection";
import ProfileForm from "./Components/ProfileForm";
import JobModel from "./Components/JobModel";

// Initialize Firebase Authentication

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Simplified setting user
      setLoading(false); // Once auth state is known, set loading to false
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
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
    <AuthProvider>
      <Router>
        <Header />
        <div className="App">
          {user ? (
            <Routes>
              <Route path="/home" element={<HomePage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/signin" element={<SigninForm />} />
              <Route path="/user-profile" element={<ProfileSection />} />
              <Route path="/profile" element={<ProfileSection />} />
              <Route path="/jobs" element={<JobModel />} />
              <Route path="*" element={<Navigate to="/signin" />} />
            </Routes>
          )}
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
