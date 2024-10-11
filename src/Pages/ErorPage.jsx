import React from "react";
import {errorImg} from "../assets/assets"
import { Link } from "react-router-dom";

export const ErorPage = () => {
  return <div className=" flex justify-center  items-center min-h-screen">
    <div>
    <img src={errorImg} alt=""  /> 
    <p className=" font-semibold text-base text-center my-5">The page does not exist</p>
    <p className=" text-blue-600 text-sm">Please check your URL or return to LinkedIn home.</p>
      <Link to='/'>
    <div className="  flex">
      
    <button className=" mx-auto rounded-full border border-blue-500 p-1 px-3 text-blue-800 font-semibold my-10">Go to your feed</button>
    </div>
      </Link>
    </div>
  </div>;
};
