import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addPost, handlePostSubmit } from "../Api/UploadApi"; // Ensure this returns the doc ID
import { defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";
import { Modal } from "flowbite-react"; // Importing Flowbite Modal
import uuid from "react-uuid";


function UploadPost() {
  const { userData, user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState(""); // State for post content
  const [loading, setLoading] = useState(false); // State for loading

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsModalOpen(true);
  };

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null); // Reset selected file when closing modal
    setPostContent(""); // Reset post content when closing modal
  };

  const handlePosthandle = (e) => {
    e.preventDefault()
    handlePostSubmit(postContent, selectedFile, user, closeModal, setLoading)

  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center space-y-4 w-11/12 md:w-fit">
        <div className="flex items-center space-x-5">
          <img
            alt="User avatar"
            className="w-12 h-12 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200"
            src={userData?.profilePic || defaultProfile}
          />
          <input
            className="flex-grow p-2 border md:w-[550px] rounded-full focus:outline-none hover:bg-gray-100 cursor-pointer transition duration-200"
            placeholder="Share a post"
            type="text"
            onClick={handleInputClick}
          />
        </div>

        <div className="flex justify-around mt-4 w-full">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
            <label className="text-gray-600 cursor-pointer hover:bg-gray-200 p-2 rounded">
              Media
              <FontAwesomeIcon icon={faImage} className="text-blue-500 mx-2" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Flowbite Modal */}
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>
          <div className="flex items-center space-x-4">
            <img
              alt="Profile picture of a person"
              className="w-12 h-12 rounded-full"
              src={userData?.profilePic || defaultProfile}
            />
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-bold mb-1">{userData?.name}</h2>
              <h3 className="text-base text-gray-800">Post to anyone</h3>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full h-56 p-2 focus:outline-none"
            placeholder="What do you want to talk about?"
          ></textarea>

          <div className="flex justify-around mt-4 w-full">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
              <label className="text-gray-600 cursor-pointer hover:bg-gray-200 p-2 rounded">
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-blue-500 mx-2"
                />
                Add photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {selectedFile && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Preview"
                className="max-w-xs max-h-12 rounded-lg shadow-md"
              />
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={handlePosthandle}
            className={`${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded flex items-center`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Posting...
              </>
            ) : (
              "Post"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadPost;
