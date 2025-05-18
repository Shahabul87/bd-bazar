"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Calendar, Download, ExternalLink, Map, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface SalesOverviewProps {
  storeId: string;
}

// SalesGraph component - in a real app, use a chart library
const SalesGraph = ({ data, type }: { data: any, type: string }) => {
  return (
    <div className="w-full h-64 mt-4 relative">
      {/* Graph placeholder */}
      <div className="h-full border-l border-b border-slate-600 bg-slate-800/50 rounded-md relative">
        {/* Y-axis values */}
        <div className="absolute -left-10 top-0 h-full flex flex-col justify-between py-4 text-xs text-slate-400">
          <div>$1.5k</div>
          <div>$1.0k</div>
          <div>$0.5k</div>
          <div>$0</div>
        </div>
        
        {/* X-axis values */}
        <div className="absolute bottom-[-20px] left-0 w-full flex justify-between text-xs text-slate-400 px-4">
          {type === "daily" ? (
            <>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </>
          ) : type === "hourly" ? (
            Array.from({length: 12}, (_, i) => <div key={i}>{i * 2}:00</div>)
          ) : (
            <>
              <div>Week 1</div>
              <div>Week 2</div>
              <div>Week 3</div>
              <div>Week 4</div>
            </>
          )}
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-7 h-full">
            {Array.from({length: 7}).map((_, i) => (
              <div key={i} className="border-r border-slate-700/50 h-full"></div>
            ))}
          </div>
          <div className="grid grid-rows-3 w-full">
            {Array.from({length: 3}).map((_, i) => (
              <div key={i} className="border-t border-slate-700/50 w-full"></div>
            ))}
          </div>
        </div>
        
        {/* Bar chart - just a placeholder */}
        <div className="absolute inset-0 pt-4 pb-8 px-4 flex items-end">
          {type === "daily" ? (
            <>
              <div className="h-[40%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[30%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[60%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[45%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[50%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[70%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[55%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
            </>
          ) : type === "hourly" ? (
            <>
              <div className="h-[20%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[15%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[25%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[40%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[60%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[80%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[70%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[50%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[30%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[20%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[15%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[10%] w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
            </>
          ) : (
            <>
              <div className="h-[40%] w-full mx-2 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[60%] w-full mx-2 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[75%] w-full mx-2 bg-blue-500/80 rounded-t-sm"></div>
              <div className="h-[85%] w-full mx-2 bg-blue-500/80 rounded-t-sm"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Sales by product table
const SalesByProduct = ({ data }: { data: any[] }) => {
  return (
    <div className="rounded-md border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800">
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Product</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Units Sold</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Revenue</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-slate-400">Growth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr 
                key={product.id} 
                className={`border-t border-slate-700 ${index % 2 ? 'bg-slate-800/30' : ''}`}
              >
                <td className="py-3 px-4 text-sm text-slate-300">{product.name}</td>
                <td className="py-3 px-4 text-sm text-slate-300">{product.unitsSold}</td>
                <td className="py-3 px-4 text-sm text-slate-300">${product.revenue.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {product.growth > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-rose-500 mr-1" />
                    )}
                    <span className={`text-sm ${product.growth > 0 ? 'text-green-500' : 'text-rose-500'}`}>
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Geographic sales distribution
const GeographicSales = ({ data }: { data: any[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Sales by Region</h3>
        <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300">
          <Map className="h-4 w-4 mr-1" />
          View Full Map
        </Button>
      </div>
      
      <div className="h-[280px] bg-slate-800/50 rounded-lg border border-slate-700 p-4 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <Map className="h-12 w-12 mx-auto opacity-50 mb-2" />
          <p>Interactive map visualization would be displayed here</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map(region => (
          <Card key={region.id} className="overflow-hidden border border-slate-700 bg-slate-800/90">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-white">{region.name}</h4>
                <Badge variant={region.growth > 5 ? "success" : "secondary"} className="bg-slate-700 text-slate-300">
                  {region.growth > 0 ? '+' : ''}{region.growth}%
                </Badge>
              </div>
              <p className="text-xl font-bold mt-1 text-white">${region.revenue.toLocaleString()}</p>
              <div className="mt-3 w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full" 
                  style={{width: `${region.percentage}%`}}
                />
              </div>
              <div className="mt-1 text-xs text-slate-400">
                {region.percentage}% of total revenue
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export function SalesOverview({ storeId }: SalesOverviewProps) {
  const [data, setData] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<string>("daily");
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockProductData = [
      { id: 1, name: "Premium Headphones", unitsSold: 234, revenue: 18720, growth: 12.3 },
      { id: 2, name: "Wireless Earbuds", unitsSold: 187, revenue: 7480, growth: 8.7 },
      { id: 3, name: "Smart Watch Pro", unitsSold: 156, revenue: 15600, growth: 15.2 },
      { id: 4, name: "Phone Case (Deluxe)", unitsSold: 432, revenue: 6480, growth: -2.1 },
      { id: 5, name: "Fast Charging Adapter", unitsSold: 321, revenue: 5778, growth: 4.5 },
      { id: 6, name: "Bluetooth Speaker", unitsSold: 98, revenue: 4900, growth: -1.8 },
    ];
    
    const mockRegionData = [
      { id: 1, name: "North America", revenue: 28500, growth: 7.2, percentage: 42 },
      { id: 2, name: "Europe", revenue: 18700, growth: 5.3, percentage: 28 },
      { id: 3, name: "Asia Pacific", revenue: 12400, growth: 12.8, percentage: 18 },
      { id: 4, name: "Rest of World", revenue: 8200, growth: 3.1, percentage: 12 },
    ];
    
    setData({
      products: mockProductData,
      regions: mockRegionData,
      salesData: {
        daily: { /* daily sales data */ },
        weekly: { /* weekly sales data */ },
        hourly: { /* hourly sales data */ }
      }
    });
  }, []);
  
  if (!data) return <div className="text-slate-300 animate-pulse">Loading sales data...</div>;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trends */}
        <div className="lg:col-span-2">
          <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Sales Trends</CardTitle>
                  <CardDescription className="text-slate-400">Analyze your sales performance over time</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300" onClick={() => setTimeframe("hourly")}>Hourly</Button>
                  <Button size="sm" variant={timeframe === "daily" ? "default" : "outline"} className={timeframe === "daily" ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300"} onClick={() => setTimeframe("daily")}>Daily</Button>
                  <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300" onClick={() => setTimeframe("weekly")}>Weekly</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SalesGraph data={data.salesData[timeframe]} type={timeframe} />
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Transactions</p>
                  <p className="text-2xl font-bold text-white">1,482</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Avg. Value</p>
                  <p className="text-2xl font-bold text-white">$58.24</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Conversion</p>
                  <p className="text-2xl font-bold text-white">3.6%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">$86,324</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6 border border-slate-700 bg-slate-800/90 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Top Products</CardTitle>
              <CardDescription className="text-slate-400">Best-selling products during the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesByProduct data={data.products} />
            </CardContent>
          </Card>
        </div>
        
        {/* Regional Sales */}
        <div>
          <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Geographic Distribution</CardTitle>
              <CardDescription className="text-slate-400">Sales across different regions</CardDescription>
            </CardHeader>
            <CardContent>
              <GeographicSales data={data.regions} />
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-center">
            <Button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300">
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 