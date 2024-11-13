import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { firestore } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { defaultProfile } from "../assets/assets";
import { listenToUsers } from "../Api/UploadApi";
import { useAuth } from "../Api/AuthApi";

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { user } = useAuth()




  useEffect(() => {
    const unsubscribe = listenToUsers(setUsers);
    return () => unsubscribe();
  }, []);



  // Filter users based on the search term
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
    setDropdownVisible(filtered.length > 0 && searchTerm !== "");
  }, [searchTerm, users]);


  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter((user) =>
        (user.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredUsers(filtered);
      setDropdownVisible(filtered.length > 0);
    } else {
      setFilteredUsers([]);

      setDropdownVisible(false);
    }
  }, [searchTerm, users]);

  const handleDropdownItemClick = (userName) => {
    setSearchTerm(userName);
    setDropdownVisible(false);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownVisible(false), 100);
    setSearchTerm('')
  };

  console.log(user)


  return (
    <div className="relative">
      {/* Search Input */}
      <form className={`${user ? "" : "hidden"} max-w-md mx-auto`}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>


        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setDropdownVisible(filteredUsers.length > 0)}
          onBlur={handleInputBlur}
          required
        />

      </form>

      {/* Dropdown of filtered users */}
      {dropdownVisible && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg z-50">
          <ul role="listbox" aria-labelledby="default-search">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center gap-4"
                onClick={() => handleDropdownItemClick(user.name)}
                role="option"
                aria-selected="false"
              >
                <img src={user.profilePic || defaultProfile} className="w-7 h-7 rounded-full" alt={`${user.name}'s profile`} />
                <span>{user.name}</span>
              </li>
            ))}
            {filteredUsers.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No users found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
