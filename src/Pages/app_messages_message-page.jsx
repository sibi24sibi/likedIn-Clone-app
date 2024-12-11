import { MessageCircle, Search } from 'react-feather'
import { Link } from 'react-router-dom'


export default function MessagesPage() {

  
 
  const messages = [
    { id: 1, name: 'Alice Johnson', message: 'Hey, how are you doing?', time: '2m ago', unread: true },
    { id: 2, name: 'Bob Smith', message: 'Did you see the latest project update?', time: '1h ago', unread: true },
    { id: 3, name: 'Charlie Brown', message: 'Let\'s catch up soon!', time: '3h ago', unread: false },
    { id: 4, name: 'Diana Prince', message: 'Thanks for your help yesterday.', time: '1d ago', unread: false },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Messages</h1>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="space-y-4">
        {messages.map((message) => (
          <Link to={`/messages/${message.id}`} key={message.id}>
            <div className={`flex items-center p-3 rounded-lg ${message.unread ? 'bg-blue-50 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              <div className="flex-shrink-0 mr-3">
                <img src={`https://i.pravatar.cc/40?img=${message.id}`} alt={message.name} className="w-10 h-10 rounded-full" />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{message.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{message.message}</p>
              </div>
              <div className="flex-shrink-0 ml-3 text-xs text-gray-500 dark:text-gray-400">
                {message.time}
              </div>
              {message.unread && (
                <div className="flex-shrink-0 ml-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

