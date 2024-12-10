import { useState } from 'react';
import { MessageCircle, ThumbsUp, Bookmark } from 'react-feather';
import { Link, Navigate, Route, Routes } from 'react-router-dom'; // Use Link for navigation
import { MyPosts } from './My-posts';
import { Settingspage } from './Settings-page';

export default function ProfilePage() {
  // Sample state for notifications and darkMode
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Sample savedPosts data (you should replace this with your actual data)
  const savedPosts = [
    {
      id: 1,
      author: 'Jane Doe',
      timestamp: '1 day ago',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      profilePic: "https://i.pravatar.cc/150?img=63",
      likes: 10,
      comments: 5,
    },
    {
      id: 2,
      author: 'John Smith',
      timestamp: '3 hours ago',
      content: 'Quisque vel erat id nulla interdum.',
      profilePic: "https://i.pravatar.cc/150?img=23",
      likes: 15,
      comments: 3,
    },
  ];

  const MyFeedPost = [

    {
      id: 1,
      author: 'Robert Fox',
      timestamp: '3 hours ago',
      content: 'Quisque vel erat id nulla interdum.',
      profilePic: "https://i.pravatar.cc/150?img=3",
      likes: 15,
      comments: 3,
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
        <div className="px-8 pb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 -mt-16">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Robert Fox"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
            />
            <div className="text-center sm:text-left mt-4 sm:mt-16">
              <div className=" gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Robert Fox
                </h1>
                <p className="text-gray-500 dark:text-gray-400">@robert</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Software Engineer</p>
            </div>
            <div className="flex gap-6 ml-auto mt-4 sm:mt-16">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">12</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">207</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">64</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
           
            <Link to="/profile" className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-blue-400  dark:border-blue-400">
              My Posts
            </Link>
            <Link to="/profile/saved-post" className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Saved Posts
            </Link>
            <Link to="/profile/settings" className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              Settings
            </Link>
          </nav>
        </div>

        {/* Add Routes to render different components */}
        <Routes>
          <Route path="" element={<MyPosts posts={MyFeedPost} />} />
          <Route path="saved-post" element={<MyPosts posts={savedPosts} />} />
          <Route path="settings" element={<Settingspage />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </>
  );
}
