import { Bell } from 'react-feather'

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: 'like', user: 'Emma Watson', action: 'liked your post', time: '2m ago' },
    { id: 2, type: 'comment', user: 'Tom Hardy', action: 'commented on your photo', time: '1h ago' },
    { id: 3, type: 'friend', user: 'Chris Evans', action: 'accepted your friend request', time: '3h ago' },
    { id: 4, type: 'mention', user: 'Scarlett Johansson', action: 'mentioned you in a comment', time: '1d ago' },
  ]

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return '❤️'
      case 'comment':
        return '💬'
      case 'friend':
        return '👥'
      case 'mention':
        return '@'
      default:
        return '🔔'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300">
                {getNotificationIcon(notification.type)}
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-medium">{notification.user}</span> {notification.action}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

