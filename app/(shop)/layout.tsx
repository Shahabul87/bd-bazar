import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login"
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
      <HeaderAfterLogin />
      <main>
        {children}
      </main>
    </div>
  )
} 