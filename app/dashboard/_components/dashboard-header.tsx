"use client";

import { User } from "@prisma/client";
import Link from 'next/link';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface DashboardHeaderProps {
  user: User | undefined;
  initialDateRange: string;
}

export const DashboardHeader = ({ 
  user,
  initialDateRange
}: DashboardHeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
    <header className="bg-slate-800/60 backdrop-blur-sm border-b border-slate-700/50 py-3 px-6 sticky top-0 z-40 flex items-center justify-between">
      {/* Left: Search */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Search products, orders, customers..."
          className="bg-slate-700/30 border border-slate-600/50 pl-10 pr-4 py-2 w-full rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
      
      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Date Range Selector */}
        <div className="hidden md:flex items-center">
          <select
            defaultValue={initialDateRange}
            className="bg-slate-700/30 border border-slate-600/50 rounded-lg text-sm text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="3m">Last 3 months</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="bg-slate-700/30 h-10 w-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-pink-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
              3
            </span>
          </button>
          
          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700/50 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-slate-700/50 flex justify-between items-center">
                <h3 className="font-bold text-white">Notifications</h3>
                <Link href="/dashboard/notifications" className="text-xs text-blue-400 hover:text-blue-300">
                  View All
                </Link>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-slate-700/30 hover:bg-slate-700/20">
                  <div className="flex items-start">
                    <div className="h-9 w-9 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-green-400 text-lg">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">New order received</p>
                      <p className="text-xs text-slate-500">Order #58729 - $125.00</p>
                      <p className="text-xs text-slate-600 mt-1">15 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b border-slate-700/30 hover:bg-slate-700/20">
                  <div className="flex items-start">
                    <div className="h-9 w-9 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-blue-400 text-lg">📊</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Sales reached daily target</p>
                      <p className="text-xs text-slate-500">Congratulations! You've hit your goal.</p>
                      <p className="text-xs text-slate-600 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-700/20">
                  <div className="flex items-start">
                    <div className="h-9 w-9 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-purple-400 text-lg">🤖</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">AI recommendation available</p>
                      <p className="text-xs text-slate-500">Product price optimization suggestions ready.</p>
                      <p className="text-xs text-slate-600 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Help */}
        <button className="bg-slate-700/30 h-10 w-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50">
          <HelpCircle className="h-5 w-5" />
        </button>
        
        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 bg-slate-700/30 p-1 pl-1 pr-3 rounded-full hover:bg-slate-700/50"
          >
            <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {user?.image ? (
                <Image 
                  src={user.image} 
                  alt={user?.name || 'User'} 
                  width={32}
                  height={32}
                  className="h-full w-full object-cover" 
                />
              ) : (
                <span className="text-sm font-bold text-white">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400">Store Owner</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          
          {/* User Menu Dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700/50 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-slate-700/50">
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || ''}</p>
              </div>
              <div>
                <Link href="/dashboard/settings/profile" className="block p-3 text-sm text-slate-300 hover:bg-slate-700/50">
                  Profile Settings
                </Link>
                <Link href="/dashboard/settings" className="block p-3 text-sm text-slate-300 hover:bg-slate-700/50">
                  Store Settings
                </Link>
                <Link href="/user" className="block p-3 text-sm text-slate-300 hover:bg-slate-700/50">
                  Switch to Buyer Mode
                </Link>
                <Link href="/api/auth/signout" className="block p-3 text-sm text-red-400 hover:bg-slate-700/50">
                  Sign Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}; 