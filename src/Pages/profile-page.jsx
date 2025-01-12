
import { Link, Navigate, Route, Routes } from 'react-router-dom'; // Use Link for navigation
import { Settingspage } from './Settings-page';
import { useAuth } from '../Api/AuthApi';
import { Postcontent } from '../Components/Post-content';
import { listenToAllPosts } from '../Api/UploadApi';
import { useEffect, useState } from 'react';

export default function ProfilePage() {



  const { userData } = useAuth();

  const [ownPostCount, setOwnPostCount] = useState(0);

  listenToAllPosts(userData.userID);

  useEffect(() => {
    // Fetch all posts and calculate own posts count
    const unsubscribePosts = listenToAllPosts((posts) => {
      const userPosts = posts.filter((post) => post.userID === userData.userID);
      setOwnPostCount(userPosts.length); // Update ownPostCount dynamically
    });

    return () => {
      unsubscribePosts(); // Cleanup listener
    };
  }, [userData.userID]);


  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
        <div className="px-8 pb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 -mt-16">
            <div className="skeleton-circle w-32 h-32">

            <img
              src={userData?.profilePic}
              
              className=" rounded-full h-full w-full p-[1px] object-cover border-4 border-white dark:border-gray-800"
            />
            </div>
            <div className="text-center sm:text-left mt-4 sm:mt-16">
              <div className=" gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData?.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">{userData?.userName || '@user_name'}</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">{userData?.role}</p>
            </div>
            <div className="flex gap-6 ml-auto mt-4 sm:mt-16">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{ownPostCount}</div>
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
          <Route path="" element={<Postcontent userProfileData={userData.userID} isOwnPost /> } />
          <Route path="saved-post" element={<Postcontent savedPost />} />
          <Route path="settings" element={<Settingspage />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </>
  );
}
