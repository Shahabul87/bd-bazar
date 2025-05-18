"use client";

import { useEffect, useState, use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { CustomerClient } from "./_components/client";
import { CustomerInsights } from "./_components/customer-insights";
import { getStoreCustomers } from "@/actions/get-store-customers";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { CustomerWithInsights } from "@/actions/get-store-customers";

interface CustomersPageProps {
  params: {
    storeId: string;
  }
}

export default function CustomersPage({
  params
}: CustomersPageProps) {
  // Unwrap params to safely access storeId
  const unwrappedParams = use(params);
  const storeId = unwrappedParams.storeId;
  
  const [customers, setCustomers] = useState<CustomerWithInsights[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getStoreCustomers(storeId);
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [storeId]); // Use the unwrapped storeId in the dependency array
  
  return (
    <div className="relative">
      {/* Custom background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-800/20 to-fuchsia-700/30 pointer-events-none" />
      
      <div className="relative flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading
              title={loading ? "Loading customers..." : `Customers (${customers.length})`}
              description="Manage and analyze your store customers"
              className="text-indigo-800 dark:text-indigo-300"
            />
          </div>
          <Separator className="bg-indigo-200 dark:bg-indigo-800" />
          
          {loading ? (
            <div className="flex justify-center p-8">
              <p className="text-indigo-700 dark:text-indigo-300 animate-pulse">Loading customer data...</p>
            </div>
          ) : (
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="bg-indigo-100 dark:bg-indigo-900/50">
                <TabsTrigger 
                  value="table" 
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-800 dark:data-[state=active]:bg-indigo-800 dark:data-[state=active]:text-white"
                >
                  Customer Table
                </TabsTrigger>
                <TabsTrigger 
                  value="insights"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-800 dark:data-[state=active]:bg-indigo-800 dark:data-[state=active]:text-white"
                >
                  Customer Insights
                </TabsTrigger>
              </TabsList>
              <TabsContent value="table" className="space-y-4 pt-2">
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden">
                  <CustomerClient data={customers} storeId={storeId} />
                </div>
              </TabsContent>
              <TabsContent value="insights" className="pt-2">
                {customers.length === 0 ? (
                  <Card className="p-6 bg-white/80 dark:bg-slate-900/80 border-indigo-200 dark:border-indigo-800">
                    <p className="text-center text-indigo-500 dark:text-indigo-400">
                      No customer data available to generate insights.
                    </p>
                  </Card>
                ) : (
                  <div className="bg-white/80 dark:bg-slate-900/80 rounded-lg p-4">
                    <CustomerInsights customers={customers} />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
} 