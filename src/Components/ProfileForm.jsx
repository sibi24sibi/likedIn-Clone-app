import { useState } from "react";

const ProfileForm = ({ onClose }) => {
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    jobrole: "",
    skills: "",
    education: "",
    country: "",
    about: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data Submitted", profileData);
    onClose(); // Close the modal after form submission
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-lg mx-auto my-4 py-6 px-8  ">
      <h1 className="font-semibold text-2xl mb-4 text-center text-gray-700">
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstname"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <input
              type="text"
              name="firstname"
              onChange={handleChange}
              value={profileData.firstname}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label
              htmlFor="lastname"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              onChange={handleChange}
              value={profileData.lastname}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        {/* Job Title */}
        <div className="mt-4">
          <label
            htmlFor="jobrole"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            name="jobrole"
            onChange={handleChange}
            value={profileData.jobrole}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Skills */}
        <div className="mt-4">
          <label
            htmlFor="skills"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          <input
            type="text"
            name="skills"
            onChange={handleChange}
            value={profileData.skills}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Education */}
        <div className="mt-4">
          <label
            htmlFor="education"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Education
          </label>
          <input
            type="text"
            name="education"
            onChange={handleChange}
            value={profileData.education}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* City/Country */}
        <div className="mt-4">
          <label
            htmlFor="country"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            City/Country
          </label>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            value={profileData.country}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* About */}
        <div className="mt-4">
          <label
            htmlFor="about"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            About
          </label>
          <textarea
            name="about"
            onChange={handleChange}
            value={profileData.about}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>
        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
