import { Watch } from "react-loader-spinner";
import { Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "./Api/AuthApi";

import LandingPage from "./Pages/LandingPage";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import SignupForm from "./Pages/SignupForm";
import SigninForm from "./Pages/SigninForm";
import ForgotPasswordForm from "./Pages/ForgotPasswordForm";
import ErrorPage from "./Pages/ErrorPage";

import { useEffect, useState } from "react";

import Layout from "./Pages/layout";

function App() {
  const { currentUser, mainLoading, } = useAuth();


  const [isDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])


  // Handle loading state
  if (mainLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Watch visible={true} width="200" color="#4fa94d" />
      </div>
    );
  }




  return (
    <>


      <Routes>

        {currentUser ? (
          <>
            <Route path="*" element={<Layout />} />
          </>
        ) : (
        

            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/signin" element={<SigninForm />} />
              <Route path="/forgot" element={<ForgotPasswordForm />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>

          
        )}
        {/* Fallback Error Page */}
        <Route path="/error" element={<ErrorPage />} />
      </Routes>

    </>

  );
}

export default App;
