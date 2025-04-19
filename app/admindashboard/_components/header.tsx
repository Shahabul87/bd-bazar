"use client"

import { useState } from "react"
import { Search, MenuIcon, Bell, User, LogOut, Settings } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onMenuClick: () => void;
  user: any; // Replace with your user type
}

export const Header = ({ onMenuClick, user }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 bg-gray-900 border-b border-gray-700">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:flex p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 px-4 pl-10 bg-gray-800 border border-gray-700 rounded-lg
              text-gray-300 focus:outline-none focus:border-gray-600"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-800 rounded-lg relative"
          >
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-700">
                <h3 className="font-medium text-white">Notifications</h3>
              </div>
              <div className="px-4 py-2 text-sm text-gray-400">
                No new notifications
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-gray-800 rounded-lg p-2"
          >
            <Image
              src={user.image || "/placeholder-avatar.jpg"}
              alt={user.name || "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="text-sm text-gray-300">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => router.push('/admindashboard/profile')}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                onClick={() => router.push('/admindashboard/settings')}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <div className="border-t border-gray-700 my-1" />
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 