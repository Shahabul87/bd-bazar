import { MainHeader } from "@/app/(homepage)/main-header"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div>
      <MainHeader />
      <main>
        {children}
      </main>
    </div>
  )
} 