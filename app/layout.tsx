import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import clsx from "clsx";
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from "@/components/ui/sonner";
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/app/styles/editor.css';

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'iSham',
  description: 'Created by S Alam',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: 'iSham',
    description: 'Created by S Alam',
    url: 'https://your-domain.com',
    siteName: 'iSham',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await auth();
 

  return (
   <SessionProvider session={session}>
      <html lang="en" className="relative">
        <body className={clsx(dmSans.className, "antialiased bg-gray-800")}>
          <ThemeProvider>
            <ConfettiProvider />
            <Toaster />
           
            <main className ="">             
                {children}
            </main> 
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
   </SessionProvider>

 
  )
}
