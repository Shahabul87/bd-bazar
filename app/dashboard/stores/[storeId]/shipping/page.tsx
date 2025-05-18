"use client";

import { useState, useEffect, use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { ShippingClient } from "./_components/client";
import { ShippingInsights } from "./_components/shipping-insights";
import { PackageStatusCard } from "./_components/package-status-card";
import { ShippingMetrics } from "./_components/shipping-metrics";

// Import any necessary types and actions
// This would be an actual server action in a real app
const getStoreShipping = async (storeId: string) => {
  // For demo purposes, we'll return mock data
  // In a real app, this would fetch from your database
  const mockData = Array.from({ length: 20 }).map((_, index) => ({
    id: `order_${index + 1}`,
    orderNumber: `ORD-${100000 + index}`,
    customer: {
      name: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Robert Brown"][Math.floor(Math.random() * 5)],
      email: `customer${index + 1}@example.com`,
      address: `${Math.floor(Math.random() * 1000) + 1} Main St, City, Country`,
    },
    status: ["pending", "processing", "shipped", "delivered", "returned"][Math.floor(Math.random() * 5)],
    trackingNumber: `TRK${Math.floor(Math.random() * 10000000)}`,
    shippingMethod: ["Standard", "Express", "Next Day", "International"][Math.floor(Math.random() * 4)],
    estimatedDelivery: new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
    shippedDate: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000),
    deliveredDate: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000) : null,
    total: parseFloat((Math.random() * 100 + 20).toFixed(2)),
    items: Math.floor(Math.random() * 5) + 1,
    weight: parseFloat((Math.random() * 10 + 0.5).toFixed(2)),
    aiPrediction: {
      deliveryOnTime: Math.random() > 0.2,
      delayRisk: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
      weatherImpact: Math.random() > 0.7 ? "significant" : Math.random() > 0.4 ? "mild" : "none",
      trafficConditions: Math.random() > 0.7 ? "congested" : Math.random() > 0.4 ? "moderate" : "clear",
      suggestionText: ["Consider upgrading shipping for high-value customer", 
                      "Check for weather delays in destination region", 
                      "Package may require additional handling", 
                      "Customer has history of successful deliveries"][Math.floor(Math.random() * 4)]
    }
  }));

  // Add some artificial delay to simulate a network request
  await new Promise(resolve => setTimeout(resolve, 800));

  return mockData;
};

interface ShippingPageProps {
  params: {
    storeId: string;
  }
}

export default function ShippingPage({
  params
}: ShippingPageProps) {
  // In Next.js 15, params is a Promise that needs to be unwrapped with React.use()
  const unwrappedParams = use(params);
  const storeId = unwrappedParams.storeId;
  
  const [shipping, setShipping] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const data = await getStoreShipping(storeId);
        setShipping(data);
      } catch (error) {
        console.error("Error fetching shipping data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipping();
  }, [storeId]);

  // Calculate shipping metrics
  const pendingCount = shipping.filter(item => item.status === "pending").length;
  const processingCount = shipping.filter(item => item.status === "processing").length;
  const shippedCount = shipping.filter(item => item.status === "shipped").length;
  const deliveredCount = shipping.filter(item => item.status === "delivered").length;
  const returnedCount = shipping.filter(item => item.status === "returned").length;

  return (
    <div className="relative">
      {/* Cosmic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-indigo-800/20 to-purple-700/30 pointer-events-none" />
      
      <div className="relative flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading
              title={loading ? "Loading shipping data..." : `Shipping (${shipping.length})`}
              description="Manage and track package shipments with AI-enhanced insights"
              className="text-cyan-800 dark:text-cyan-300"
            />
          </div>
          <Separator className="bg-cyan-200 dark:bg-cyan-800" />
          
          {loading ? (
            <div className="flex justify-center p-8">
              <p className="text-cyan-700 dark:text-cyan-300 animate-pulse">Loading shipping data...</p>
            </div>
          ) : (
            <>
              {/* Shipping Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <PackageStatusCard 
                  title="Pending" 
                  count={pendingCount} 
                  color="yellow" 
                  percentage={Math.round((pendingCount / shipping.length) * 100)} 
                />
                <PackageStatusCard 
                  title="Processing" 
                  count={processingCount} 
                  color="blue" 
                  percentage={Math.round((processingCount / shipping.length) * 100)} 
                />
                <PackageStatusCard 
                  title="Shipped" 
                  count={shippedCount} 
                  color="purple" 
                  percentage={Math.round((shippedCount / shipping.length) * 100)} 
                />
                <PackageStatusCard 
                  title="Delivered" 
                  count={deliveredCount} 
                  color="green" 
                  percentage={Math.round((deliveredCount / shipping.length) * 100)} 
                />
                <PackageStatusCard 
                  title="Returned" 
                  count={returnedCount} 
                  color="red" 
                  percentage={Math.round((returnedCount / shipping.length) * 100)} 
                />
              </div>
              
              {/* Metrics Dashboard */}
              <ShippingMetrics shipping={shipping} />
              
              {/* Main Tabs Interface */}
              <Tabs defaultValue="table" className="w-full">
                <TabsList className="bg-cyan-100 dark:bg-cyan-900/50">
                  <TabsTrigger 
                    value="table" 
                    className="data-[state=active]:bg-white data-[state=active]:text-cyan-800 dark:data-[state=active]:bg-cyan-800 dark:data-[state=active]:text-white"
                  >
                    Shipping Table
                  </TabsTrigger>
                  <TabsTrigger 
                    value="insights"
                    className="data-[state=active]:bg-white data-[state=active]:text-cyan-800 dark:data-[state=active]:bg-cyan-800 dark:data-[state=active]:text-white"
                  >
                    AI Shipping Insights
                  </TabsTrigger>
                  <TabsTrigger 
                    value="map"
                    className="data-[state=active]:bg-white data-[state=active]:text-cyan-800 dark:data-[state=active]:bg-cyan-800 dark:data-[state=active]:text-white"
                  >
                    Shipping Map
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="table" className="space-y-4 pt-2">
                  <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
                    <ShippingClient data={shipping} storeId={storeId} />
                  </div>
                </TabsContent>
                <TabsContent value="insights" className="pt-2">
                  {shipping.length === 0 ? (
                    <Card className="p-6 bg-white/80 dark:bg-slate-900/80 border-cyan-200 dark:border-cyan-800">
                      <p className="text-center text-cyan-500 dark:text-cyan-400">
                        No shipping data available to generate insights.
                      </p>
                    </Card>
                  ) : (
                    <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-4">
                      <ShippingInsights shipping={shipping} />
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="map" className="pt-2">
                  <Card className="p-6 bg-white/80 dark:bg-slate-900/80 border-cyan-200 dark:border-cyan-800">
                    <div className="h-[500px] rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <p className="text-center text-cyan-600 dark:text-cyan-400">
                        Interactive shipping map visualization would be displayed here.<br/>
                        (This is a placeholder for a real map integration)
                      </p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 