import React from 'react'
import { useAuth } from '../Api/AuthApi';

export const CommentsComponent = () => {

    const { userData } = useAuth();


    return (
        <>
            {/* Comments Section */}
            <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                    {/* Comment Input */}
                    <div className="flex gap-3 mb-4">
                        <img
                            src={userData?.profilePic}

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
        </>
    )
}
