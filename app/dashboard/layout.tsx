import { currentUser } from '@/lib/auth';
import { User } from "@prisma/client";
import { redirect } from 'next/navigation';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { HeaderAfterLogin } from '@/app/(homepage)/header-after-login';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current user
  const user = await currentUser() as User | undefined;
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login');
  }

  return (
    <LanguageProvider>
      {/* The ModernHeader component has a height of 64px (h-16) plus categories bar */}
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* ModernHeader from HeaderAfterLogin */}
        <div className="sticky top-0 z-50">
          <HeaderAfterLogin />
        </div>
        
        {/* Dashboard Content with adjusted spacing to account for fixed header */}
        <div className="flex-1"> {/* Adjust this value based on ModernHeader + categories bar height */}
          {children}
        </div>
      </div>
    </LanguageProvider>
  );
} 