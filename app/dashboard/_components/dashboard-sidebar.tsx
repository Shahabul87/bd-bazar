"use client";

import { User } from "@prisma/client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  ShoppingBag, 
  Users, 
  BarChart2, 
  Settings, 
  Package, 
  Truck, 
  Tag, 
  MessageSquare, 
  BrainCircuit,
  ChevronRight,
  Store,
  MenuIcon,
  X
} from 'lucide-react';

interface DashboardSidebarProps {
  user: User | undefined;
}

export const DashboardSidebar = ({ user }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  const NavItem = ({ 
    href, 
    icon: Icon, 
    label, 
    badge 
  }: { 
    href: string; 
    icon: React.ElementType; 
    label: string; 
    badge?: number 
  }) => (
    <Link 
      href={href}
      className={`
        flex items-center px-4 py-3 rounded-lg transition-colors
        ${isActive(href) 
          ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white' 
          : 'text-slate-400 hover:bg-slate-700/30 hover:text-white'}
      `}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && (
        <>
          <span className="ml-3">{label}</span>
          {badge !== undefined && (
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
              isActive(href) ? 'bg-purple-600/60 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
  
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-4 py-6">
        <Link 
          href="/dashboard" 
          className="flex items-center"
        >
          <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
            <Store className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">AI Commerce</h1>
              <p className="text-xs text-slate-400">Seller Dashboard</p>
            </div>
          )}
        </Link>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 px-2">
        <div className="space-y-1">
          <NavItem href="/dashboard" icon={Home} label="Overview" />
          <NavItem href="/dashboard/products" icon={Package} label="Products" badge={24} />
          <NavItem href="/dashboard/orders" icon={ShoppingBag} label="Orders" badge={3} />
          <NavItem href="/dashboard/customers" icon={Users} label="Customers" />
          <NavItem href="/dashboard/analytics" icon={BarChart2} label="Analytics" />
          <NavItem href="/dashboard/marketing" icon={Tag} label="Marketing" />
          <NavItem href="/dashboard/shipping" icon={Truck} label="Shipping" />
        </div>

        <div className="mt-8 mb-4">
          <p className={`px-4 py-2 text-xs font-semibold text-slate-500 uppercase ${collapsed ? 'sr-only' : ''}`}>
            AI Tools
          </p>
          <div className="space-y-1">
            <NavItem href="/dashboard/ai-assistant" icon={BrainCircuit} label="AI Assistant" />
            <NavItem href="/dashboard/insights" icon={ChevronRight} label="Smart Insights" />
            <NavItem href="/dashboard/chat" icon={MessageSquare} label="Customer Chat" badge={2} />
          </div>
        </div>
      </div>
      
      {/* Bottom */}
      <div className="p-4 border-t border-slate-700/50">
        <NavItem href="/dashboard/settings" icon={Settings} label="Settings" />
      </div>
      
      {/* Collapse Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute right-0 transform translate-x-1/2 top-20 bg-slate-700 rounded-full p-1.5 text-slate-400 hover:text-white"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4 rotate-180" />
        )}
      </button>
    </>
  );
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-800 rounded-md p-2 text-slate-300 hover:text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>
      
      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-slate-800 z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}
      
      {/* Desktop Sidebar */}
      <div className={`
        hidden md:flex flex-col bg-slate-800 border-r border-slate-700/50 overflow-y-auto relative
        ${collapsed ? 'w-16' : 'w-64'}
        transition-all duration-300
      `}>
        <SidebarContent />
      </div>
    </>
  );
}; 