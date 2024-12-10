import { Search, LogOut, Moon, Sun } from 'react-feather'
import { useAuth } from "../Api/AuthApi";

export default function TopNav({ isDark, setIsDark }) {

  const { logout} = useAuth()
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
          <span className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:inline">Social</span>
        </div>
        
        <div className="flex-1 max-w-xl px-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <button  onClick={logout}className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <span className="hidden sm:inline">Logout</span>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}

