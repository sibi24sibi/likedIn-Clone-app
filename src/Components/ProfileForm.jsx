import React, { useState, useEffect } from "react";
import { firestore, storage } from "../Firebase"; // Ensure Firebase and Storage are initialized
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileForm = ({ onClose, userId, initialData }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    skills: "",
    education: "",
    country: "",
    about: "",
    phone: "",
    company: "",
    profilePic: "", // Added profile picture field
  });
  const [profilePicFile, setProfilePicFile] = useState(null);

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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profilePicUrl = profileData.profilePic;

    try {
      // If a new profile picture is selected, upload it to Firebase Storage
      if (profilePicFile) {
        const profilePicRef = ref(storage, `profilePics/${userId}`);
        await uploadBytes(profilePicRef, profilePicFile);
        profilePicUrl = await getDownloadURL(profilePicRef);
      }

      // Update profile data in Firestore, including the profile picture URL if changed
      const updatedProfileData = { ...profileData, profilePic: profilePicUrl };
      const userDocRef = doc(firestore, "users", userId);
      await setDoc(userDocRef, updatedProfileData, { merge: true });

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
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="role"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            name="role"
            onChange={handleChange}
            value={profileData.role}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Profile Picture Upload */}
        {/* Profile Picture Upload */}
        <div className="mt-6">
          <label
            htmlFor="profilePic"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Profile Picture
          </label>
          <div className="relative flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none hover:border-blue-500 hover:shadow-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Other input fields */}
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
          />
        </div>

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
          />
        </div>

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
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="phone"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
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

        <div className="mt-4">
          <label
            htmlFor="company"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
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
