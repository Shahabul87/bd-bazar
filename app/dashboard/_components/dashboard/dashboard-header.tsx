"use client";

import { ReactNode } from "react";

interface DashboardHeaderProps {
  heading: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export function DashboardHeader({
  heading,
  description,
  icon,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="flex items-center">
        {icon && <div className="mr-3 text-slate-400">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold text-white">{heading}</h1>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
} 