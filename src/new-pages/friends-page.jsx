import { UserPlus } from 'react-feather'

export default function FriendsPage() {
  const recommendations = [
    {
      name: 'Olivia Anderson',
      role: 'Financial Analyst',
      image: 'https://i.pravatar.cc/150?img=16',
      mutualFriends: 8,
      profession: 'Finance'
    },
    {
      name: 'Thomas Baker',
      role: 'Project Manager',
      image: 'https://i.pravatar.cc/150?img=7',
      mutualFriends: 15,
      profession: 'Management'
    },
    {
      name: 'Lily Lee',
      role: 'Graphic Designer',
      image: 'https://i.pravatar.cc/150?img=8',
      mutualFriends: 5,
      profession: 'Design'
    },
    {
      name: 'Andrew Harris',
      role: 'Data Scientist',
      image: 'https://i.pravatar.cc/150?img=9',
      mutualFriends: 12,
      profession: 'Data Science'
    }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Friend Recommendations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((person) => (
          <div key={person.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={person.image} alt="" className="w-full h-32 object-cover" />
            <div className="p-4 w-max">
              <h3 className="font-semibold text-gray-900 dark:text-white">{person.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{person.role}</p>
              <div className="mt-4  ">
                {/* <span className="text-xs text-gray-500 dark:text-gray-400">{person.mutualFriends} mutual friends</span> */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded-full flex items-center space-x-1 transition-colors duration-200 ">
                  <UserPlus className="w-4 h-4" />
                  <span>Follow</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

