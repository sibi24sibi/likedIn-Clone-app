import { useEffect, useState } from "react";
import ProfileSection from "../Components/ProfileSection";
import PostModel from "../Components/PostModel";
import { useAuth } from "../Api/AuthApi";
import { ModalForm } from "../Components/Modals/Modal";
import { handleDeletePost, listenToSingleUser } from "../Api/UploadApi";
import { listenToSinglePost } from "../Api/UploadApi";
import { useParams } from "react-router-dom";

// import { ProfileFormModal } from './../Components/Modals/ProfileFormModal';
import { Button } from "flowbite-react";

export const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [otherUserPosts, setOtherUserPosts] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false); // For Delete Confirmation
  const [selectedPostId, setSelectedPostId] = useState(null);

  const { userData } = useAuth();
  const { profileId } = useParams();

  const isOwnProfile = !profileId;

  // Load either the authenticated user's posts or the specified user's posts
  useEffect(() => {
    setLoading(true);
    const unsubscribePosts = isOwnProfile
      ? listenToSinglePost(setPosts, userData?.userID)
      : listenToSinglePost(setOtherUserPosts, profileId);

    setLoading(false);
    return () => unsubscribePosts();
  }, [isOwnProfile, userData?.userID, profileId]);

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
          userDetail={otherUser}
          loadings={loading}
          postMode={isOwnProfile ? posts.length > 0 : otherUserPosts.length > 0}
          onDelete={openDeleteModal}
          isOwnProfile={isOwnProfile}
        />
        <ModalForm
          open={openModal}
          onClose={closeDeleteModal}
          modelTitle='Delete Post'
          modelDesc='Are you sure you want to delete this post?'
          modelFooter={<>
            <Button onClick={confirmDelete} color='red'>
              Delete
            </Button>
            <Button color="gray" onClick={closeDeleteModal}>cancel</Button>
          </>}

        />





      </div>
    </div>
  );
};
