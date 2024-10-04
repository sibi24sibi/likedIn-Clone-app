import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useAuth } from "../Api/AuthApi";
import { Navigate } from "react-router-dom";

function SigninForm() {
  const { login, signInWithGoogle, sendPasswordResetEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetMessage, setResetMessage] = useState(""); // New state for reset password message

  // Handle normal login
  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      setSuccessMessage("Logged in successfully!");
      setError("");
      Navigate("/");
    } catch (err) {
      setError("Login failed: " + err.message);
      setSuccessMessage("");
    }
  };

  // Handle password reset
  const handlePasswordReset = async (event) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(email);
      setResetMessage("Password reset email sent. Check your inbox.");
      setError("");
    } catch (err) {
      setError("Password reset failed: " + err.message);
      setResetMessage("");
    }
  };

  return (
    <section className="dark:bg-gray-900 md:min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 my-16">
        <h3 className="text-3xl font-normal">Welcome Back</h3>
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
              <div className="mb-4 text-blue-600 bg-blue-100 border border-blue-400 rounded p-2">
                {resetMessage}
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
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

            <div className="text-center mt-4  space-y-2">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                Forgot your password?
                <button
                  onClick={handlePasswordReset}
                  className="font-medium text-primary-600 mx-1 hover:underline dark:text-primary-500"
                >
                  Reset it here
                </button>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?
                <a
                  href="/signup"
                  className="font-medium text-primary-600 mx-1 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SigninForm;
