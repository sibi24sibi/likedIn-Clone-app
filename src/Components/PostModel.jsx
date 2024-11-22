import { AiFillLike } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { defaultProfile, NoPost, postImageError } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";
import { Button, Modal } from "flowbite-react";
import { AsyncImage } from 'loadable-image'
import { Blur } from 'transitions-kit'
import { formatTimestamp } from "../assets/assets";

import { handleLikePost, handleCommentPost } from "../Api/UploadApi"; // import your new like and comment functions

import "./Skeleton.css";
import { useNavigate } from "react-router-dom";

function PostModel({
  loadings,
  postData = [],
  postMode,
  onDelete,
  isOwnProfile
}) {
  const { userData } = useAuth();
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [visibleComments, setVisibleComments] = useState({});
  const [newComment, setNewComment] = useState({});


  const navigate = useNavigate()

  useEffect(() => {
    const initialLikedPosts = new Set();
    postData.forEach((post) => {
      if (post.likes && post.likes.includes(userData.name)) {
        initialLikedPosts.add(post.id);
      }
    });
    setLikedPosts(initialLikedPosts);



  }, [postData, userData.name]);



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
      await handleLikePost(postId, userData.name, false); // Update Firestore to unlike
    } else {
      newLikedPosts.add(postId); // Like
      await handleLikePost(postId, userData.name, true); // Update Firestore to like
    }

    setLikedPosts(newLikedPosts); // Update state
  };

  const handleCommentSubmit = async (postId) => {
    if (newComment[postId]) {
      await handleCommentPost(postId, userData.name, newComment[postId]);
      setNewComment({ ...newComment, [postId]: "" }); // Reset input field after submission
      // Optionally, you can fetch updated comments here
    }
  };

  const toggleCommentsVisibility = (postId) => {
    setVisibleComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };


  const handleViewProfile = (postDataUserID) => {
    navigate(`/profilepage/${postDataUserID}`);
  };


  return (
    <>
      {loadings ? (
        <div className="my-8">
          <LoadingComponent />
          <LoadingComponent />
          <LoadingComponent />
        </div>
      ) : postData.length === 0 ? (
        <div className="empty-state flex  items-center justify-center my-24">
          <div>
            <img src={NoPost} alt="" className=" h-44 w-auto" />
            <p className="text-gray-600 text-center font-extrabold text-4xl my-5">
              No posts found
            </p>
          </div>
        </div>
      ) : (
        postData.map((post) => (
          <div
            key={post.id}
            className={`bg-white ${postMode ? "max-w-[640px]" : "max-w-[640px]"
              } rounded-lg shadow-md mx-auto mt-16 mb-5 w-full
             md:w-10/12`}
          >
            <div className="p-4">
              <div onClick={() => handleViewProfile(post.userID)} className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div className="w-12 h-12  m-2">

                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={post.userProfileImage}
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {post.userName || userData.name}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {post.userRole || "unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Posted {formatTimestamp(post.createdAt)}
                    </p>
                  </div>
                </div>
                <div>
                  {isOwnProfile && (
                    <button
                      onClick={() => onDelete(post.id)}
                      className="text-red-600 font-medium hover:bg-red-100 px-3 py-1 rounded transition duration-300"
                    >
                      Delete
                    </button>
                  )}
                </div>

              </div>

              <p className="text-gray-700 text-base font-normal my-2">
                {post.content}
              </p>
              {post.imageUrl && (
                <div className="mb-4 flex justify-center">
                  <AsyncImage
                    src={post.imageUrl}
                    alt="Post content"
                    style={{ width: "100%", height: "auto", aspectRatio: 4 / 5, borderRadius: "10px" }}
                    loader={<div className="skeleton-image" />}
                    error={<img src={postImageError} alt='error' />}
                    Transition={props => <Blur radius={45} imeout={100}  {...props} />}
                  />
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <div>{(post.likes || []).length} likes</div>
                <div>{(post.comments || []).length || 0} Comments</div>
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="flex justify-around pt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center ${likedPosts.has(post.id) ? "text-blue-600" : "text-gray-600"
                    } hover:bg-gray-100 px-3 justify-center w-full py-2 rounded transition duration-300`}
                >
                  {likedPosts.has(post.id) ? <AiFillLike /> : <SlLike />}
                  <span className="mx-3"> Like </span>
                </button>

                <button
                  onClick={() => toggleCommentsVisibility(post.id)}
                  className="flex items-center text-gray-600 hover:bg-gray-100 px-3 justify-center w-full py-2 rounded transition duration-300"
                >
                  <FaRegComment />
                  <span className="mx-3"> Comment </span>
                </button>
              </div>
            </div>

            {/* Comment Section */}
            {visibleComments[post.id] && (
              <div className="mt-4">
                <div>
                  {(post.comments || []).map((comment, index) => (
                    <div key={index} className="text-gray-700 text-sm">
                      <span className="font-semibold">{comment.username}</span>:{" "}
                      {comment.text}
                    </div>
                  ))}
                </div>
                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment[post.id] || ""}
                    onChange={(e) =>
                      setNewComment({
                        ...newComment,
                        [post.id]: e.target.value,
                      })
                    }
                    className="border rounded px-3 py-1 w-full"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="ml-2 bg-blue-500 text-white rounded px-3 py-1"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
}

export default PostModel;
