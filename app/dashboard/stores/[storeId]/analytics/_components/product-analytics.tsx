"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, ShoppingBag, TrendingUp, TrendingDown, AlertTriangle, 
  CheckCircle2, Package, Tag, Filter, Download, BarChart4, PieChart 
} from "lucide-react";
import { useState, useEffect } from "react";

interface ProductAnalyticsProps {
  storeId: string;
}

// Product Performance Card Component
const ProductCard = ({ product }: { product: any }) => {
  const stockStatus = product.stockLevel <= 10 
    ? "low" 
    : product.stockLevel <= 25 
      ? "medium" 
      : "high";
  
  const stockStatusBadge = {
    low: <Badge variant="destructive" className="ml-2">Low Stock</Badge>,
    medium: <Badge variant="warning" className="ml-2">Medium Stock</Badge>,
    high: <Badge variant="success" className="ml-2">In Stock</Badge>
  }[stockStatus];
  
  return (
    <Card className="overflow-hidden border border-slate-700 bg-slate-800/90 shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-medium text-white">{product.name}</h3>
              <p className="text-sm text-slate-400">
                SKU: {product.sku} {stockStatusBadge}
              </p>
            </div>
            <Badge variant={product.trend > 0 ? "success" : "secondary"} className="mt-1 px-2 py-1 bg-slate-700 text-slate-300">
              {product.trend > 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {product.trend > 0 ? "+" : ""}{product.trend}%
            </Badge>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-400">Revenue</p>
              <p className="text-xl font-bold text-white">${product.revenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Units Sold</p>
              <p className="text-xl font-bold text-white">{product.unitsSold}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1 text-slate-400">
              <span>Conversion Rate</span>
              <span>{product.conversionRate}%</span>
            </div>
            <Progress value={product.conversionRate} className="h-2 bg-slate-700" indicatorColor="bg-blue-500" />
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1 text-slate-400">
              <span>Stock Level</span>
              <span>{product.stockLevel} units</span>
            </div>
            <Progress 
              value={(product.stockLevel / product.maxStock) * 100} 
              className={`h-2 bg-slate-700`}
              indicatorColor={
                stockStatus === "low" 
                  ? "bg-red-500" 
                  : stockStatus === "medium" 
                    ? "bg-amber-500" 
                    : "bg-green-500"
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Inventory Health Component
const InventoryHealth = ({ inventoryData }: { inventoryData: any }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Products</p>
                <h3 className="text-2xl font-bold text-white">{inventoryData.totalProducts}</h3>
              </div>
              <div className="p-2 bg-slate-700 rounded-full">
                <Package className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Low Stock Items</p>
                <h3 className="text-2xl font-bold text-white">{inventoryData.lowStockItems}</h3>
              </div>
              <div className="p-2 bg-slate-700 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Restocked Items</p>
                <h3 className="text-2xl font-bold text-white">{inventoryData.restockedItems}</h3>
              </div>
              <div className="p-2 bg-slate-700 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
        <CardHeader>
          <CardTitle className="text-white">Inventory Overview</CardTitle>
          <CardDescription className="text-slate-400">Current inventory health and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Inventory Value</span>
                <span className="font-medium text-white">${inventoryData.inventoryValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Average Stock Level</span>
                <span className="font-medium text-white">{inventoryData.avgStockLevel} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Stock Turnover Rate</span>
                <span className="font-medium text-white">{inventoryData.turnoverRate}x per year</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-700">
              <h4 className="font-medium mb-3 text-white">Stock Level Distribution</h4>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Critical (0-10 units)</span>
                    <span>{inventoryData.stockDistribution.critical}%</span>
                  </div>
                  <Progress value={inventoryData.stockDistribution.critical} className="h-2 bg-slate-700" indicatorColor="bg-red-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Low (11-25 units)</span>
                    <span>{inventoryData.stockDistribution.low}%</span>
                  </div>
                  <Progress value={inventoryData.stockDistribution.low} className="h-2 bg-slate-700" indicatorColor="bg-amber-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Medium (26-50 units)</span>
                    <span>{inventoryData.stockDistribution.medium}%</span>
                  </div>
                  <Progress value={inventoryData.stockDistribution.medium} className="h-2 bg-slate-700" indicatorColor="bg-blue-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>High (51+ units)</span>
                    <span>{inventoryData.stockDistribution.high}%</span>
                  </div>
                  <Progress value={inventoryData.stockDistribution.high} className="h-2 bg-slate-700" indicatorColor="bg-green-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Inventory Recommendations</CardTitle>
            <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryData.recommendations.map((recommendation: any, index: number) => (
              <div 
                key={index} 
                className="p-4 rounded-md bg-slate-700/50 border border-slate-600"
              >
                <div className="flex items-start">
                  {recommendation.type === "restock" ? (
                    <div className="p-2 rounded-full bg-slate-600 mr-3">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                  ) : recommendation.type === "excess" ? (
                    <div className="p-2 rounded-full bg-slate-600 mr-3">
                      <TrendingDown className="h-5 w-5 text-blue-400" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-full bg-slate-600 mr-3">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-white">{recommendation.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      {recommendation.description}
                    </p>
                    <div className="mt-2">
                      <Badge variant={recommendation.type === "restock" ? "warning" : recommendation.type === "excess" ? "secondary" : "success"} className="bg-slate-600 text-slate-300">
                        {recommendation.type === "restock" ? "Restock Needed" : recommendation.type === "excess" ? "Excess Inventory" : "Opportunity"}
                      </Badge>
                      {recommendation.product && (
                        <Badge variant="outline" className="ml-2 border-slate-600 text-slate-300">
                          {recommendation.product}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Category Performance Component
const CategoryPerformance = ({ categoryData }: { categoryData: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Category Sales Distribution</CardTitle>
            <CardDescription className="text-slate-400">Sales by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <PieChart className="h-16 w-16 mx-auto opacity-50 mb-2" />
                <p>Pie chart visualization would be displayed here</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              {categoryData.map(category => (
                <div key={category.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 bg-slate-600`}></div>
                      <span className="text-slate-300">{category.name}</span>
                    </div>
                    <span className="text-white">{category.percentage}%</span>
                  </div>
                  <Progress value={category.percentage} className="h-2 bg-slate-700" indicatorColor="bg-blue-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Category Growth</CardTitle>
            <CardDescription className="text-slate-400">Year-over-year growth by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {categoryData.map(category => (
                <div key={category.id} className="flex items-center">
                  <div className="w-16 flex-shrink-0">
                    <span className="text-sm text-slate-400">{category.name}</span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center h-9">
                      <div 
                        className={`h-9 flex items-center ${category.growth >= 0 ? 'bg-green-500/20' : 'bg-rose-500/20'} rounded-sm px-2`}
                        style={{ width: `${Math.abs(category.growth) * 3}%` }}
                      >
                        <span className={`text-sm font-medium ${category.growth >= 0 ? 'text-green-500' : 'text-rose-500'}`}>
                          {category.growth > 0 ? '+' : ''}{category.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 w-24 text-right">
                    <p className="text-sm font-medium text-white">${category.revenue.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{category.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Product Performance</CardTitle>
              <CardDescription className="text-slate-400">Top and bottom performing products</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="top" className="w-full">
            <TabsList className="w-full rounded-none bg-slate-700/50 border-b border-slate-600">
              <TabsTrigger value="top" className="rounded-none data-[state=active]:bg-slate-600 data-[state=active]:text-white">
                Top Performers
              </TabsTrigger>
              <TabsTrigger value="bottom" className="rounded-none data-[state=active]:bg-slate-600 data-[state=active]:text-white">
                Needs Improvement
              </TabsTrigger>
            </TabsList>
            <TabsContent value="top" className="p-0 border-0">
              <div className="rounded-b-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Product</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Revenue</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Growth</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData[0].topProducts.map((product: any, index: number) => (
                      <tr 
                        key={product.id} 
                        className={`border-b border-slate-700 ${index % 2 === 1 ? 'bg-slate-800/30' : ''}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="text-sm text-slate-300">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-300">${product.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-500">+{product.growth}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-300">{product.conversion}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="bottom" className="p-0 border-0">
              <div className="rounded-b-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Product</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Revenue</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Growth</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData[0].bottomProducts.map((product: any, index: number) => (
                      <tr 
                        key={product.id} 
                        className={`border-b border-slate-700 ${index % 2 === 1 ? 'bg-slate-800/30' : ''}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 text-slate-400 mr-2" />
                            <span className="text-sm text-slate-300">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-300">${product.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <TrendingDown className="w-4 h-4 text-rose-500 mr-1" />
                            <span className="text-sm text-rose-500">{product.growth}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-300">{product.conversion}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export function ProductAnalytics({ storeId }: ProductAnalyticsProps) {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("products");
  
  useEffect(() => {
    // In a real app, fetch from API
    // Mock data for demonstration
    const mockTopProducts = [
      { 
        id: 1, 
        name: "Premium Wireless Headphones", 
        sku: "PWH-001", 
        revenue: 24500, 
        unitsSold: 175, 
        conversionRate: 8.2, 
        stockLevel: 45, 
        maxStock: 100,
        trend: 12.3
      },
      { 
        id: 2, 
        name: "Smart Watch Pro", 
        sku: "SWP-002", 
        revenue: 18920, 
        unitsSold: 118, 
        conversionRate: 6.4, 
        stockLevel: 32, 
        maxStock: 80,
        trend: 8.7
      },
      { 
        id: 3, 
        name: "Ultra HD Monitor", 
        sku: "UHM-003", 
        revenue: 15600, 
        unitsSold: 52, 
        conversionRate: 3.8, 
        stockLevel: 18, 
        maxStock: 50,
        trend: 5.2
      },
      { 
        id: 4, 
        name: "Ergonomic Keyboard", 
        sku: "ERK-004", 
        revenue: 9800, 
        unitsSold: 98, 
        conversionRate: 4.5, 
        stockLevel: 9, 
        maxStock: 60,
        trend: -2.1
      },
      { 
        id: 5, 
        name: "Portable SSD Drive", 
        sku: "PSD-005", 
        revenue: 7600, 
        unitsSold: 76, 
        conversionRate: 3.2, 
        stockLevel: 25, 
        maxStock: 70,
        trend: 3.8
      },
      { 
        id: 6, 
        name: "Wireless Gaming Mouse", 
        sku: "WGM-006", 
        revenue: 6280, 
        unitsSold: 157, 
        conversionRate: 5.1, 
        stockLevel: 38, 
        maxStock: 90,
        trend: 7.4
      },
    ];
    
    const mockInventoryData = {
      totalProducts: 154,
      lowStockItems: 18,
      restockedItems: 12,
      inventoryValue: 287650,
      avgStockLevel: 42,
      turnoverRate: 4.2,
      stockDistribution: {
        critical: 12,
        low: 18,
        medium: 35,
        high: 35
      },
      recommendations: [
        {
          type: "restock",
          title: "Low Stock Alert: Ultra HD Monitor",
          description: "Current stock level is below 20 units. Based on current sell rate, stock will be depleted in 14 days.",
          product: "UHM-003"
        },
        {
          type: "restock",
          title: "Low Stock Alert: Ergonomic Keyboard",
          description: "Current stock level is critically low (9 units). Consider restocking immediately.",
          product: "ERK-004"
        },
        {
          type: "excess",
          title: "Excess Inventory: HDMI Cables Bundle",
          description: "Inventory hasn't moved in 60 days. Consider promotional offers to increase sales velocity.",
          product: "HCB-022"
        },
        {
          type: "opportunity",
          title: "Sales Opportunity: Premium Wireless Headphones",
          description: "This product has consistently high demand. Consider increasing inventory to meet future demand.",
          product: "PWH-001"
        }
      ]
    };
    
    const mockCategoryData = [
      {
        id: 1,
        name: "Audio",
        percentage: 32,
        growth: 8.7,
        revenue: 43420,
        orders: 332,
        topProducts: [
          { id: 1, name: "Premium Wireless Headphones", revenue: 24500, growth: 12.3, conversion: 8.2 },
          { id: 2, name: "Noise Cancelling Earbuds", revenue: 12800, growth: 9.1, conversion: 6.7 },
          { id: 3, name: "Bluetooth Speaker", revenue: 6120, growth: 4.8, conversion: 3.5 }
        ],
        bottomProducts: [
          { id: 4, name: "Wired Headphones", revenue: 3400, growth: -5.2, conversion: 2.1 },
          { id: 5, name: "Studio Microphone", revenue: 2800, growth: -4.7, conversion: 1.8 },
          { id: 6, name: "Desktop Speakers", revenue: 1950, growth: -8.3, conversion: 1.5 }
        ]
      },
      {
        id: 2,
        name: "Computing",
        percentage: 28,
        growth: 6.2,
        revenue: 37850,
        orders: 248
      },
      {
        id: 3,
        name: "Wearables",
        percentage: 22,
        growth: 15.4,
        revenue: 29740,
        orders: 183
      },
      {
        id: 4,
        name: "Accessories",
        percentage: 18,
        growth: -2.3,
        revenue: 24320,
        orders: 427
      }
    ];
    
    setData({
      topProducts: mockTopProducts,
      inventoryData: mockInventoryData,
      categoryData: mockCategoryData
    });
  }, []);
  
  if (!data) return <div className="text-slate-300 animate-pulse">Loading product analytics...</div>;
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-800/80 border border-slate-700">
          <TabsTrigger value="products" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Top Products
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            <Package className="h-4 w-4 mr-2" />
            Inventory Health
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Category Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.topProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="pt-6">
          <InventoryHealth inventoryData={data.inventoryData} />
        </TabsContent>
        
        <TabsContent value="categories" className="pt-6">
          <CategoryPerformance categoryData={data.categoryData} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 