"use client"

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { RefreshCw, Home } from 'lucide-react'
import { useLanguage } from "@/app/context/LanguageContext"
import { Globe } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  // Language-specific labels
  const labels = {
    title: language === 'en' ? 'Something went wrong' : 'কিছু ভুল হয়েছে',
    message: language === 'en' 
      ? 'We encountered an error while loading your dashboard. Please try again or return to the homepage.'
      : 'আপনার ড্যাশবোর্ড লোড করার সময় আমরা একটি ত্রুটির সম্মুখীন হয়েছি। অনুগ্রহ করে আবার চেষ্টা করুন অথবা হোমপেজে ফিরে যান।',
    tryAgain: language === 'en' ? 'Try Again' : 'আবার চেষ্টা করুন',
    returnHome: language === 'en' ? 'Return Home' : 'হোমে ফিরুন',
    currentLanguage: language === 'en' ? '🇺🇸' : '🇧🇩',
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800/40 dark:bg-gray-900/40">
      <div className="max-w-md w-full p-8 mx-auto bg-slate-800/40 dark:bg-gray-900/40 shadow-lg rounded-2xl backdrop-blur-lg border border-gray-700/20">
        <div className="relative">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="absolute top-0 right-0 p-2 h-10 rounded-full flex items-center justify-center gap-2
              bg-slate-700/30 dark:bg-gray-800/30 hover:bg-slate-700/50 dark:hover:bg-gray-800/50
              border border-gray-600/30"
          >
            <Globe className="h-4 w-4 text-gray-300" />
            <span className="text-gray-300">{labels.currentLanguage}</span>
          </Button>
          
          <div className="text-center mb-8 mt-4 pt-4">
            <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-gray-200">
              {labels.title}
            </h1>
            <div className="h-1 w-16 bg-gradient-to-r from-slate-500 to-gray-600 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-gray-300 mb-8 text-center">
            {labels.message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => reset()}
              className="bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              {labels.tryAgain}
            </Button>
            
            <Button 
              onClick={() => router.push('/')}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-slate-700 flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              {labels.returnHome}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 