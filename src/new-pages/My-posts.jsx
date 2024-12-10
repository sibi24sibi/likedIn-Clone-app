import React from 'react';
import { MessageCircle, ThumbsUp, Bookmark } from 'react-feather';

export const MyPosts = ({ posts }) => {
    return (
        <div>
            <div className="p-4 space-y-4">
                {/* Render savedPosts or default posts */}
                {(posts || []).map((post) => (
                    <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={post.profilePic}
                                alt={post.author}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white">{post.author}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</div>
                            </div>
                        </div>
                        <p className="text-gray-900 dark:text-white mb-4">{post.content}</p>
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
                ))}
            </div>
        </div>
    );
};
