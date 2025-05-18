"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutGrid, ShoppingBag, Settings, Users, FileText, 
  Home, CreditCard, PieChart, User as UserIcon,
  Menu, X
} from "lucide-react";
import { User } from "@prisma/client";

interface DashboardSidebarProps {
  user: User;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutGrid size={18} />
    },
    {
      href: "/dashboard/stores",
      label: "My Stores",
      icon: <ShoppingBag size={18} />
    },
    {
      href: "/dashboard/orders",
      label: "Orders",
      icon: <CreditCard size={18} />
    },
    {
      href: "/dashboard/content",
      label: "Content",
      icon: <FileText size={18} />
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: <PieChart size={18} />
    },
    {
      href: "/dashboard/customers",
      label: "Customers",
      icon: <Users size={18} />
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: <UserIcon size={18} />
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings size={18} />
    }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden fixed top-20 left-4 z-50 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - desktop: permanent, mobile: slide in/out */}
      <aside 
        className={`
          fixed top-0 left-0 min-h-screen z-40 bg-slate-800 border-r border-slate-700
          md:sticky md:translate-x-0 md:block md:w-64 md:z-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full'} 
          pt-16 md:pt-0
        `}
      >
        {/* User info */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-white font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-slate-400 text-xs truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-3 overflow-y-auto pb-20" style={{ height: 'calc(100vh - 180px)' }}>
          <ul className="space-y-1">
            {routes.map((route) => {
              // Only highlight exact matches or child routes if not a parent route
              let isActive = false;
              
              if (route.href === "/dashboard") {
                // Only highlight dashboard if we're exactly on the dashboard page
                isActive = pathname === "/dashboard";
              } else {
                // For other routes, highlight if current path exactly matches or is a direct child
                // But don't highlight parent routes when on a child route of a different section
                const isExactMatch = pathname === route.href;
                const isChildRoute = pathname.startsWith(`${route.href}/`);
                
                // Determine if this is the most specific matching route
                isActive = isExactMatch || (isChildRoute && !routes.some(r => 
                  r.href !== route.href && 
                  pathname.startsWith(`${r.href}/`) && 
                  r.href.length > route.href.length
                ));
              }
              
              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`
                      flex items-center px-3 py-2.5 rounded-lg text-sm font-medium 
                      ${isActive 
                        ? "bg-indigo-900/50 text-indigo-300" 
                        : "text-slate-300 hover:bg-indigo-900/30 hover:text-white"
                      }
                      transition-colors
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`${isActive ? "text-indigo-400" : "text-slate-400"} mr-3`}>
                      {route.icon}
                    </span>
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="fixed bottom-0 w-64 p-4 border-t border-slate-700 bg-slate-800">
          <Link 
            href="/"
            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-indigo-900/30 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Home size={18} className="mr-3 text-slate-400" />
            Back to Home
          </Link>
        </div>
      </aside>
    </>
  );
} 