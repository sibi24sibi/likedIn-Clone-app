import { Watch } from "react-loader-spinner";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useAuth } from "./Api/AuthApi";

import LandingPage from "./Pages/LandingPage";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import SignupForm from "./Components/SignupForm";
import SigninForm from "./Components/SigninForm";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import ErrorPage from "./Pages/ErrorPage";
import FeedPage from "./new-pages/feed";
import MobileNavbar from "./New-components/mobile-navbar";
import TopNav from "./New-components/top-nav";
import { useEffect, useState } from "react";
import SuggestedFriends from "./New-components/suggested-friends";
import Sidebar from "./New-components/sidebar";
import ProfilePage from '@pages/profile-page';
import FriendsPage from '@pages/friends-page';
import NotificationsPage from "./new-pages/app_notifications_noficiation-page";
import MessagesPage from "./new-pages/app_messages_message-page";
import ChatPage from "./new-pages/app_messages_[id]_sub-message-page";
import Layout from "./new-pages/layout";

function App() {
  const { user, mainLoading, } = useAuth();

  const [isDark, setIsDark] = useState(false)

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

        {user ? (
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
