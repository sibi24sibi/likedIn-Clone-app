import { useEffect, useState } from "react";
import TopNav from "../Components/top-nav";
import Sidebar from "../Components/sidebar";
import ActiveFriends from "../Components/ActiveFriends";
import MobileNavbar from "../Components/mobile-navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import FeedPage from "./feed";
import ProfilePage from "./profile-page";
import FriendsPage from "./friends-page";
import MessagesPage from "./MessagePage";
import NotificationsPage from "./app_notifications_noficiation-page";
import { listenToAllPosts } from "../Api/UploadApi";
import ChatPage from "./ChatPage";

export function Layout() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);



  return (
    <div className="min-h-screen   bg-gray-50 dark:bg-gray-900">
      <TopNav isDark={isDark} setIsDark={setIsDark} />
      <div className="container mx-auto   lg:px-4 flex flex-col md:flex-row gap-6  py-2 lg:py-6">
        <Sidebar className="hidden md:block w-64 flex-shrink-0" />
        <main className="flex-1 max-w-4xl md:mx-auto md:mr-6 mb-16 md:mb-0">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<FeedPage  />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/:id" element={<ChatPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile/*" element={<ProfilePage />} />
          </Routes>
        </main>
        <ActiveFriends className="hidden lg:block w-80 flex-shrink-0" />
      </div>
      <MobileNavbar />
    </div>
  );
}

export default Layout;
