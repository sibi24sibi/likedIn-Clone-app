import { useState } from 'react';
import { Home, User, MessageSquare, Bell, UserPlus } from 'react-feather';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Sidebar({ className }) {
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(5);

  const navigation = [
    { name: 'Home', icon: Home, to: '/home', unread: null },
    { name: 'Profile', icon: User, to: '/profile', unread: null },
    { name: 'Messages', icon: MessageSquare, to: '/messages', unread: unreadMessages },
    { name: 'Notifications', icon: Bell, to: '/notifications', unread: unreadNotifications },
    { name: 'Add Friends', icon: UserPlus, to: '/friends', unread: null },
  ];

  return (
    <div className={className}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow sticky top-5">
        <div className="text-center mb-6">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="font-semibold text-gray-900 dark:text-white">Robert Fox</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Software Engineer</p>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to} // Use the "to" property instead of "href"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 
                text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
              `}
              title={item.unread ? `${item.name} - ${item.unread} unread` : item.name}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.name}</span>
              {item.unread && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.unread}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
