import { Plus } from 'react-feather'

export default function SuggestedFriends({ className }) {
  const suggestions = [
    {
      name: 'Olivia Anderson',
      role: 'Financial Analyst',
      image: 'https://i.pravatar.cc/150?img=56'
    },
    {
      name: 'Thomas Baker',
      role: 'Project Manager',
      image: 'https://i.pravatar.cc/150?img=32'
    },
    {
      name: 'Lily Lee',
      role: 'Graphic Designer',
      image: 'https://i.pravatar.cc/150?img=34'
    },
    {
      name: 'Andrew Harris',
      role: 'Data Scientist',
      image: 'https://i.pravatar.cc/150?img=31'
    }
  ]

  return (
    <div className={className}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow sticky top-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Suggested Friends
        </h3>
        <div className="space-y-4">
          {suggestions.map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <img
                src={person.image}
                alt={person.name}
                className="w-10 h-10 rounded-full"
              />
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

