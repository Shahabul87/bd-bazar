"use client";

// Direct import since we're in a client component already
import Sidebar from "./sidebar";

interface SidebarWrapperProps {
  routesData: {
    href: string;
    label: string;
    icon: string;
  }[];
  className?: string;
}

export default function SidebarWrapper({ routesData, className }: SidebarWrapperProps) {
  return <Sidebar routesData={routesData} className={className} />;
} 