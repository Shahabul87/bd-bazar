"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, ArrowUpRight, CalendarDays, HelpCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChartProps {
  data: any;
  period: string;
}

// Simple Chart representation - in a real app, use a chart library like recharts, chart.js, etc.
const ChartComponent = ({ data, period }: ChartProps) => {
  return (
    <div className="w-full h-80 mt-4 relative">
      {/* Chart implementation would go here - using a placeholder for now */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full flex flex-col">
          {/* Chart background grid */}
          <div className="flex-1 grid grid-cols-12 grid-rows-6 w-full h-full border-l border-b border-slate-600 bg-slate-800/50 rounded-md relative">
            {/* Y-axis labels */}
            <div className="absolute -left-10 top-0 h-full flex flex-col justify-between py-4 text-xs text-slate-400">
              <div>$30k</div>
              <div>$25k</div>
              <div>$20k</div>
              <div>$15k</div>
              <div>$10k</div>
              <div>$5k</div>
              <div>$0</div>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-[-20px] left-0 w-full flex justify-between text-xs text-slate-400">
              {period === "monthly" ? 
                Array.from({length: 12}, (_, i) => (
                  <div key={i}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</div>
                )) : 
                Array.from({length: 7}, (_, i) => (
                  <div key={i} className="mx-4">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                ))
              }
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="grid grid-cols-12 h-full">
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="border-r border-slate-700/50 h-full"></div>
                ))}
              </div>
              <div className="grid grid-rows-6 w-full">
                {Array.from({length: 6}).map((_, i) => (
                  <div key={i} className="border-t border-slate-700/50 w-full"></div>
                ))}
              </div>
            </div>
            
            {/* Simulated chart bars - revenue */}
            <div className="absolute inset-0 pt-4 pb-8 px-2 flex items-end">
              {period === "monthly" ? (
                <>
                  <div style={{height: '40%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '30%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '45%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '35%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '50%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '60%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '65%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '55%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '70%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '80%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '75%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '85%'}} className="w-full mx-1 bg-blue-500/80 rounded-t-sm"></div>
                </>
              ) : (
                <>
                  <div style={{height: '40%'}} className="w-full mx-4 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '60%'}} className="w-full mx-4 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '50%'}} className="w-full mx-4 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '75%'}} className="w-full mx-4 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '55%'}} className="w-full mx-4 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '70%'}} className="w-full mx-4 bg-blue-500/80 rounded-t-sm"></div>
                  <div style={{height: '65%'}} className="w-full mx-4 bg-blue-500/80 rounded-t-sm"></div>
                </>
              )}
            </div>
            
            {/* Simulated chart line - profit */}
            <div className="absolute inset-0 pt-4 pb-8 flex items-end">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <path 
                  d={period === "monthly" 
                    ? "M0,80 L8.33,70 L16.67,75 L25,65 L33.33,70 L41.67,60 L50,55 L58.33,60 L66.67,45 L75,40 L83.33,35 L91.67,25 L100,15" 
                    : "M0,70 L16.67,50 L33.33,60 L50,35 L66.67,45 L83.33,30 L100,25"
                  }
                  stroke="#a855f7" 
                  strokeWidth="2" 
                  fill="none" 
                />
                {/* Line data points */}
                {period === "monthly" 
                  ? Array.from({length: 12}, (_, i) => (
                    <circle 
                      key={i} 
                      cx={8.33 * i} 
                      cy={[80, 70, 75, 65, 70, 60, 55, 60, 45, 40, 35, 15][i]} 
                      r="1.5" 
                      fill="#a855f7" 
                    />
                  ))
                  : Array.from({length: 7}, (_, i) => (
                    <circle 
                      key={i} 
                      cx={16.67 * i} 
                      cy={[70, 50, 60, 35, 45, 30, 25][i]} 
                      r="1.5" 
                      fill="#a855f7" 
                    />
                  ))
                }
              </svg>
            </div>
          </div>
          
          {/* Chart legend */}
          <div className="flex items-center justify-center mt-8 space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
              <span className="text-sm text-slate-300">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded-sm mr-2"></div>
              <span className="text-sm text-slate-300">Profit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RevenueChartProps {
  storeId: string;
}

export function RevenueChart({ storeId }: RevenueChartProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [period, setPeriod] = useState("monthly");
  
  useEffect(() => {
    // In a real app, fetch data from API based on period
    // For demo, we're using mock data
    setChartData({
      monthly: {
        revenue: [5200, 4800, 6300, 5100, 7000, 8500, 9200, 7800, 10500, 12000, 11500, 13200],
        profit: [2100, 1950, 2500, 2000, 2800, 3400, 3700, 3100, 4200, 4800, 4600, 5300],
        growth: 12.6
      },
      weekly: {
        revenue: [1200, 1800, 1500, 2200, 1600, 2000, 1900],
        profit: [480, 720, 600, 880, 640, 800, 760],
        growth: 5.2
      }
    });
  }, []);
  
  if (!chartData) return <div className="text-slate-300 animate-pulse">Loading chart data...</div>;
  
  const currentData = chartData[period];
  const totalRevenue = period === "monthly" 
    ? currentData.revenue.reduce((sum: number, val: number) => sum + val, 0) 
    : currentData.revenue.reduce((sum: number, val: number) => sum + val, 0);
  
  const totalProfit = period === "monthly" 
    ? currentData.profit.reduce((sum: number, val: number) => sum + val, 0) 
    : currentData.profit.reduce((sum: number, val: number) => sum + val, 0);
  
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);
  
  return (
    <Card className="overflow-hidden border border-slate-700 bg-slate-800/90 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Revenue Overview</CardTitle>
            <CardDescription className="text-slate-400">
              Track your store's financial performance
            </CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[150px] bg-slate-700 border-slate-600 text-white">
                <CalendarDays className="mr-2 h-4 w-4 text-slate-300" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="weekly" className="text-slate-300">This Week</SelectItem>
                <SelectItem value="monthly" className="text-slate-300">This Year</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600">
                    <HelpCircle className="h-4 w-4 text-slate-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-slate-700 text-slate-300">
                  <p className="max-w-xs">
                    This chart shows your store's revenue and profit over time.
                    The bars represent total revenue, while the line shows profit.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-700/80 p-4 rounded-lg border border-slate-600">
            <p className="text-sm font-medium text-slate-400">Total Revenue</p>
            <h3 className="text-2xl font-bold mt-1 text-white">${totalRevenue.toLocaleString()}</h3>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">
                +{currentData.growth}% from previous {period === "monthly" ? "year" : "week"}
              </span>
            </div>
          </div>
          
          <div className="bg-slate-700/80 p-4 rounded-lg border border-slate-600">
            <p className="text-sm font-medium text-slate-400">Total Profit</p>
            <h3 className="text-2xl font-bold mt-1 text-white">${totalProfit.toLocaleString()}</h3>
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-slate-400">
                Profit margin: {profitMargin}%
              </span>
            </div>
          </div>
          
          <div className="bg-slate-700/80 p-4 rounded-lg border border-slate-600">
            <p className="text-sm font-medium text-slate-400">AI Forecast</p>
            <h3 className="text-2xl font-bold mt-1 text-white">
              ${period === "monthly" ? "156,000" : "9,600"}
            </h3>
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-purple-400">
                Projected annual growth: 18.2%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartComponent data={chartData[period]} period={period} />
      </CardContent>
    </Card>
  );
} 