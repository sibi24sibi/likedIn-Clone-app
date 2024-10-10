import React, { useEffect, useState } from "react";
import { firestore } from "../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { defaultProfile } from "../assets/assets";
import { useAuth } from "../Api/AuthApi";
import { Button, Modal } from "flowbite-react";
import { formatTimestamp } from "../assets/assets";
import { handleDeletePost } from "../Api/UploadApi";
import "./Skeleton.css";

function PostModel() {
  const { userData } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const postsQuery = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openDeleteModal = (postId) => {
    setSelectedPostId(postId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setOpenModal(false);
    setSelectedPostId(null);
  };

  const confirmDelete = async () => {
    if (selectedPostId) {
      await handleDeletePost(selectedPostId);
      closeDeleteModal(); // Close modal after deletion
    }
  };

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

  return (
    <>
      {loading ? (
        <>
          <LoadingComponent />
          <LoadingComponent />
          <LoadingComponent />
        </>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md mx-auto max-w-[540px] w-full"
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
                    <h3 className="font-semibold text-gray-900">
                      {userData.name}
                    </h3>
                    <p className="text-sm text-gray-600">{userData.role}</p>
                    <p className="text-xs text-gray-500">
                      Posted {formatTimestamp(post.createdAt)}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => openDeleteModal(post.id)}
                    className="text-red-600 font-medium hover:bg-red-100 px-3 py-1 rounded transition duration-300"
                  >
                    Delete
                  </button>
                  <button className="text-blue-600 font-medium hover:bg-blue-100 px-3 py-1 rounded transition duration-300">
                    + Follow
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-base font-normal my-2">
                {post.content}
              </p>
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
                <div>{post.likes || 0} likes</div>
                <div>{post.comments || 0} Comments</div>
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="flex justify-around pt-2">
                <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-2 rounded transition duration-300">
                  Like
                </button>
                <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-2 rounded transition duration-300">
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <Modal show={openModal} onClose={closeDeleteModal} className="  py-36">
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmDelete}  color="red">
            Yes, delete it
          </Button>
          <Button onClick={closeDeleteModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostModel;
