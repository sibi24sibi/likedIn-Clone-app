import React, { useEffect, useState } from "react";
import ProfileSection from "../Components/ProfileSection";
import PostModel from "../Components/PostModel";
import { useAuth } from "../Api/AuthApi";
import { DeleconfModal } from "../Components/Modals/DeleconfModal";
import { handleDeletePost, listenToSingleUser } from "../Api/UploadApi";
import { ProfileFormModal } from "../Components/Modals/ProfileFormModal";
import { listenToSinglePost } from "../Api/UploadApi";
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [otherUserPosts, setOtherUserPosts] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // For ProfileFormModal
  const [openModal, setOpenModal] = useState(false); // For Delete Confirmation
  const [selectedPostId, setSelectedPostId] = useState(null);

  const { userData } = useAuth();
  const { profileId } = useParams(); // `profileId` is undefined if URL is `/profile`

  const isOwnProfile = !profileId; // Check if we're on our own profile

  // Load either the authenticated user's posts or the specified user's posts
  useEffect(() => {
    setLoading(true);
    const unsubscribePosts = isOwnProfile
      ? listenToSinglePost(setPosts, userData?.userID)
      : listenToSinglePost(setOtherUserPosts, profileId);

    setLoading(false);
    return () => unsubscribePosts();
  }, [isOwnProfile, userData?.userID, profileId]);

  console.log(otherUser);
  useEffect(() => {
    if (profileId) {
      const unsubscribeUser = listenToSingleUser(setOtherUser, profileId);
      return () => unsubscribeUser();
    }
  }, [profileId]);

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
      closeDeleteModal();
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <ProfileSection profileData={isOwnProfile ? userData : otherUser} isOwnProfile={isOwnProfile} />
      </div>
      <div className="flex flex-col mx-4">
        <PostModel
          postData={isOwnProfile ? posts : otherUserPosts}
          loadings={loading}
          postMode={isOwnProfile ? posts.length > 0 : otherUserPosts.length > 0}
          onDelete={openDeleteModal}
          isOwnProfile={isOwnProfile}
        />
        <DeleconfModal
          open={openModal}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
        <ProfileFormModal setOpen={setOpen} open={open} />
      </div>
    </div>
  );
};
