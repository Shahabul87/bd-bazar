import { redirect } from "next/navigation"
import { currentUser } from '@/lib/auth'
import { AdminDashboardClient } from "./_components/admin-dashboard-client"

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
    <AdminDashboardClient user={user}>
      {children}
    </AdminDashboardClient>
  )
} 