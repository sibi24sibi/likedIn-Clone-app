import React from "react";

function Home({ user, signOut, auth }) {
  return (
    <>
      <div className="h-screen flex  items-center justify-center">
        <div>
          <h1 className=" text-2xl mx-10 ">Hello, {user.email}</h1>
          <button
            className=" bg-blue-500  m-10 text-slate-50 rounded-lg p-4  text-l font-medium uppercase"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
