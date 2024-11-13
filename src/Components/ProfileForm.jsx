import React, { useState, useEffect } from "react";
import { firestore, storage } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Reusable Input component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="mt-4">
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Reusable TextArea component
const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="mt-4">
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      name={name}
      onChange={onChange}
      value={value}
      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="3"
    />
  </div>
);

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
    profilePic: "",
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
      if (profilePicFile) {
        const profilePicRef = ref(storage, `profilePics/${userId}`);
        await uploadBytes(profilePicRef, profilePicFile);
        profilePicUrl = await getDownloadURL(profilePicRef);
      }

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
    <div className="bg-white rounded-lg w-full max-w-lg mx-auto my-2 py-2 px-2">
      <h1 className="font-semibold text-2xl mb-4 text-center text-gray-700">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <InputField label="Name" name="name" value={profileData.name} onChange={handleChange} />
        <InputField label="Job Title" name="role" value={profileData.role} onChange={handleChange} />


        <div className="mt-6">
          <label htmlFor="profilePic" className="block mb-2 text-sm font-semibold text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none hover:border-blue-500 hover:shadow-sm transition-all duration-200"
          />
        </div>

        <InputField label="Skills" name="skills" value={profileData.skills} onChange={handleChange} />
        <InputField label="Education" name="education" value={profileData.education} onChange={handleChange} />
        <InputField label="City/Country" name="country" value={profileData.country} onChange={handleChange} />
        <InputField label="Phone" name="phone" value={profileData.phone} onChange={handleChange} />
        <InputField label="Company" name="company" value={profileData.company} onChange={handleChange} />

        <TextAreaField label="About" name="about" value={profileData.about} onChange={handleChange} />

        <hr className="my-5 border-t-2 " />

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
