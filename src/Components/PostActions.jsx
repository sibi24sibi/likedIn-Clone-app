import React, { useEffect, useState } from 'react'
import { ThumbsUp, MessageCircle } from 'react-feather';
import { handleLikePost } from '../Api/UploadApi';
import { useAuth } from '../Api/AuthApi';
import LikedButtonCheckbox from './ui/LikeButton';

export const PostActions = ({ postId, toggleComments, postData }) => {

    const { userData } = useAuth();

    const [likedPosts, setLikedPosts] = useState(new Set());

    // useEffect(() => {
    //     const initialLikedPosts = new Set();
    //     postData.forEach((post) => {
    //         if (post.likes && post.likes.includes(userData.name)) {
    //             initialLikedPosts.add(post.id);
    //         }
    //     });
    //     setLikedPosts(initialLikedPosts);



    // }, [postData, userData?.name]);

    const handleLike = async (postId) => {
        try {
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
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };


    return (
        <div>
            {/* Post Actions */}
            <div className="flex items-center gap-4">
                <button onClick={() => handleLike(postId)} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">

                    <ThumbsUp className={`w-5 h-5 ${likedPosts.has(postId) ? 'fill-blue-500' : ''}`} />
                    <span>{likedPosts.has(postId) ? 'Unlike' : 'Like'}</span>

                </button>
                <button onClick={() => toggleComments(postId)} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment</span>
                </button>
            </div>
        </div>
    )
}
