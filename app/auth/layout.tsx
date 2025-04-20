import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import { LanguageProvider } from "@/app/context/LanguageContext"

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <ThemeProvider attribute="class" defaultTheme="dark">
        <LanguageProvider>
          {/* HeaderAfterLogin is a server component */}
          <HeaderAfterLogin />
          <main className="h-full">
            {children}
          </main>
          <ConfettiProvider />
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    </div>
  )
} 