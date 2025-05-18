"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { SalesOverview } from "./_components/sales-overview";
import { ProductAnalytics } from "./_components/product-analytics";
import { CustomerAnalytics } from "./_components/customer-analytics";
import { AiInsights } from "./_components/ai-insights";
import { RevenueChart } from "./_components/revenue-chart";
import { PerformanceMetrics } from "./_components/performance-metrics";

interface AnalyticsPageProps {
  params: {
    storeId: string;
  }
}

export default function AnalyticsPage({
  params
}: AnalyticsPageProps) {
  // Unwrap params with React.use() as required by Next.js 15
  const unwrappedParams = use(params);
  const storeId = unwrappedParams.storeId;
  const [loading, setLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen bg-gradient-to-bl from-slate-900 via-slate-800 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute -top-40 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute top-[30%] -left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex-col">
          <div className="flex-1 space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Heading
                title={loading ? "Loading analytics..." : "Store Analytics"}
                description="AI-powered insights to grow your business"
                className="text-white"
              />
            </div>
            <Separator className="bg-slate-700" />
            
            {loading ? (
              <div className="flex justify-center p-8">
                <p className="text-slate-300 animate-pulse">Loading analytics data...</p>
              </div>
            ) : (
              <>
                {/* Performance Metrics Cards */}
                <PerformanceMetrics storeId={storeId} />
                
                {/* Revenue Overview Chart */}
                <RevenueChart storeId={storeId} />
                
                {/* Analytics Tabs */}
                <Tabs defaultValue="sales" className="w-full">
                  <TabsList className="bg-slate-800/80 border border-slate-700">
                    <TabsTrigger 
                      value="sales" 
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                    >
                      Sales Analytics
                    </TabsTrigger>
                    <TabsTrigger 
                      value="products"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                    >
                      Product Performance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="customers"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                    >
                      Customer Insights
                    </TabsTrigger>
                    <TabsTrigger 
                      value="ai"
                      className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                    >
                      AI Recommendations
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sales" className="space-y-4 pt-4">
                    <SalesOverview storeId={storeId} />
                  </TabsContent>
                  
                  <TabsContent value="products" className="space-y-4 pt-4">
                    <ProductAnalytics storeId={storeId} />
                  </TabsContent>
                  
                  <TabsContent value="customers" className="space-y-4 pt-4">
                    <CustomerAnalytics storeId={storeId} />
                  </TabsContent>
                  
                  <TabsContent value="ai" className="space-y-4 pt-4">
                    <AiInsights storeId={storeId} />
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 