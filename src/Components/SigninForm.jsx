import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../Firebase"; // Ensure Firebase is configured correctly

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  // Regular email/password login
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError(""); // Clear any previous errors
        alert("Login success");
      })
      .catch((err) => {
        setError("Email and Password do not match."); // Set the error message
      });
  };

  // Google sign-in function
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("Google sign-in success: ", result.user);
        alert(`Welcome ${result.user.displayName}!`);
        setError(""); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
        setError("Failed to sign in with Google. Try again."); // Set the error message
      });
  };

  // Function to handle password reset
  const handleForgotPassword = () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessMessage("Password reset email sent! Check your inbox.");
        setError(""); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error sending password reset email: ", error);
        setError("Failed to send password reset email. Please try again.");
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:h-screen ">
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
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email or phone number
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
              <button
                onClick={login}
                type="button" // Changed to "button" to prevent page reload on click
                className="w-full text-white bg-blue-500 hover:bg-blue-600 rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <hr />
              <button
                onClick={signInWithGoogle}
                type="button"
                className="w-full border2 text-black rounded-full focus:ring4 focus:outline-none focus:ring-primary300 font-medium text-sm px5 py2.5 text-center dark:bg-primary600 dark:hover:bg-primary700 dark:focus:ring-primary800"
              >
                <FontAwesomeIcon icon={faGoogle} className="mx2" />
                Continue with Google
              </button>
            </form>
            <p
              onClick={handleForgotPassword}
              className="text-sm font-light text-blue-500 cursor-pointer hover:underline text-center mt-4"
            >
              Forgot Password?
            </p>
            <p className="text-sm font-light text-gray500 dark:text-gray400 text-center">
              Already on LinkedIn?
              <a
                href="/signup"
                className="font-medium text-primary600 mx1 hover:underline dark:text-primary500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <p>
          Looking to create a page for a business?
          <span className="text-sky700">Get help</span>
        </p>
      </div>
    </section>
  );
}

export default SigninForm;
