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
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(resetEmail);
  };

  return (
    <div className="bg-gray-100 font-['Roboto']">
      <div className="flex flex-col md:flex-row min-h-screen">
     

        {/* Right Section (Login Form) */}
        <div className="flex flex-col w-full  items-center justify-center p-6 ">
          {/* LinkedIn Logo */}
          <div className="mb-8">
            <i className="fab fa-linkedin text-blue-700 text-4xl"></i>
          </div>

          {!showResetForm ? (
            <form className="w-full max-w-sm bg-white shadow-md rounded-lg p-8" onSubmit={handleLogin}>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign in</h2>
              <p className="mb-6 text-gray-600">Stay updated on your professional world</p>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email or Phone</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 mb-4"
              >
                Sign in
              </button>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-700 text-sm hover:underline"
                  onClick={() => setShowResetForm(true)}
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-400 text-sm">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-600 font-semibold py-2 rounded-lg hover:bg-gray-100"
                onClick={signInWithGoogle}
              >
                <FontAwesomeIcon icon={faGoogle} className="text-lg mr-2" /> Sign in with Google
              </button>

              <div className="text-center mt-8">
                <p className="text-gray-600 text-sm">
                  New to LinkedIn? <Link to="/signup" className="text-blue-700 font-semibold hover:underline">Join now</Link>
                </p>
              </div>
            </form>
          ) : (
            <form className="w-full max-w-sm bg-white shadow-md rounded-lg p-8" onSubmit={handlePasswordReset}>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Reset Password</h2>
              <p className="mb-6 text-gray-600">Enter your email to reset your password</p>

              <div className="mb-4">
                <label htmlFor="resetEmail" className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  id="resetEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 mb-4"
              >
                Send Reset Link
              </button>

              {resetMessage && <p className="text-green-500 text-sm text-center">{resetMessage}</p>}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-700 text-sm hover:underline"
                  onClick={() => setShowResetForm(false)}
                >
                  Back to Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
