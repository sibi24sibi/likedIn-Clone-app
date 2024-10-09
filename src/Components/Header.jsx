import React, { useState } from "react";
import { linkedinSmallLogo, defaultProfile } from "../assets/assets.js";
import { linkedinBigLogo } from "../assets/assets.js";

import { auth } from "../Firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faHome,
  faUser,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Api/AuthApi.jsx";
import { signOut } from "firebase/auth";

function Header() {
  // State to control dropdown visibility
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(user);
  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logo = user ? linkedinSmallLogo : linkedinBigLogo;

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-lg">
        <div className="max-w-screen flex flex-wrap items-center justify-between md:mx-12 p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className={`${user ? "h-10" : " h-20 -my-10"}`}
              alt="Logo"
            />
            <form className={`${user ? "" : "hidden"} max-w-md mx-auto`}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                  type="search"
                  className="block w-full h-10 p-4 ps-10 rounded-lg focus:border-[black]"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </a>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* Mobile Menu */}
          <div
            className={`items-center justify-evenly ${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            {user ? (
              <ul className="flex font-medium flex-col p-4 md:p-0 mt-4 lg:space-x-8 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                <NavLink to="/home">
                  <li className="py-1 md:flex flex-col md:text-[#475569] hover:text-[black] hover:border-b-[black] hover:border-b-[3px] duration-100">
                    <FontAwesomeIcon
                      icon={faHome}
                      className="hidden md:block"
                    />
                    <a href="#" className="m-1">
                      Home
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/connect">
                  <li className="py-1 md:flex flex-col md:text-[#475569] hover:text-[black] hover:border-b-[black] hover:border-b-[3px] duration-100">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="hidden md:block"
                    />
                    <a href="#" className="m-1">
                      My Network
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/jobs">
                  <li className="py-1 md:flex flex-col md:text-[#475569] hover:text-[black] hover:border-b-[black] hover:border-b-[3px] duration-100">
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="hidden md:block"
                    />
                    <a href="#" className="m-1">
                      Jobs
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/profile">
                  <li className="py-1 flex flex-col md:text-[#475569] hover:text-[black] hover:border-b-[black] hover:border-b-[3px] duration-100">
                    {/* <img
                      className="w-6 h-6 rounded-full hidden md:block"
                      src={defaultProfile}
                      alt="user photo"
                    /> */}

                    <FontAwesomeIcon
                      icon={faUser}
                      className="hidden md:block"
                    />
                    <a href="#" className="m-1 md:mt-2">
                      Me
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/postJob">
                  <li className="md:flex flex-col md:text-[#475569] hover:text-[black] hover:border-b-[black] hover:border-b-[3px] duration-100">
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="hidden md:block"
                    />
                    <a href="#" className="mt-2">
                      Post a Job
                    </a>
                  </li>
                </NavLink>
                <li className="">
                  <button
                    className="bg-blue-500 text-slate-50 rounded-lg text-base font-normal uppercase py-2 px-4 md:mt-2"
                    onClick={() => signOut(auth)}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <div className="flex">
                <NavLink to="/signin">
                  <li className=" flex flex-col">
                    <button className="text-[blue] hover:bg-[#f1f5f9] font-medium bg-[white] border-blue-600 py-2 px-5  rounded-[90px]">
                      Login
                    </button>
                  </li>
                </NavLink>
                <NavLink to="/signup">
                  <li className=" flex flex-col  ">
                    <button className="text-[blue] hover:bg-[#e2e8f0]  border-[1px] border-blue-600 font-medium bg-[white] py-2 px-4  rounded-[90px]">
                      Sign in
                    </button>
                  </li>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
