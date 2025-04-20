'use client';

import { User } from "@prisma/client";
import { DashboardSidebar } from "../dashboard-sidebar";
import { DashboardHeader } from "../dashboard-header";
import { KPICards } from "./dashboard/kpi-cards";
import { AIAssistant } from "./dashboard/ai-assistant";
import { RecentOrders } from "./dashboard/recent-orders";
import { SalesChart } from "./dashboard/sales-chart";
import { ProductPerformance } from "./dashboard/product-performance";
import { AIPredictions } from "./dashboard/ai-predictions";
import { MarketInsights } from "./dashboard/market-insights";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

interface DashboardContentProps {
  user: User | undefined;
  dateRange: string;
}

export function DashboardContent({ user, dateRange }: DashboardContentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if no user is found (client-side)
  useEffect(() => {
    if (mounted && !user) {
      redirect('/login');
    }
  }, [user, mounted]);

  // Return empty div while component is mounting to prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-background"></div>;
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <DashboardSidebar user={user} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Dashboard-specific header (date range selector, etc.) */}
        <DashboardHeader user={user} initialDateRange={dateRange} />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPI Cards */}
            <KPICards dateRange={dateRange} />
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width on large screens */}
              <div className="xl:col-span-2 space-y-6">
                {/* Sales Chart */}
                <SalesChart />
                
                {/* Recent Orders */}
                <RecentOrders />
                
                {/* Product Performance */}
                <ProductPerformance />
              </div>
              
              {/* Right Column - 1/3 width on large screens */}
              <div className="space-y-6">
                {/* AI Assistant */}
                <AIAssistant user={user} />
                
                {/* AI Predictions & Recommendations */}
                <AIPredictions />
                
                {/* Market Insights */}
                <MarketInsights />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 