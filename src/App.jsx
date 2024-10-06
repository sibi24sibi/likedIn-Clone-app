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
import { onAuthStateChanged } from "firebase/auth";
import HomePage from "./Pages/HomePage";
import ProfileSection from "./Components/ProfileSection";
import JobModel from "./Components/JobModel";
import { AuthProvider } from "./Api/AuthApi";
import JobForm from "./Components/JobForm";
import JobPage from "./Pages/JobPage";
import { ErorPage } from "./Pages/ErorPage";

// Initialize Firebase Authentication
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user
      setLoading(false); // Once auth state is known, set loading to false
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show a loading spinner while authentication state is being determined
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
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Header user={user} />
        <div className="App min-h-screen">
          <Routes>
            {user ? (
              <>
                {/* Authenticated Routes */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfileSection />} />
                <Route path="/jobs" element={<JobPage />} />
                <Route path="/postJob" element={<JobForm />} />
                <Route path="/connect" element={<ConnectModel />} />
                <Route path="/signin" element={<Navigate to="/home" />} />
                <Route path="/error" element={<ErorPage />} />
                <Route path="*" element={<Navigate to="/error" />} />
              </>
            ) : (
              <>
                {/* Unauthenticated Routes */}
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/error" element={<ErorPage />} />
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="*" element={<Navigate to="/error" />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
