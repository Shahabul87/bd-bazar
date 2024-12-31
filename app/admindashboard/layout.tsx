"use client"

import { Sidebar } from "./_components/sidebar"
import { Header } from "./_components/header"
import { useState } from "react"

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="h-16 fixed top-0 left-0 right-0 border-b border-gray-700 bg-gray-900">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className={`pt-16 ${isSidebarOpen ? 'pl-64' : 'pl-16'} transition-all duration-300`}>
        {children}
      </main>
    </div>
  )
} 