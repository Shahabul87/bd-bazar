"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Truck,
  Tag,
  DollarSign,
  Settings,
  ChevronDown,
  ChevronRight,
  Store,
  FolderTree,
  Archive,
  MenuIcon,
  X
} from "lucide-react"

interface SubMenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

interface MenuItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: number
  submenu?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admindashboard"
  },
  {
    title: "Store",
    icon: Store,
    href: "/admindashboard/store",
    submenu: [
      { 
        title: "Store Overview", 
        href: "/admindashboard/store",
        icon: Store 
      },
      { 
        title: "Products", 
        href: "/admindashboard/store/products",
        icon: Package 
      },
      { 
        title: "Categories", 
        href: "/admindashboard/store/categories",
        icon: FolderTree 
      },
      { 
        title: "Inventory", 
        href: "/admindashboard/store/inventory",
        icon: Archive 
      }
    ]
  },
  {
    title: "Orders",
    icon: Package,
    href: "/admindashboard/orders",
    badge: 5,
    submenu: [
      { title: "All Orders", href: "/admindashboard/orders/all" },
      { title: "Pending", href: "/admindashboard/orders/pending", badge: 3 },
      { title: "Completed", href: "/admindashboard/orders/completed" },
      { title: "Cancelled", href: "/admindashboard/orders/cancelled" }
    ]
  },
  {
    title: "Delivery",
    icon: Truck,
    href: "/admindashboard/delivery",
    submenu: [
      { title: "Tracking", href: "/admindashboard/delivery" },
      { title: "Arrangements", href: "/admindashboard/delivery/arrangements" },
      { title: "Bulk Shipping", href: "/admindashboard/delivery/bulk-shipping" }
    ]
  },
  {
    title: "Promotions",
    icon: Tag,
    href: "/admindashboard/promotions",
    badge: 2
  },
  {
    title: "Transactions",
    icon: DollarSign,
    href: "/admindashboard/transactions"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admindashboard/settings"
  }
]

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <>
      {/* Toggle Button */}
      <div className="">
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-50 p-2 bg-gray-900 rounded-lg text-gray-400 
          hover:text-white hover:bg-gray-800 transition-colors"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MenuIcon className="h-5 w-5" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300
        border-r border-gray-700 bg-gray-900 flex flex-col overflow-y-auto
        ${isOpen ? 'w-64' : 'w-0'}
      `}>
        <div className="flex-1 px-3 py-2 mt-20">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.title} className={!isOpen ? 'hidden' : ''}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm 
                        rounded-lg transition-colors ${
                          pathname.startsWith(`/admindashboard/${item.title.toLowerCase()}`)
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {openSubmenu === item.title ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    {openSubmenu === item.title && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((submenuItem) => (
                          <Link
                            key={submenuItem.href}
                            href={submenuItem.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg 
                              transition-colors ${
                                pathname === submenuItem.href
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                              }`}
                          >
                            <submenuItem.icon className="h-4 w-4" />
                            <span>{submenuItem.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg 
                      transition-colors ${
                        pathname === item.href
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
      </div>
    </>
  )
} 