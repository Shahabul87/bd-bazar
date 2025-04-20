"use client";

import { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container py-6 px-4 sm:px-6 lg:px-8 mx-auto">
        {children}
      </div>
    </div>
  );
} 