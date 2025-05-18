"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutGrid, ShoppingBag, Package2, BarChart3, Settings, 
  Users2, Truck, CreditCard, LayoutList, ShoppingCart 
} from "lucide-react";

interface SidebarRouteData {
  href: string;
  label: string;
  icon: string; // Icon name as string
}

interface SidebarProps {
  routesData: SidebarRouteData[];
  className?: string;
}

// Map icon names to actual icon components
const iconMap = {
  LayoutGrid: LayoutGrid,
  ShoppingBag: ShoppingBag,
  Package2: Package2,
  BarChart3: BarChart3,
  Settings: Settings,
  Users2: Users2,
  Truck: Truck,
  CreditCard: CreditCard,
  LayoutList: LayoutList,
  ShoppingCart: ShoppingCart,
};

export default function Sidebar({ routesData, className = "" }: SidebarProps) {
  const pathname = usePathname();
  
  // Function to render icon based on name
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="mr-2 h-4 w-4" /> : null;
  };
  
  return (
    <div className={`w-64 flex-col bg-slate-800 text-white ${className}`}>
      <div className="p-4">
        <h2 className="text-xl font-bold">Store Dashboard</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {routesData.map((route) => {
            const isActive = pathname === route.href;
            
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive 
                      ? "bg-slate-700 text-white" 
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {renderIcon(route.icon)}
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 