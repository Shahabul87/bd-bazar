"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutGrid, ShoppingBag, Package2, BarChart3, Settings, 
  Users2, Truck, ShoppingCart, ChevronLeft, Store, Menu
} from "lucide-react";
import { useState } from "react";

interface StoreTabsProps {
  storeId: string;
}

export default function StoreTabs({ storeId }: StoreTabsProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Define routes with React components directly
  const routes = [
    {
      href: `/dashboard/stores/${storeId}`,
      label: "Overview",
      icon: <LayoutGrid size={16} />,
      exact: true, // Only match exact path
    },
    {
      href: `/dashboard/stores/${storeId}/products`,
      label: "Products",
      icon: <ShoppingBag size={16} />,
    },
    {
      href: `/dashboard/stores/${storeId}/categories`,
      label: "Categories",
      icon: <Package2 size={16} />,
    },
    {
      href: `/dashboard/stores/${storeId}/orders`,
      label: "Orders",
      icon: <ShoppingCart size={16} />,
    },
    {
      href: `/dashboard/stores/${storeId}/customers`,
      label: "Customers",
      icon: <Users2 size={16} />,
    },
    {
      href: `/dashboard/stores/${storeId}/shipping`,
      label: "Shipping",
      icon: <Truck size={16} />,
    },
    {
      href: `/dashboard/stores/${storeId}/analytics`,
      label: "Analytics",
      icon: <BarChart3 size={16} />,
    },
    {
      href: `/dashboard/stores/${storeId}/settings`,
      label: "Settings",
      icon: <Settings size={16} />,
    },
  ];
  
  return (
    <div className="pt-4 sm:pt-6">
      {/* Back button and store identifier */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <Link 
          href="/dashboard/stores" 
          className="flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span className="hidden xs:inline">Back to stores</span>
          <span className="xs:hidden">Back</span>
        </Link>
        
        <div className="flex items-center">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center">
            <Store size={14} className="text-white" />
          </div>
          <h1 className="ml-2 font-medium text-base sm:text-lg">Store Manager</h1>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden ml-2 p-1.5 text-slate-500 hover:text-indigo-600 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
      </div>
      
      {/* Tab navigation - Desktop */}
      <div className="hidden md:block border-b border-slate-200 dark:border-slate-700">
        <nav className="flex -mb-px overflow-x-auto scrollbar-hide">
          {routes.map((route) => {
            // Improved active state detection logic
            const isActive = route.exact 
              ? pathname === route.href
              : pathname === route.href || pathname.startsWith(`${route.href}/`);
            
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`
                  whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-sm mr-6 sm:mr-8
                  flex items-center transition-colors
                  ${isActive 
                    ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400" 
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300"
                  }
                `}
              >
                <span className="mr-2">{route.icon}</span>
                {route.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tab navigation - Mobile dropdown */}
      <div className="md:hidden border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          {/* Show active route as main tab */}
          {routes.map((route) => {
            // Improved active state detection logic for mobile
            const isActive = route.exact 
              ? pathname === route.href
              : pathname === route.href || pathname.startsWith(`${route.href}/`);
            
            if (!isActive) return null;
            
            return (
              <Link
                key={route.href}
                href={route.href}
                className="flex-1 whitespace-nowrap py-3 px-1 border-b-2 border-indigo-500 font-medium text-sm text-indigo-600 dark:text-indigo-400 flex items-center"
              >
                <span className="mr-2">{route.icon}</span>
                {route.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="bg-white dark:bg-slate-800 shadow-md rounded-md mt-1 py-2 absolute z-50 left-2 right-2 border border-slate-200 dark:border-slate-700">
            {routes.map((route) => {
              // Improved active state detection logic for mobile dropdown
              const isActive = route.exact 
                ? pathname === route.href
                : pathname === route.href || pathname.startsWith(`${route.href}/`);
              
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-2 text-sm
                    flex items-center
                    ${isActive 
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" 
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/30"
                    }
                  `}
                >
                  <span className="mr-2">{route.icon}</span>
                  {route.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 