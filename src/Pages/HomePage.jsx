import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import UploadPost from "../Components/UploadPost";
import PostModel from "../Components/PostModel";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center md:mx-0 mx-16">
      <div>
        <div className="my-5 relative top-0">
          <UploadPost  />
        </div>
        <PostModel />
      </div>
    </div>
  );
}

export default Home;
