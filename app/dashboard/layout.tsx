import { redirect } from "next/navigation"
import { currentUser } from '@/lib/auth'
import { AdminDashboardClient } from "./_components/admin-dashboard-client"
import { LanguageProvider } from "@/app/context/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Toaster } from "@/components/ui/sonner"

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  

  if (!user) {
    redirect("/")
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminDashboardClient user={user}>
          {children}
        </AdminDashboardClient>
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  )
} 