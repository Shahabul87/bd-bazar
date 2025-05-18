"use client";

import { 
  BarChart3, Calendar, DollarSign, Package, 
  ShoppingCart, Users, TrendingUp, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, ExternalLink, 
  ChevronRight, CheckCircle2, Clock
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { ProductGallery } from "./product-gallery";
import { TemplateSelector } from "./template-selector";

// Simple animated bar chart component
const AnimatedBarChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  
  return (
    <div className="flex items-end h-32 gap-1 pt-5">
      {data.map((value, i) => (
        <div 
          key={i} 
          className="bg-indigo-500 rounded-t w-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-700"
          style={{ 
            height: `${(value / max) * 100}%`,
            opacity: 0.7 + ((i / data.length) * 0.3),
            animationDelay: `${i * 100}ms`
          }}
        />
      ))}
    </div>
  );
};

interface DashboardMetrics {
  totalRevenue: number;
  productCount: number;
  activeProducts: number;
  lowStockProducts: number;
  orderCount: number;
}

interface DashboardContentProps {
  store: any;
  orders: any[];
  metrics: DashboardMetrics;
}

export default function DashboardContent({ store, orders, metrics }: DashboardContentProps) {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('month');
  
  // Mock data for the chart based on timeframe
  const getChartData = () => {
    if (timeFrame === 'week') return [42, 25, 37, 41, 22, 56, 31];
    if (timeFrame === 'month') return [42, 85, 53, 41, 22, 56, 31, 84, 35, 95, 37, 68, 57, 90, 34, 24, 94, 57, 25, 65, 94, 51, 45, 65, 78, 13, 45, 89, 34, 69];
    return [42, 85, 53, 41, 22, 56, 31, 84, 35, 95, 37, 68, 57, 90, 34];
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: store.currency || 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Calculate performance indicators (mock data)
  const performance = {
    revenueChange: 12.5,
    ordersChange: 8.3,
    visitorsChange: -3.2
  };

  return (
    <div className="space-y-6">
      {/* Status indicator */}
      <div className="flex justify-end">
        <div className={cn(
          "flex items-center px-3 py-1 text-xs font-medium rounded-full",
          store.status === "active" 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
        )}>
          <span className={cn(
            "mr-1 h-1.5 w-1.5 rounded-full", 
            store.status === "active" ? "bg-green-500" : "bg-amber-500"
          )}></span>
          {store.status === "active" ? "Store Active" : "Store Inactive"}
        </div>
      </div>

      {/* Dashboard Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex justify-between">
              Total Revenue
              <span className={cn(
                "text-xs flex items-center",
                performance.revenueChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {performance.revenueChange > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(performance.revenueChange)}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold dark:text-white">
              {formatCurrency(metrics.totalRevenue)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last 30 days
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <DollarSign size={18} />
            </div>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-md bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex justify-between">
              Products
              {metrics.lowStockProducts > 0 && (
                <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {metrics.lowStockProducts} low stock
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold dark:text-white">
              {metrics.productCount}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {metrics.activeProducts} active
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <Package size={18} />
            </div>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-md bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex justify-between">
              Orders
              <span className={cn(
                "text-xs flex items-center",
                performance.ordersChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {performance.ordersChange > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(performance.ordersChange)}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold dark:text-white">
              {metrics.orderCount}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {orders.filter(o => o.status === "pending").length} pending
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <ShoppingCart size={18} />
            </div>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-md bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 flex justify-between">
              Traffic
              <span className={cn(
                "text-xs flex items-center",
                performance.visitorsChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {performance.visitorsChange > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(performance.visitorsChange)}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold dark:text-white">
              {store.visitorCount || 128}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              12 new this month
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Users size={18} />
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Featured Products Carousel */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4 dark:text-white">Featured Products</h2>
        <ProductGallery 
          store={store} 
          products={store.products.filter(p => p.active).sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )}
          limit={5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales chart */}
        <Card className="border-none shadow-md bg-white dark:bg-slate-800 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Tabs defaultValue="month" onValueChange={(value) => setTimeFrame(value as 'week' | 'month' | 'year')}>
                <TabsList className="bg-slate-100 dark:bg-slate-700">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              {timeFrame === 'week' ? 'Last 7 days' : timeFrame === 'month' ? 'Last 30 days' : 'Last 12 months'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <AnimatedBarChart data={getChartData()} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-5">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Sales</p>
              <p className="text-lg font-medium">{formatCurrency(metrics.totalRevenue)}</p>
            </div>
            <Link 
              href={`/dashboard/stores/${store.id}/analytics`}
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center"
            >
              View analytics <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>

        {/* Recent activity */}
        <Card className="border-none shadow-md bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest customer orders from your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-start py-2 border-b border-slate-100 dark:border-slate-700">
                    <div className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center mr-3",
                      order.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : 
                      order.status === "processing" ? "bg-blue-100 dark:bg-blue-900/30" : 
                      "bg-amber-100 dark:bg-amber-900/30"
                    )}>
                      {order.status === "completed" ? (
                        <CheckCircle2 size={14} className="text-green-600 dark:text-green-400" />
                      ) : order.status === "processing" ? (
                        <Clock size={14} className="text-blue-600 dark:text-blue-400" />
                      ) : (
                        <ShoppingCart size={14} className="text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium truncate">Order #{order.id.slice(-5)}</p>
                        <span className="text-sm font-medium">
                          {formatCurrency(Number(order.total))}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}
                        </p>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          order.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : 
                          order.status === "processing" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : 
                          "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        )}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <ShoppingCart className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">No orders yet</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Orders will appear here as they come in</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" asChild className="w-full">
              <Link href={`/dashboard/stores/${store.id}/orders`}>View all orders</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Store performance */}
      <Card className="border-none shadow-md bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle>Store Performance</CardTitle>
          <CardDescription>
            Key performance indicators for your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Product Stock</span>
                <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  {metrics.activeProducts}/{metrics.productCount}
                </span>
              </div>
              <Progress value={(metrics.activeProducts / Math.max(metrics.productCount, 1)) * 100} className="h-2" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {metrics.lowStockProducts} products are low on stock
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Store Completion</span>
                <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  75%
                </span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Complete your store profile to improve visibility
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Sales Target</span>
                <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  ${metrics.totalRevenue.toFixed(2)}/$1,000.00
                </span>
              </div>
              <Progress value={(metrics.totalRevenue / 1000) * 100} className="h-2" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly sales target progress
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-5">
          <div className="flex space-x-4">
            <Link 
              href={`/dashboard/stores/${store.id}/products`}
              className="text-sm flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            >
              <Package className="h-4 w-4 mr-1" />
              Manage Products
            </Link>
            <Link 
              href={`/dashboard/stores/${store.id}/settings`}
              className="text-sm flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Store Settings
            </Link>
          </div>
          <Button size="sm" asChild>
            <Link href={`/dashboard/stores/${store.id}/insights`}>
              <TrendingUp className="h-4 w-4 mr-2" />
              View Insights
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Template Selector */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4 dark:text-white">Store Appearance</h2>
        <TemplateSelector store={store} />
      </div>
    </div>
  );
} 