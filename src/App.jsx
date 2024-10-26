import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Watch } from "react-loader-spinner";
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
import HomePage from "./Pages/HomePage";
import ProfileSection from "./Components/ProfileSection";
import JobModel from "./Components/JobModel";
import JobForm from "./Components/JobForm";
import JobPage from "./Pages/JobPage";
import { ErorPage } from "./Pages/ErorPage";
import { AuthProvider, useAuth } from "./Api/AuthApi";
import { NetworkPage } from "./Pages/NetworkPage";
import { ProfilePage } from "./Pages/ProfilePage";
import JobDetail from "./Components/JobDetail";

// Initialize Firebase Authentication
function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { user, loading } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Show a loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen min-h-screen max-h-screen">
        <Watch
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <div className=" min-w-full  ">
      <Router>
        <Header />
        <div className="App  min-h-screen   ">
          <Routes>
            {user ? (
              <>
                {/* Authenticated Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/jobs" element={<JobPage />} />
                <Route
                  path="/jobs/:id"
                  element={isMobile ? <JobDetail /> : <JobPage />}
                />
                <Route path="/postJob" element={<JobForm />} />
                <Route path="/connect" element={<NetworkPage />} />
                <Route path="/signin" element={<Navigate to="/home" />} />
                <Route path="/signup" element={<Navigate to="/home" />} />
                <Route path="/error" element={<ErorPage />} />
                <Route path="*" element={<Navigate to="/error" />} />
              </>
            ) : (
              <>
                {/* Unauthenticated Routes */}
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/error" element={<ErorPage />} />
                <Route path="*" element={<Navigate to="/error" />} />
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="/home" element={<Navigate to="/signin" />} />
                <Route path="/profile" element={<Navigate to="/signin" />} />
                <Route path="/jobs" element={<Navigate to="/signin" />} />
                <Route path="/postJob" element={<Navigate to="/signin" />} />
                <Route path="/connect" element={<Navigate to="/signin" />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
