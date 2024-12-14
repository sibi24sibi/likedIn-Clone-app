import { Plus } from 'react-feather'
import { listenToUsers } from '../Api/UploadApi'
import { useEffect, useState } from 'react'

export default function SuggestedFriends({ className }) {


  const [suggestionData, setSuggestionData] = useState([])

  useEffect(() => {
    listenToUsers(setSuggestionData)
  }, []);

  console.log(suggestionData?.name)

  return (
    <div className={className}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow sticky top-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Suggested Friends
        </h3>
        <div className="space-y-4">
          {suggestionData.slice(0, 7).map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <div className="skeleton-circle h-10 w-10">
                <img
                  src={person.profilePic}

                  className="w-full h-full p-[1px] object-cover rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {person.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {person.role}
                </p>
              </div>
              <button className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

