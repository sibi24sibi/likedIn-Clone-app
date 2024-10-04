import { useState } from "react";
import Modal from "./Modal/Modal";

const ProfileForm = () => {
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    jobrole: "",
    skills: "",
    education: "",
    country: "",
    about: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(profileData);

  return (
    <>
      {/* {
        !open && (
        <div className="flex justify-center my-10"> 
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setOpen(true)}>Open</button>
        </div>
        )
    } */}

      {/* <Modal open={open} onclose={() => setOpen(false)}>  */}
      <div className="bg-white rounded-lg w-full mx-auto my-4 py-5 border border-gray-300">
        <form className="max-w-sm mx-auto">
          <h1 className="font-semibold text-lg mb-2.5 text-center">
            Edit Profile{" "}
          </h1>
          <div className="mb-1.5">
            <label
              htmlFor="firstname"
              className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              name="firstname"
              onChange={handleChange}
              value={profileData.firstname}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-1.5">
            <label
              htmlFor="lastname"
              className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              onChange={handleChange}
              value={profileData.lastname}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-1.5">
            <label
              htmlFor="jobrole"
              className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job Title
            </label>
            <input
              type="text"
              name="jobrole"
              onChange={handleChange}
              value={profileData.jobrole}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-1.5">
            <label
              htmlFor="skills"
              className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add Skills
            </label>
            <input
              type="text"
              name="skills"
              onChange={handleChange}
              value={profileData.skills}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-1.5">
            <label
              htmlFor="education"
              className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Education
            </label>
            <input
              type="text"
              name="education"
              onChange={handleChange}
              value={profileData.education}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-1.5">
            <label
              htmlFor="country"
              className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              City/Country
            </label>
            <input
              type="text"
              name="country"
              onChange={handleChange}
              value={profileData.country}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-1.5">
            <label
              htmlFor="about"
              className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              About
            </label>
            <textarea
              type="text"
              name="about"
              onChange={handleChange}
              value={profileData.about}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      {/* </Modal> */}
    </>
  );
};

export default ProfileForm;
