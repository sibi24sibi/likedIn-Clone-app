import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle, MoreHorizontal } from 'react-feather';
import moment from 'moment';
import { useAuth } from '../Api/AuthApi';
import { listenToAllPosts, listenToSingleUser, listenToSingleUserPost, listenToUsers } from '../Api/UploadApi';

export const Postcontent = ({ isOwnPost, isPublicPost }) => {

    const { userData: currentUser } = useAuth();


    const [userPost, setUserPost] = useState([]);
    const [otherUser, setOtherUser] = useState([]);

    const userData = isOwnPost ? currentUser : otherUser;

    useEffect(() => {
        
        if (isOwnPost && currentUser?.userID) {
            listenToSingleUserPost(setUserPost, currentUser.userID);
        } else if (!isOwnPost && otherUser?.userID) {
            listenToSingleUserPost(setUserPost, otherUser.userID);
        } else if (isPublicPost) {
            listenToAllPosts(setUserPost);
        }

    }, [isOwnPost, isPublicPost, currentUser?.userID, otherUser?.userID]);



    useEffect(() => {
        if (isPublicPost && userPost.length > 0) {
            const userIDs = userPost.map(post => post.userID);
            const uniqueUserIDs = [...new Set(userIDs)]; // To make sure we only have unique userIDs

            // Fetch user data for each userID in the list
            listenToUsers((usersData) => {
                const users = usersData.filter(user => uniqueUserIDs.includes(user.userID));

                // Accumulate the user data based on the posts' userIDs
                const usersDataForPost = users.map(user => ({
                    userID: user.userID,
                    name: user.name,
                    profilePic: user.profilePic
                }));

                setOtherUser(usersDataForPost); // Set the user data once all is collected
                console.log(userData);
            });
        }
    }, [isPublicPost, userPost]);


    if (!userPost) {
        return <div className="text-center text-gray-500 dark:text-gray-400 py-8">No posts available.</div>;
    }

    if (!userData) {
        return <div className="text-center text-gray-500 dark:text-gray-400 py-8">No user data available.</div>;
    }

    return (
        <div>
            {userPost.map((post) => {
                const postUser = otherUser.find(user => user.userID === post.userID) || userData;
                return (
                    <div key={post.postID} className="post-content">
                        {/* Post Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <div className="p-4">
                                {/* Post Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={postUser?.profilePic || 'https://placehold.co/100x100'} // Fallback for missing image
                                            alt={postUser?.name || 'User'}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <div className="items-center gap-2">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {postUser?.name || 'Unknown User'}
                                                </span>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {/* Format createdAt if it's an object */}
                                                    {moment(post.createdAt.seconds * 1000).fromNow()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Post Content */}
                                <p className="text-gray-900 dark:text-white mb-4">
                                    {post.content || 'No content available.'}
                                </p>

                                {/* Post Image */}
                            {post.imageUrl && 
                                    <img
                                        src={post.imageUrl || 'https://placehold.co/600x400'} // Fallback image
                                        alt="Post"
                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                    />
                            }

                                {/* Post Actions */}
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                        <ThumbsUp className="w-5 h-5" />
                                        <span>Like</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                        <MessageCircle className="w-5 h-5" />
                                        <span>Comment</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900">
                                {/* Comment Input */}
                                <div className="flex gap-3 mb-4">
                                    <img
                                        src={currentUser?.profilePic}
                                        alt="Your profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Share your thoughts here..."
                                        className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Comments List */}
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <img
                                            src="https://i.pravatar.cc/150?img=19"
                                            alt="Daniel Brown"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        Daniel Brown
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Digital Marketer
                                                    </span>
                                                </div>
                                                <p className="text-gray-900 dark:text-white text-sm">
                                                    Fantastic post! Your content always brings a smile to my face. Keep up the great work! 👏
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 ml-3">
                                                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                                    Reply
                                                </button>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    2 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    );
};
