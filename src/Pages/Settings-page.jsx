import { useState } from "react"

export const Settingspage = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [notifications, setNotifications] = useState(true)
    
    return (
   
        <div className="space-y-6 m-5 p-5">
            {/* Profile Section */}
            <div className="text-center">
                <h2 className="text-lg font-semibold dark:text-gray-200 text-gray-900 mb-4">Account Information</h2>
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="relative">
                            <img
                                src="https://avatar.iran.liara.run/public/26"
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                            />
                            <label htmlFor="profile-pic" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16 10a6 6 0 11-12 0 6 6 0 0112 0z"></path></svg>
                                <input
                                    type="file"
                                    id="profile-pic"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm dark:text-gray-400 font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full px-4 dark:bg-gray-800 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white text-gray-900 dark:text-white placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm dark:text-gray-400 font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            defaultValue="johndoe_123"
                            className="w-full px-4 dark:bg-gray-800 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white text-gray-900 dark:text-white placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm dark:text-gray-400 font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            defaultValue="This is my bio."
                            rows="4"
                            className="w-full px-4 dark:bg-gray-800 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white text-gray-900 dark:text-white placeholder-gray-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm dark:text-gray-400 font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            defaultValue="New York, USA"
                            className="w-full px-4 dark:bg-gray-800 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white text-gray-900 dark:text-white placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm dark:text-gray-400 font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="w-full px-4 dark:bg-gray-800 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white text-gray-900 dark:text-white placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm dark:text-gray-400 font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            defaultValue="john@example.com"
                            className="w-full px-4 dark:bg-gray-800 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white text-gray-900 dark:text-white placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm dark:text-gray-400 font-medium text-gray-700 mb-1">Website Link</label>
                        <input
                            type="url"
                            defaultValue="https://johnswebsite.com"
                            className="w-full px-4 dark:bg-gray-800 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white text-gray-900 dark:text-white placeholder-gray-500"
                        />
                    </div>
                </div>
            </div>

            {/* Preferences Section */}
            <div>
                <h2 className="text-lg font-semibold dark:text-gray-300 text-gray-900 mb-4">Preferences</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm dark:text-gray-400 font-medium text-gray-700">Enable Notifications</h3>
                            <p className="text-sm dark:text-gray-500 text-gray-500">Receive notifications about your account</p>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${notifications ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${notifications ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700">Dark Mode</h3>
                            <p className="text-sm text-gray-500">Switch to dark theme</p>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
            </button>
        </div>



  )
}
