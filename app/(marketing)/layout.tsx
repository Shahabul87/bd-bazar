"use client";

import { AppHeader } from "@/app/_components/AppHeader";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsLoginPage(pathname === "/login" || pathname === "/register");
  }, [pathname]);

  // Before client-side hydration is complete, return a minimal layout
  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <AppHeader />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 