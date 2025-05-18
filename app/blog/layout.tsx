import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Toaster } from "@/components/ui/sonner";
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { MainHeader } from "@/app/(homepage)/main-header";
import { currentUser } from '@/lib/auth';




export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await auth();
  const user = await currentUser();
 

  return (
   <SessionProvider 
     session={session}
     refetchInterval={0} 
     refetchOnWindowFocus={false}
   >
    {!user ? <MainHeader /> : <MainHeader />}
      <div className="relative min-h-screen w-screen">
        <div className="antialiased bg-gray-800 text-zinc-300 font-body min-h-screen">
          <ConfettiProvider />
          <Toaster />
         
          <main className ="w-full min-h-screen p-6">             
              {children}
          </main> 
        </div>
      </div>
   </SessionProvider>
 
  )
}