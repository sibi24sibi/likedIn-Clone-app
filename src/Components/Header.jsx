import React from "react";
import { auth } from "../Firebase";
import {
  linkedinSmallLogo,
  linkedinBigLogo,
  defaultProfile,
} from "../assets/assets.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faHome,
  faUser,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useAuth } from "../Api/AuthApi.jsx";
import { signOut } from "firebase/auth";
import uuid from "react-uuid";

import SearchComponent from "./SearchComponent.jsx";

function Header() {
  const { user, logout } = useAuth();

  const logo = user ? linkedinSmallLogo : linkedinBigLogo;

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="bg-white border-gray-200 dark:bg-gray-900 justify-between shadow-lg md:px-10 py-3    "
    >
      <div className=" flex  ">
        <img
          src={logo}
          className={` ${user ? "h-10 mx-3" : "h-20 w-auto my-[-24px]"}`}
          alt="Logo"
        />


        <SearchComponent />

      </div>

      <Navbar.Toggle className=" absolute top-0 right-0 my-3 mx-3  " />

      <Navbar.Collapse>
        {user ? (
          <ul className="flex font-medium flex-col p-4 gap-2 md:p-0 mt-4 lg:space-x-8 md:space-x-4 rtl:space-x-reverse md:flex-row md:w-auto md:mt-0 md:border-0 md:bg-white">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "border-b-0  md:border-b-2 md:border-b-black" : ""
              }
            >
              <li className="py-1 flex flex-col md:text-[#475569] md:hover:text-[black]">
                <FontAwesomeIcon icon={faHome} className="hidden md:block" />
                <span className="m-1">Home</span>
              </li>
            </NavLink>
            <NavLink
              to="/connect"
              className={({ isActive }) =>
                isActive ? "border-b-0  md:border-b-2 md:border-b-black" : ""
              }
            >
              <li className="py-1 flex flex-col md:text-[#475569] md:hover:text-[black]">
                <FontAwesomeIcon icon={faUser} className="hidden md:block" />
                <span className="m-1">My Network</span>
              </li>
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive ? "border-b-0  md:border-b-2 md:border-b-black" : ""
              }
            >
              <li className="py-1 flex flex-col md:text-[#475569] md:hover:text-[black]">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="hidden md:block"
                />
                <span className="m-1">Jobs</span>
              </li>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? " border-b-0  md:border-b-2 md:border-b-black" : ""
              }
            >
              <li className="py-1 flex flex-col md:text-[#475569] md:hover:text-[black]">
                <FontAwesomeIcon icon={faUser} className="hidden md:block" />
                <span className="m-1">Me</span>
              </li>
            </NavLink>
            {/* 

              <NavLink to="/postJob" className={({ isActive }) => isActive ? ' border-b-0 md:border-b-2 md:border-b-black' : ''}>
                <li className="py-1 flex flex-col md:text-[#475569] md:hover:text-[black]">
                  <FontAwesomeIcon icon={faBagShopping} className="hidden md:block" />
                  <span className="m-1 mt-2">Post a Job</span>
                </li>
              </NavLink>
              
              */}
            <NavLink to="/postJob" className={({ isActive }) => isActive ? ' border-b-0 md:border-b-2 md:border-b-black' : ''}>
              <li className="py-1 flex flex-col md:text-[#475569] md:hover:text-[black]">
                <button
                  className="text-slate-950 border-2 rounded-lg text-base font-normal uppercase py-2 px-4"
                  onClick={logout}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </li>
            </NavLink>
          </ul>
        ) : (
          <ul className="md:flex rtl:space-x-reverse md:flex-row md:w-auto gap-4 ">
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `flex flex-col md:flex-row text-center ${isActive
                  ? "border-[1px] border-blue-600 text-blue-950 rounded-full"
                  : ""
                }`
              }
            >
              <li>
                <button className="text-black hover:bg-[#e2e8f0] font-medium bg-white py-2 px-4 rounded-full ">
                  Login
                </button>
              </li>
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `flex flex-col md:flex-row text-center ${isActive
                  ? "border-[1px] border-blue-600 text-blue-950 rounded-full"
                  : ""
                }`
              }
            >
              <li>
                <button className="text-black hover:bg-[#e2e8f0] font-medium bg-white py-2 px-4 rounded-full">
                  Sign up
                </button>
              </li>
            </NavLink>
          </ul>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
