import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import PostModel from "../Components/PostModel";

function Home() {
  return (
    <div className="min-h-screen ">
      <div>
        <button
          className="bg-blue-500 my-10 text-slate-50 rounded-lg p-4 text-l font-medium uppercase"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
