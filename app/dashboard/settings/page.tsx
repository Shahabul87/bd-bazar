"use client"

import { useState } from "react"
import { 
  Bell, 
  Key, 
  User, 
  Store, 
  Truck, 
  CreditCard, 
  Users, 
  Search,
  Globe,
  Palette,
  Clock,
  Mail,
  Phone
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface SettingsMenuItem {
  label: string
  href: string
  description: string
  icon: any
}

const settingsMenu: SettingsMenuItem[] = [
  {
    label: "Store Settings",
    href: "/admindashboard/settings/store",
    description: "Manage store information and branding",
    icon: Store
  },
  {
    label: "Payment Settings",
    href: "/admindashboard/settings/payment",
    description: "Configure payment methods and processing",
    icon: CreditCard
  },
  {
    label: "User Roles",
    href: "/admindashboard/settings/roles",
    description: "Manage admin roles and permissions",
    icon: Users
  },
  {
    label: "SEO Settings",
    href: "/admindashboard/settings/seo",
    description: "Optimize your store for search engines",
    icon: Globe
  }
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>("store")

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-400">Manage your store settings and configurations</p>
        </div>
      </div>

      {/* Settings Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsMenu.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-900/50">
                <item.icon className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">{item.label}</h3>
                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Settings Section */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
        <h2 className="text-lg font-medium mb-4">Quick Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter store name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter contact email"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Currency</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Zone</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-4 (Atlantic Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 