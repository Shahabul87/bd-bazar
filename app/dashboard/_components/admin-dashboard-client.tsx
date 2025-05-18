"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface AdminDashboardClientProps {
  children: React.ReactNode
  user: any // Replace with your user type
}

export const AdminDashboardClient = ({ 
  children,
  user 
}: AdminDashboardClientProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-950 border-t border-white/10">

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Main Content */}
      <main className={`
        ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-16'} 
        transition-all duration-300
      `}>
        {children}
      </main>
    </div>
  )
} 