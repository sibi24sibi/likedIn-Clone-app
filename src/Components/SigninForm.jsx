import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../FIrebase"; // Ensure Firebase is configured correctly

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Regular email/password login
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        alert("Login success");
      })
      .catch((err) => alert("Type Email and Password are not same."));
  };

  // Google sign-in function
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Google access token and user info available here
        console.log("Google sign-in success: ", result.user);
        alert(`Welcome ${result.user.displayName}!`);
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
        alert("Failed to sign in with Google. Try again.");
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h3 className=" text-3xl  font-normal">Welcome Back</h3>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-10 mb-3 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
              <div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Keep me logged in
                    </label>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                By clicking Agree & Join or Continue, you agree to the LinkedIn{" "}
                <span>User Agreement</span>, <span>Privacy Policy</span> and{" "}
                <span>Cookie Policy</span>.
              </p>
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
                className="w-full border-2 text-black rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                Continue with Google
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Already on LinkedIn?
                <a
                  href="/signup"
                  className="font-medium text-primary-600 mx-1 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
        <p>
          Looking to create a page for a business?
          <span className="text-sky-700">Get help</span>
        </p>
      </div>
    </section>
  );
}

export default SigninForm;
