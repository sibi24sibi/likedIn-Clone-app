import React, { useState, useEffect, useMemo } from "react";
import { firestore } from "../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import UploadPost from "../Components/UploadPost";
import PostModel from "../Components/PostModel";
import { listenToUsers } from "../Api/UploadApi";
import { defaultProfile } from "../assets/assets";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const postMode = false;
  const [users, setUsers] = useState([]);

  // Load users only once on component mount
  useEffect(() => {
    const unsubscribeUsers = listenToUsers(setUsers);
    return () => unsubscribeUsers();
  }, []);

  // Fetch posts and attach user data
  useEffect(() => {
    const postsQuery = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc")
    );

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
  }, [users]);

  return (
    <div className="min-h-screen">
      <div>
        <div className="my-2 relative top-5">
          <UploadPost />
        </div>
        <div className="mx-4">
          <PostModel postData={posts} loadings={loading} postMode={postMode} />
        </div>
      </div>
    </div>
  );
}

export default Home;
