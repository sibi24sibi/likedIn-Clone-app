import React, { useState, useEffect } from "react";
import { firestore } from "../Firebase"; // Ensure Firebase is initialized and imported
import { doc, setDoc } from "firebase/firestore";

const ProfileForm = ({ onClose, userId, initialData }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    jobrole: "",
    skills: "",
    education: "",
    country: "",
    about: "",
    phone: "",    // Added phone field
    company: "",  // Added company field
  });

  useEffect(() => {
    if (initialData) {
      setProfileData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Profile Data Submitted", profileData);

    try {
      // Save the profile data to Firestore
      const userDocRef = doc(firestore, "users", userId);
      await setDoc(userDocRef, profileData, { merge: true });
      console.log("Profile data successfully saved!");
      onClose(); // Close the modal after form submission
    } catch (error) {
      console.error("Error saving profile data: ", error);
    }
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-lg mx-auto my-4 py-6 px-8">
      <h1 className="font-semibold text-2xl mb-4 text-center text-gray-700">
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={profileData.name}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Title */}
        <div className="mt-4">
          <label htmlFor="jobrole" className="block mb-1 text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="jobrole"
            onChange={handleChange}
            value={profileData.jobrole}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills */}
        <div className="mt-4">
          <label htmlFor="skills" className="block mb-1 text-sm font-medium text-gray-700">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            onChange={handleChange}
            value={profileData.skills}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Education */}
        <div className="mt-4">
          <label htmlFor="education" className="block mb-1 text-sm font-medium text-gray-700">
            Education
          </label>
          <input
            type="text"
            name="education"
            onChange={handleChange}
            value={profileData.education}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City/Country */}
        <div className="mt-4">
          <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-700">
            City/Country
          </label>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            value={profileData.country}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="mt-4">
          <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={profileData.phone}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company */}
        <div className="mt-4">
          <label htmlFor="company" className="block mb-1 text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            name="company"
            onChange={handleChange}
            value={profileData.company}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* About */}
        <div className="mt-4">
          <label htmlFor="about" className="block mb-1 text-sm font-medium text-gray-700">
            About
          </label>
          <textarea
            name="about"
            onChange={handleChange}
            value={profileData.about}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
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
