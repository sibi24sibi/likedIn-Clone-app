import React,{useState,useEffect} from "react";
import { signOut } from "firebase/auth";
import { firestore } from "../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth } from "../Firebase";
import UploadPost from "../Components/UploadPost";
import PostModel from "../Components/PostModel";


function Home() {


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const postMode = false;




  useEffect(() => {
    const postsQuery = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      

      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);



  return (
    <div className="min-h-screen  ">
      <div>
        <div className="my-2 relative top-5">
          <UploadPost   />
        </div>
        <div className="mx-4">
        <PostModel postData={posts} loadings={loading}  postMode={postMode}  />
        </div>
      </div>
    </div>
  );
}

export default Home;
