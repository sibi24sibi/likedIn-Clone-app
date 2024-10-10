import React from "react";
import { auth } from "../Firebase";
import { linkedinSmallLogo, linkedinBigLogo, defaultProfile } from "../assets/assets.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHome, faUser, faMagnifyingGlass ,  faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useAuth } from "../Api/AuthApi.jsx";
import { signOut } from "firebase/auth";

function Header() {

  const { user } = useAuth();


  const logo = user ? linkedinSmallLogo : linkedinBigLogo;

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="bg-white border-gray-200 dark:bg-gray-900 justify-between shadow-lg md:px-10    ">
<div className=" flex  ">
  

<img src={logo} className={` ${user ? 'h-10 mx-3' : 'h-20 w-auto my-[-24px]'}`} alt="Logo" />



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
      className="block md:w-10/12  h-10 p-4 ps-10 rounded-lg focus:border-[black]"
      placeholder="Search"
      required
    />
  </div>
</form>

</div>
        
 
      <Navbar.Toggle />

      <Navbar.Collapse>
      {user ? (
              <ul className="flex font-medium flex-col p-4  gap-2 md:p-0 mt-4 lg:space-x-8 md:space-x-4 rtl:space-x-reverse md:flex-row md:w-auto md:mt-0 md:border-0 md:bg-white">
                <NavLink to="/home">
                  <li className="py-1 md:flex flex-col md:text-[#475569] md:hover:text-[black] md:hover:border-b-[black] md:hover:border-b-[3px] duration-100">
                    <FontAwesomeIcon
                      icon={faHome}
                      className="hidden  md:block"/>
                  
                    <a href="#" className="m-1">
                      Home
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/connect">
                  <li className="py-1 md:flex flex-col md:text-[#475569]md:hover:text-[black] md:hover:border-b-[black] md:hover:border-b-[3px] duration-100">
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
                  <li className="py-1 md:flex flex-col md:text-[#475569]md:hover:text-[black] md:hover:border-b-[black] md:hover:border-b-[3px]  duration-100">
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
                  <li className="py-1 flex flex-col md:text-[#475569]md:hover:text-[black] md:hover:border-b-[black] md:hover:border-b-[3px] md:hover:border-b-[3px] duration-100">
                   
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
                  <li className="md:flex flex-col md:text-[#475569] md:hover:text-[black] md:hover:border-b-[black] md:hover:border-b-[3px] duration-100">
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      className="hidden md:block"
                    />
                    <a href="#" className="mt-2">
                      Post a Job
                    </a>
                  </li>
                </NavLink>
                <li className=" my-2 md:my-0">
                  <button
                    className="bg-blue-500 text-slate-50 rounded-lg text-base font-normal uppercase py-2 px-4 "
                    onClick={() => signOut(auth)}
                  >
                  <FontAwesomeIcon icon={faRightFromBracket}   />
            
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="md:flex  rtl:space-x-reverse md:flex-row md:w-auto md:mt-0 md:border-0 md:bg-white">
                <NavLink to="/signin">
                  <li className=" flex flex-col-reverse ">
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
              </ul>
            )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
