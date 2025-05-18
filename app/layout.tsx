import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import clsx from "clsx";
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from "@/components/ui/sonner";
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { CloudinaryProvider } from '@/components/providers/cloudinary-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/app/styles/editor.css';
import { MainFooter } from '@/app/(homepage)/main-footer'
import { CartProvider } from "@/providers/cart-provider"
import { LanguageProvider } from '@/app/context/LanguageContext';
import { MainHeader } from '@/app/(homepage)/main-header'

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Bazar | AI-Powered Shopping Experience in Bangladesh',
  description: 'Shop smart with Bazar - the AI-powered e-commerce platform offering personalized shopping experience in Bangladesh. Find electronics, fashion, home goods and more with bilingual support.',
  metadataBase: new URL('https://bazar.com.bd'),
  keywords: 'bazar, AI shopping, Bangladesh e-commerce, online shopping, bangla e-commerce, voice search, visual search, AI recommendations',
  robots: 'index, follow',
  authors: [{ name: 'S Alam' }],
  category: 'E-commerce',
  applicationName: 'Bazar',
  openGraph: {
    title: 'Bazar | AI-Powered E-commerce in Bangladesh',
    description: 'Discover the most advanced AI-powered e-commerce platform in Bangladesh with personalized recommendations, voice search, and visual search in both Bengali and English.',
    url: 'https://bazar.com.bd',
    siteName: 'Bazar',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bazar - AI-Powered E-commerce Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bazar | AI-Powered Shopping in Bangladesh',
    description: 'Shop smart with AI-powered recommendations, voice search and visual search - in Bengali and English',
    images: ['/images/twitter-image.jpg']
  },
  alternates: {
    languages: {
      'en-US': 'https://bazar.com.bd/en',
      'bn-BD': 'https://bazar.com.bd'
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider 
      session={session} 
      refetchInterval={0} 
      refetchOnWindowFocus={false}
    >
      <html lang="en" className="relative" suppressHydrationWarning>
        <body className={clsx(dmSans.className, "antialiased bg-gray-800")} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <LanguageProvider>
              <ConfettiProvider />
              <CloudinaryProvider />
              <Toaster />
              <CartProvider>
                <div className="flex flex-col min-h-screen">
                  <MainHeader />
                  <main className="flex-1">
                    {children}
                  </main>
                  <MainFooter />
                </div>
              </CartProvider>
            </LanguageProvider>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
