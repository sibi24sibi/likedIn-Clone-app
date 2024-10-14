import { SlLike } from "react-icons/sl"; 
import { FaRegComment } from "react-icons/fa"; 
import React, { useEffect, useState } from "react";
import { defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";
import { Button, Modal } from "flowbite-react";
import { formatTimestamp } from "../assets/assets";
import { handleLikePost } from "../Api/UploadApi"; // import your new like function

import "./Skeleton.css";

function PostModel({ loadings, postData = [], postMode, onDelete }) {
  const { userData } = useAuth();
  const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts

  const LoadingComponent = () => (
    <div className="skeleton-wrapper">
      <div className="skeleton-profile">
        <div className="skeleton-circle" />
        <div className="skeleton-info">
          <div className="skeleton-line skeleton-short" />
          <div className="skeleton-line skeleton-long" />
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-long" />
        <div className="skeleton-line skeleton-medium" />
        <div className="skeleton-line skeleton-short" />
      </div>
      <div className="skeleton-image" />
      <div className="skeleton-actions">
        <div className="skeleton-button" />
        <div className="skeleton-button" />
      </div>
    </div>
  );

  const handleLike = async (postId) => {
    const liked = likedPosts.has(postId);
    const newLikedPosts = new Set(likedPosts);

    if (liked) {
      newLikedPosts.delete(postId); // Unlike
      await handleLikePost(postId, userData.userID, false); // Update Firestore to unlike
    } else {
      newLikedPosts.add(postId); // Like
      await handleLikePost(postId, userData.userID, true); // Update Firestore to like
    }
    
    setLikedPosts(newLikedPosts); // Update state
  };

  return (
    <>
      {loadings ? (
        <div className="my-8">
          <LoadingComponent />
          <LoadingComponent />
          <LoadingComponent />
        </div>
      ) : (
        postData.map((post) => (
          <div
            key={post.id}
            className={`bg-white ${postMode ? 'max-w-[740px]' : 'max-w-[540px]'} rounded-lg shadow-md mx-auto mt-16 mb-5 md:w-10/12`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 mr-3">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={defaultProfile}
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{userData.name}</h3>
                    <p className="text-sm text-gray-600">{userData.role}</p>
                    <p className="text-xs text-gray-500">
                      Posted {formatTimestamp(post.createdAt)}
                    </p>
                  </div>
                </div>
                <div>
                  {postMode ? (
                    <button
                      onClick={() => onDelete(post.id)}
                      className="text-red-600 font-medium hover:bg-red-100 px-3 py-1 rounded transition duration-300"
                    >
                      Delete
                    </button>
                  ) : (
                    <button className="text-blue-600 font-medium hover:bg-blue-100 px-3 py-1 rounded transition duration-300">
                      + Follow
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-700 text-base font-normal my-2">{post.content}</p>
              {post.imageUrl && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={post.imageUrl}
                    alt="Post content"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <div>{(post.likes || []).length} likes</div>
                <div>{post.comments || 0} Comments</div>
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="flex justify-around pt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center ${likedPosts.has(post.id) ? 'text-blue-600' : 'text-gray-600'} hover:bg-gray-100 px-3 justify-center w-full py-2 rounded transition duration-300`}
                >
                  <SlLike />
                  <span className="mx-3"> Like </span>
                </button>
                <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 justify-center w-full py-2 rounded transition duration-300">
                  <FaRegComment />
                  <span className="mx-3"> Comment </span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default PostModel;
