import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import UploadPost from "../Components/UploadPost";
import PostModel from "../Components/PostModel";

function Home() {
  return (
    <div className="min-h-screen  ">
      <div>
        <div className="my-5 relative top-5">
          <UploadPost  />
        </div>
        <PostModel />
      </div>
    </div>
  );
}

export default Home;
