import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../Firebase"; // Ensure that your Firebase app is correctly configured

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const createUser = (event) => {
    event.preventDefault();
    if (password !== confPassword) {
      setError("Passwords do not match."); // Set error message
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError(""); // Clear any previous errors
        alert("User created successfully");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError(
            "This email is already in use. Please try signing in or use a different email."
          );
        } else {
          setError("Error creating user: " + error.message);
        }
      });
  };

  const signWithGoogle = (event) => {
    event.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setError(""); // Clear any previous errors
        alert("Signed in successfully with Google");
        console.log(result);
      })
      .catch((error) => {
        console.error("Error during Google sign in: ", error);
        setError("Error signing in with Google: " + error.message); // Set error message
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:min-h-screen  my-32">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 my-16">
        <h3 className="text-3xl font-normal">Create an Account</h3>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-10 mb-3 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {error && (
              <div className="mb-4 text-red-600 bg-red-100 border border-red-400 rounded p-2">
                {error}
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={createUser}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password (6+ characters)
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confPassword"
                  id="confPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p2.5 dark:bg-gray700 dark:bordergray600 dark:placeholdergray400 dark:textwhite dark:focus:ringblue500 dark:focus:borderblue500"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign Up
              </button>
              <hr />
              <button
                onClick={signWithGoogle}
                type="button"
                className="w-full border-2 text-black rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                Continue with Google
              </button>
              <p className="text-sm font-light text-gray500 dark:text-gray400 text-center">
                Already on LinkedIn?
                <a
                  href="/signin"
                  className="font-medium text-primary-600 mx1 hover:underline dark:text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
        <p>
          Looking to create a page for a business?
          <span className="text-sky700">Get help</span>
        </p>
      </div>
    </section>
  );
};

export default SignupForm;
