import React, { useState, useEffect, useCallback, useMemo } from "react";
import { firestore } from "../Firebase";
import { collection, onSnapshot, orderBy, query, limit, startAfter } from "firebase/firestore";
import UploadPost from "../Components/UploadPost";
import PostModel from "../Components/PostModel";
import { listenToUsers } from "../Api/UploadApi";
import { defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";

const POSTS_LIMIT = 7;

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const postMode = false;
  const [users, setUsers] = useState([]);
  const { userData } = useAuth();



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
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Set last visible post
      setLoading(false);
    });

    return () => unsubscribePosts();
  }, [users, postsQuery]);

  // Memoize the loadMorePosts function using useCallback
  const loadMorePosts = useCallback(() => {
    if (loadingMore || !lastVisible) return; // Prevent loading if already loading or no more posts

    setLoadingMore(true);

    const nextPostsQuery = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(POSTS_LIMIT)
    );

    onSnapshot(nextPostsQuery, (snapshot) => {
      const morePostsData = snapshot.docs.map((doc) => {
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

      setPosts((prevPosts) => [...prevPosts, ...morePostsData]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Update last visible post
      setLoadingMore(false);
    });
  }, [loadingMore, lastVisible, users]);

  // Memoize the handleScroll function using useCallback
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
      loadMorePosts();
    }
  }, [loadMorePosts]);

  // Set up scroll listener once on mount and remove it on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const LoadingComponent = () => (
    <div className="skeleton-wrapper">
      <div className="skeleton-profile">
        <div className="skeleton-circle" />
        <div className="skeleton-info ">
          <div className="skeleton-line skeleton-short" />
          <div className="skeleton-line skeleton-long" />
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-long" />
        <div className="skeleton-line skeleton-medium" />
        <div className="skeleton-line skeleton-short" />
      </div>
      <div className="skeleton-image" />
      <div className="skeleton-actions">
        <div className="skeleton-button" />
        <div className="skeleton-button" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div>
        <div className="my-2 relative top-5">
          <UploadPost />
        </div>
        <div className="mx-4">
          <PostModel postData={posts} userData={userData} loadings={loading} postMode={postMode} />
          {loadingMore &&
            <>
              <LoadingComponent />
              <LoadingComponent />
              <LoadingComponent />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
