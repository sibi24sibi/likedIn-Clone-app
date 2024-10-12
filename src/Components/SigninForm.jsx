import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../Api/AuthApi";
import { Link } from "react-router-dom";
const SigninForm = () => {
  const {
    login,
    signInWithGoogle,
    error,
    successMessage,
    sendPasswordResetEmail,
    resetMessage,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetForm, setShowResetForm] = useState(false); // To toggle between login and reset password form
  const [resetEmail, setResetEmail] = useState(""); // For reset password email

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(resetEmail);
  };

  return (
    <section className="dark:bg-gray-900 md:min-h-screen my-32">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 my-16">
        <h3 className="text-3xl font-normal">
          {showResetForm ? "Reset Password" : "Sign In"}
        </h3>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-10 mb-3 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {error && (
              <div className="mb-4 text-red-600 bg-red-100 border border-red-400 rounded p-2">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 text-green-600 bg-green-100 border border-green-400 rounded p-2">
                {successMessage}
              </div>
            )}
            {resetMessage && (
              <div className="mb-4 text-green-600 bg-green-100 border border-green-400 rounded p-2">
                {resetMessage}
              </div>
            )}

            {!showResetForm ? (
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button>
                <hr />
                <button
                  onClick={signInWithGoogle}
                  type="button"
                  className="w-full border-2 text-black rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                  Continue with Google
                </button>
              </form>
            ) : (
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handlePasswordReset}
              >
                <div>
                  <label
                    htmlFor="resetEmail"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter your email to reset password
                  </label>
                  <input
                    type="email"
                    id="resetEmail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send Reset Email
                </button>
              </form>
            )}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              {showResetForm ? (
                <button
                  className="font-medium text-primary-600 mx-1 hover:underline dark:text-primary-500"
                  onClick={() => setShowResetForm(false)}
                >
                  Back to Sign In
                </button>
              ) : (
                <>
                  <a
                    href="#"
                    className="font-medium text-primary-600 mx-1 hover:underline dark:text-primary-500"
                    onClick={() => setShowResetForm(true)}
                  >
                    Forgot password?
                  </a>
                </>
              )}
            </p>
            {!showResetForm && (
              
              
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Don't have an account?
                <Link to='/signup'>
                <p className="font-medium text-primary-600 mx-1 hover:underline dark:text-primary-500"  >
                  Sign up
                </p>
              </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninForm;
