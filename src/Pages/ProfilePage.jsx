import React, { useEffect, useState } from 'react';
import ProfileSection from '../Components/ProfileSection';
import PostModel from '../Components/PostModel';
import { onSnapshot, query, where } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { firestore } from '../Firebase';
import { useAuth } from '../Api/AuthApi';
import { DeleconfModal } from '../Components/Modals/DeleconfModal';
import { handleDeletePost } from "../Api/UploadApi";
import { ProfileFormModal } from '../Components/Modals/ProfileFormModal';

export const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false); // For ProfileFormModal
    const [openModal, setOpenModal] = useState(false); // For Delete Confirmation
    const [selectedPostId, setSelectedPostId] = useState(null);

    const { userData } = useAuth();
    const postMode = true;

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

    useEffect(() => {
        if (userData?.userID) {
            const postCollection = collection(firestore, 'posts');
            const postQuery = query(postCollection, where('userID', "==", userData.userID));
            const unsubscribe = onSnapshot(postQuery, (snapshot) => {
                const fetchPosts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(fetchPosts);
                setLoading(false);
            }, (error) => {
                console.error(error);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [userData?.userID]);

    return (
        <div>
            <div>
                <div className='flex justify-center'>
                    <ProfileSection />
                </div>
                <div className='flex flex-col'>
                    <PostModel postData={posts} loadings={loading} postMode={postMode} onDelete={openDeleteModal} />
                    <DeleconfModal open={openModal} onClose={closeDeleteModal} onConfirm={confirmDelete} />
                    <ProfileFormModal setOpen={setOpen} open={open} />
                </div>
            </div>
        </div>
    );
}
