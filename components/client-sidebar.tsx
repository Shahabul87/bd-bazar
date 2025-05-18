"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutGrid, ShoppingBag, Package2, BarChart3, Settings, 
  Users2, Truck, CreditCard, LayoutList, ShoppingCart,
  ChevronLeft, Store, LogOut
} from "lucide-react";

interface ClientSidebarProps {
  storeId: string;
  className?: string;
}

export default function ClientSidebar({ storeId, className = "" }: ClientSidebarProps) {
  const pathname = usePathname();
  
  // Define routes with React components directly (safe in client component)
  const routes = [
    {
      href: `/dashboard/stores/${storeId}`,
      label: "Overview",
      icon: <LayoutGrid size={18} />,
    },
    {
      href: `/dashboard/stores/${storeId}/products`,
      label: "Products",
      icon: <ShoppingBag size={18} />,
    },
    {
      href: `/dashboard/stores/${storeId}/categories`,
      label: "Categories",
      icon: <Package2 size={18} />,
    },
    {
      href: `/dashboard/stores/${storeId}/orders`,
      label: "Orders",
      icon: <ShoppingCart size={18} />,
    },
    {
      href: `/dashboard/stores/${storeId}/customers`,
      label: "Customers",
      icon: <Users2 size={18} />,
    },
    {
      href: `/dashboard/stores/${storeId}/shipping`,
      label: "Shipping",
      icon: <Truck size={18} />,
    },
    {
      href: `/dashboard/stores/${storeId}/analytics`,
      label: "Analytics",
      icon: <BarChart3 size={18} />,
    },
    {
      href: `/dashboard/stores/${storeId}/settings`,
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ];
  
  return (
    <aside className={`w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col ${className}`}>
      {/* Store header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center mb-6 mt-2">
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
            <Store size={18} className="text-white" />
          </div>
          <h1 className="ml-3 font-bold text-xl">Store</h1>
        </div>
        
        <Link 
          href="/dashboard/stores" 
          className="flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to stores
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-0.5">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg text-sm font-medium 
                  ${isActive 
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/30"
                  }
                  transition-colors
                `}
              >
                <span className={`${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"} mr-3`}>
                  {route.icon}
                </span>
                {route.label}
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* Bottom section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <Link 
          href="/dashboard/stores"
          className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/30"
        >
          <LogOut size={18} className="mr-3 text-slate-500 dark:text-slate-400" />
          Exit Store
        </Link>
      </div>
    </aside>
  );
} 