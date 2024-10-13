import React from "react";
import { linkedinBigLogo } from "../assets/assets.js";

function Footer() {
  return (
    <footer className=" relative w-full bottom-0 left-0 bg-gray-100 text-gray-600 py-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 ">
          {/* LinkedIn Logo on the top left */}
          <div className="flex flex-col items-start space-y-3">
            <img
              src={linkedinBigLogo}
              alt="LinkedIn Logo"
              className="h-20 w-auto"
            />
          </div>

          {/* General Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">General</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Sign Up
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Developers
                </a>
              </li>
            </ul>
          </div>

          {/* Browse LinkedIn Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">
              Browse LinkedIn
            </h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Learning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Games
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Salary
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Mobile
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Business Solutions Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">
              Business Solutions
            </h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Talent
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Sales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Learning
                </a>
              </li>
            </ul>
          </div>

          {/* Directories Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Directories</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Members
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Companies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Featured
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Learning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Posts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Articles
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-4">
          {/* <p className="text-sm text-gray-500">LinkedIn © 2024</p> */}
          <ul className="flex flex-wrap justify-center space-x-6 text-sm text-gray-500">
            <p className="text-sm text-gray-500">LinkedIn © 2024</p>
            <li>
              <a href="#" className="hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Accessibility
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                User Agreement
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Copyright Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Brand Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Guest Controls
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
