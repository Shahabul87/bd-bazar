"use client"

import { useState } from "react"
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown,
  Menu as MenuIcon
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onMenuClick: () => void
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Order",
      message: "You have received a new order #1234",
      time: "5 minutes ago",
      read: false
    },
    {
      id: "2",
      title: "Low Stock Alert",
      message: "Product 'Wireless Headphones' is running low",
      time: "1 hour ago",
      read: true
    }
  ]

  const handleLogout = () => {
    // Implement logout logic
    router.push("/login")
  }

  const handleSettingsClick = () => {
    router.push("/admindashboard/settings")
  }

  const handleProfileClick = () => {
    router.push("/admindashboard/profile")
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-800 rounded-lg lg:hidden"
            aria-label="Toggle menu"
          >
            <MenuIcon className="h-5 w-5 text-gray-400" />
          </button>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-800 rounded-lg relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-400" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <h3 className="font-medium text-white">Notifications</h3>
                </div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-700 cursor-pointer ${
                      !notification.read ? 'bg-gray-750' : ''
                    }`}
                  >
                    <p className="font-medium text-white">{notification.title}</p>
                    <p className="text-sm text-gray-400">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-gray-800 rounded-lg p-2"
              aria-label="User menu"
            >
              <Image
                src="https://picsum.photos/seed/admin/32/32"
                alt="User avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-white hidden md:block">Admin User</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={handleSettingsClick}
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <div className="border-t border-gray-700 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 