import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../Api/AuthApi";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const { signup, signInWithGoogle, error, successMessage } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password === confPassword) {
      signup(email, password, name);
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="bg-gray-100 font-['Roboto'] min-h-screen flex flex-col items-center justify-center ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 my-20">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create an Account</h2>
        <p className="mb-6 text-gray-500 text-lg text-center">Stay updated on your professional world</p>

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

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-2">Password (6+ characters)</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confPassword" className="block text-sm text-gray-600 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confPassword"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 mb-4"
          >
            Sign Up
          </button>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button
            onClick={signInWithGoogle}
            type="button"
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-lg mr-2" />
            Continue with Google
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
          <p className="text-sm font-light mt-3">
            <Link to="/forgot" className="text-blue-600 font-semibold hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
