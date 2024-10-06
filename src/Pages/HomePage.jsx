import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl mx-5">Hello</h1>
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
