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
    <div className="min-h-screen bg-gray-950">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          user={user}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      </div>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Main Content */}
      <main className={`
        pt-16 
        ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-16'} 
        transition-all duration-300
      `}>
        {children}
      </main>
    </div>
  )
} 