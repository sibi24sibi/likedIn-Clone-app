import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../FIrebase"; // Ensure that your Firebase app is correctly configured

const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = (event) => {
        event.preventDefault(); // Prevents form reload
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('User created successfully');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('This email is already in use. Please try signing in or use a different email.');
                } else {
                    alert('Error creating user: ' + error.message);
                }
            });
    };

    const signWithGoogle = (event) => {
        event.preventDefault(); // Prevents form reload
        signInWithPopup(auth, googleprovider)
            .then((result) => {
                alert('Signed in successfully with Google');
                console.log(result);
            })
            .catch((error) => {
                console.error('Error during Google sign in: ', error);
                alert('Error signing in with Google: ' + error.message);
            });
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h3 className="text-3xl font-normal">
                        Make the most of your professional life
                    </h3>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-10 mb-3 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6" onSubmit={createUser}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email or phone number
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password (6+ characters)
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                            Keep me logged in
                                        </label>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    By clicking Agree & Join or Continue, you agree to the LinkedIn <span>User Agreement</span>, <span>Privacy Policy</span> and <span>Cookie Policy</span>.
                                </p>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-500 hover:bg-blue-600 rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Agree & Join
                                </button>
                                <hr />
                                <button
                                    onClick={signWithGoogle}
                                    className="w-full border-2 text-black rounded-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center"
                                >
                                    <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                                    Continue with Google
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                    Already have an account?
                                    <a href="/signin" className="font-medium text-primary-600 mx-1 hover:underline dark:text-primary-500">
                                        Sign In
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                    <p>
                        Looking to create a page for a business? <span className="text-sky-700">Get help</span>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default SignupForm;
