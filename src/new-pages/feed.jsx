
import { ThumbsUp, MessageCircle, Image, MoreHorizontal } from 'react-feather'
import { PostCreation } from '../new-components/post-creation'

export default function FeedPage() {
  return (
  
      <div className="space-y-6">
        {/* Post Creation */}
   
        <PostCreation/>
        {/* Posts Feed */}
        <div className="space-y-6">
          {/* Post 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                  src="https://i.pravatar.cc/150?img=7"
                    alt="Bessie Cooper"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Bessie Cooper
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Digital Marketer
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      7 hours ago
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-900 dark:text-white mb-4">
                In today's fast-paced, digitally driven world, digital marketing is not just a
                strategy, it's a necessity for businesses of all sizes. 🚀
              </p>
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

            {/* Comments */}
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="p-4 bg-gray-50 dark:bg-gray-900">
                {/* Comment Input */}
                <div className="flex gap-3 mb-4">
                  <img
                  src="https://i.pravatar.cc/150?img=3"
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
                          Fantastic post! Your content always brings a smile to my face. Keep up
                          the great work! 👏
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

          {/* Post 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                  src="https://i.pravatar.cc/150?img=30"
                    alt="Jacob Jones"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Jacob Jones
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Sales Manager
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      1 day ago
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-900 dark:text-white mb-4">
                Prepare to be dazzled by our latest collection! From trendy fashion to
                must-have gadgets, we've got something for everyone.
              </p>
              <img
              src="https://placehold.co/600x400"
                alt="Product"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
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
        </div>
      </div>

  )
}

