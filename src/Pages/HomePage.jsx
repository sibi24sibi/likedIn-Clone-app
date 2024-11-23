import React, { useState, useEffect, useMemo } from "react";
import { firestore } from "../Firebase";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import UploadPost from "../Components/UploadPost";
import PostModel from "../Components/PostModel";
import { listenToUsers } from "../Api/UploadApi";
import { defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";

const POSTS_LIMIT = 7;

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // Load users only once on component mount
  useEffect(() => {
    const unsubscribeUsers = listenToUsers(setUsers);
    return () => unsubscribeUsers();
  }, []);

  // Memoize the posts query to avoid unnecessary recalculation
  const postsQuery = useMemo(() => {
    return query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc"),
      limit(POSTS_LIMIT)
    );
  }, []);

  // Fetch posts and attach user data
  useEffect(() => {
    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => {
        const post = doc.data();
        const user = users.find((user) => user.id === post.userID);
        return {
          id: doc.id,
          ...post,
          userName: user?.name || "Unknown User",
          userProfileImage: user?.profilePic || defaultProfile,
          userRole: user?.role || "Unknown",
        };
      });
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribePosts();
  }, [users, postsQuery]);

  return (
    <div className="min-h-screen">
      <div>
        <div className="my-2 relative top-5">
          <UploadPost />
        </div>
        <div className="mx-4">
          <PostModel
            postData={posts}
            loading={loading}

          />
        </div>
      </div>
    </div>
  );
}

export default Home;
