import React from "react";
import { friendzyLogo, linkedinBigLogo } from "../assets/assets.js";
import { useAuth } from "../Api/AuthApi.jsx";
import { FaGlobe } from "react-icons/fa";




function Footer() {


  const welcomePaths = ['/', '/about', '/contact'];

  if (welcomePaths.includes(location.pathname)) {
    return (
      <footer className="bg-gray-50 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Friendzy</h3>
              <p className="text-gray-600 mb-4">
                Connecting people, sharing moments, building communities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Communities</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Mobile App</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-violet-600">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Cookies</a></li>
                <li><a href="#" className="text-gray-600 hover:text-violet-600">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600">© 2024 Friendzy. All rights reserved.</p>
              <div className="flex gap-6">

              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }


  const { user } = useAuth();


  return (
    <footer className=" relative w-full bottom-0 left-0 bg-gray-100 text-gray-600 py-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Top Section */}
        {!user &&
          <div className="lg:grid lg:grid-cols-5  gap-8 mb-8 space-y-5 ">

            <div className="flex flex-col items-start space-y-3  ">
              <img
                src={friendzyLogo}
                alt="Logo"
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
        }

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
