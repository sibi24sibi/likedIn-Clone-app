import React from 'react'

const PostLoading = () => {
  return (
    <div>
          <div key="skeleton-post" class="post-content animate-pulse">

              <div class="bg-gray-200 dark:bg-gray-800 rounded-lg shadow">
                  <div class="p-4">

                      <div class="flex items-center justify-between mb-4">
                          <div class="flex items-center gap-3">
                              <div class="w-10 h-10 rounded-full bg-gray-300"></div>
                              <div>
                                  <div class="items-center gap-2">
                                      <span class="font-medium text-gray-900 dark:text-white">
                                          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                                      </span>
                                      <div class="text-sm text-gray-500 dark:text-gray-400">
                                          <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                              <div class="w-5 h-5 bg-gray-300 rounded"></div>
                          </div>
                      </div>


                      <p class="text-gray-900 dark:text-white mb-4">
                          <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
                          <div class="h-4 bg-gray-300 rounded w-2/3"></div>
                      </p>

                      <div class="w-full h-64 bg-gray-300 rounded-lg mb-4">
                      </div>


                      <div class="flex items-center gap-4">
                          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 h-5 w-12 rounded">
                          </div>
                          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 h-5 w-20 rounded">
                          </div>
                      </div>
                  </div>
              </div>


              <div class="border-t border-gray-200 dark:border-gray-700">
                  <div class="p-4 bg-gray-50 dark:bg-gray-900">

                      <div class="flex gap-3 mb-4">
                          <div class="w-8 h-8 rounded-full bg-gray-300"></div>
                          <div class="flex-1 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 h-4">
                          </div>
                      </div>


                      <div class="space-y-4">
                          <div class="flex gap-3">
                              <div class="w-8 h-8 rounded-full bg-gray-300"></div>
                              <div class="flex-1">
                                  <div class="bg-white dark:bg-gray-800 rounded-lg p-3 h-16">
                                  </div>
                                  <div class="flex items-center gap-4 mt-2 ml-3 h-6">
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default PostLoading