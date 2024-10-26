import React, { useState, useEffect } from "react";
import { firestore } from "../Firebase";
import { collection, onSnapshot, orderBy, query, getDocs } from "firebase/firestore";
import UploadPost from "../Components/UploadPost";
import PostModel from "../Components/PostModel";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const postMode = false;

  useEffect(() => {

    let userNamesCache = {};


    const fetchUsers = async () => {
      const userSnapshot = await getDocs(collection(firestore, "users"));
      userSnapshot.forEach((doc) => {
        userNamesCache[doc.id] = doc.data().name;
      });
      console.log("User names cache:", userNamesCache);
    };

    const fetchPostsWithUserNames = async () => {

      await fetchUsers();

      // Real-time listener for posts
      const postsQuery = query(
        collection(firestore, "posts"),
        orderBy("createdAt", "desc")
      );

      const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          userName: userNamesCache[doc.data().userID] || "Unknown User", 
        }));
        setPosts(postsData);
        setLoading(false);
      });

      return unsubscribePosts;
    };

 
    const unsubscribe = fetchPostsWithUserNames();

    return () => {
      unsubscribe && unsubscribe.then((unsub) => unsub()); 
    };
  }, []); 
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
