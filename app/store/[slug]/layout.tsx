import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Store | Bazar E-Commerce",
  description: "View store details and products",
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1">{children}</main>
    </div>
  )
} 