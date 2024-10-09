import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { addPost, handleDeletePost } from "../Api/UploadApi"; // Ensure the path is correct
import { defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";

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

  const handlePostSubmit = async () => {
    if (postContent.trim() === "") return; // Prevent empty posts

    setLoading(true); // Start loading when posting
    const postData = {
      content: postContent,
      createdAt: new Date(),
      userID: user.uid,
    };

    const success = await addPost(postData, selectedFile);

    if (success) {
      closeModal();
      document.querySelector('input[type="file"]').value = ""; // Reset file input
    }

    setLoading(false); // Stop loading after the process
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-5">
          <img
            alt="User avatar"
            className="w-12 h-12 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200"
            src={defaultProfile}
          />
          <input
            className="flex-grow p-2 border w-[400px] rounded-full focus:outline-none hover:bg-gray-100 cursor-pointer transition duration-200"
            placeholder="Start a post, try writing with AI"
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen w-screen">
          <div className="bg-white p-6 md:p-6 rounded-lg shadow-lg max-w-2xl w-full h-fit relative overflow-auto">
            {/* Modal Header */}
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <img
                alt="Profile picture of a person"
                className="w-12 h-12 rounded-full"
                src={defaultProfile}
              />
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                <h3 className="text-base text-gray-800">Post to anyone</h3>
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

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

            <div className=" flex justify-between">
              {/* Image Preview */}
              {selectedFile ? (
                <div>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Preview"
                    className="max-w-xs max-h-12 rounded-lg  translate-y-4 shadow-md"
                  />
                </div>
              ) : (
                <div></div>
              )}

              {/* Modal Actions */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handlePostSubmit} // Submit post on click
                  className={`${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-bold py-2 px-4 rounded inline-block flex items-center`}
                  disabled={loading} // Disable button when loading
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPost;
