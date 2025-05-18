'use client';

import Link from 'next/link';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  CreditCard,
  HelpCircle,
  BarChart3,
  LogOut,
  Store
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

interface DashboardSidebarProps {
  user: User | undefined;
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Navigation items with icons
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Products', href: '/dashboard/products', icon: Package },
    { label: 'Stores', href: '/dashboard/stores', icon: Store },
    { label: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { label: 'Customers', href: '/dashboard/customers', icon: Users },
    { label: 'Payments', href: '/dashboard/payments', icon: CreditCard },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    { label: 'Help', href: '/dashboard/help', icon: HelpCircle },
  ];

  return (
    <div 
      className={cn(
        "shrink-0 bg-slate-800 border-r border-t border-white/10 h-full overflow-y-auto flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 text-gray-400 hover:text-white self-end lg:hidden"
      >
        {collapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </button>
      
      {/* Logo */}
      <div className={cn(
        "flex items-center px-6 py-5",
        collapsed ? "justify-center" : ""
      )}>
        <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">i</span>
        </div>
        {!collapsed && <span className="ml-2 text-xl font-bold text-white">Dashboard</span>}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            // Safely check if current path is the item's path or a nested path under it
            const isActive = pathname === item.href || 
                            (pathname && item.href && item.href !== '/dashboard' && 
                             pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center py-3 px-6 text-gray-300 hover:bg-slate-700/50 hover:text-white transition-colors",
                    isActive ? "bg-slate-700/50 text-white border-r-2 border-blue-500" : "",
                    collapsed ? "justify-center px-3" : ""
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* User profile & logout */}
      <div className="border-t border-slate-700/50 py-4 px-6">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-400">{user?.email || ''}</p>
              </div>
            </div>
          )}
          
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })} 
            className={cn(
              "p-2 text-gray-400 hover:text-white rounded-full hover:bg-slate-700/50",
              collapsed ? "" : "ml-2"
            )}
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 