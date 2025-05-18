"use client";

import { ShippingItem } from "./shipping-column";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, TrendingDown, Zap, CloudRain, AlertCircle, ArrowRight, Truck, Clock, PackageOpen, Package } from "lucide-react";
import { motion } from "framer-motion";

// For demonstration, we'll create simple chart components
// In a real app you'd use Recharts or a similar library

// Simple Gauge Chart
const GaugeChart = ({ value, max, color }: { value: number; max: number; color: string }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="relative h-32 w-full flex items-center justify-center">
      {/* Gauge background */}
      <div className="absolute h-16 w-32 border-t-[16px] border-l-[16px] border-r-[16px] rounded-t-full border-gray-200 dark:border-gray-800"></div>
      
      {/* Gauge fill */}
      <motion.div 
        initial={{ borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}
        animate={{ 
          borderTopWidth: 16, 
          borderLeftWidth: 16, 
          borderRightWidth: 16 
        }}
        transition={{ duration: 1 }}
        className={`absolute h-16 w-32 border-t-[16px] border-l-[16px] border-r-[16px] rounded-t-full ${color}`}
        style={{ 
          clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
          clip: `rect(0px, ${(percentage / 100) * 128}px, 128px, 0px)`
        }}
      ></motion.div>
      
      {/* Gauge center point */}
      <div className="absolute bottom-0 h-3 w-3 rounded-full bg-gray-800 dark:bg-white z-10"></div>
      
      {/* Gauge value */}
      <div className="absolute -bottom-6 text-lg font-bold">{value}</div>
    </div>
  );
};

// AI Insight Card
const InsightCard = ({ 
  title, 
  children,
  icon,
  color = "text-cyan-600 dark:text-cyan-400",
  bgColor = "bg-cyan-50 dark:bg-cyan-950/50"
}: { 
  title: string; 
  children: React.ReactNode; 
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
}) => {
  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800">
      <CardHeader className={`pb-2 ${bgColor}`}>
        <CardTitle className={`text-sm font-medium flex items-center gap-2 ${color}`}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
};

interface ShippingInsightsProps {
  shipping: ShippingItem[];
}

export const ShippingInsights: React.FC<ShippingInsightsProps> = ({ shipping }) => {
  // Calculate delivery risk scores
  const shippingsByRisk = {
    high: shipping.filter(s => s.aiPrediction.delayRisk === "high").length,
    medium: shipping.filter(s => s.aiPrediction.delayRisk === "medium").length,
    low: shipping.filter(s => s.aiPrediction.delayRisk === "low").length,
  };
  
  // Calculate AI predictions
  const weatherImpacted = shipping.filter(s => s.aiPrediction.weatherImpact !== "none").length;
  const trafficImpacted = shipping.filter(s => s.aiPrediction.trafficConditions === "congested").length;
  const onTimeDeliveries = shipping.filter(s => s.aiPrediction.deliveryOnTime).length;
  const delayedDeliveries = shipping.filter(s => !s.aiPrediction.deliveryOnTime).length;
  
  // Get counts by status
  const pendingCount = shipping.filter(item => item.status === "pending").length;
  const processingCount = shipping.filter(item => item.status === "processing").length;
  const shippedCount = shipping.filter(item => item.status === "shipped").length;
  const deliveredCount = shipping.filter(item => item.status === "delivered").length;
  const returnedCount = shipping.filter(item => item.status === "returned").length;
  
  // Most common AI suggestions
  const suggestions = shipping
    .map(s => s.aiPrediction.suggestionText)
    .reduce((acc, suggestion) => {
      acc[suggestion] = (acc[suggestion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  const topSuggestions = Object.entries(suggestions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([text, count]) => ({ text, count }));
  
  return (
    <div className="space-y-6">
      {/* AI Header Section */}
      <Card className="border-cyan-200 dark:border-cyan-900 bg-gradient-to-r from-cyan-50 via-white to-blue-50 dark:from-cyan-950 dark:via-slate-900 dark:to-blue-950 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-cyan-900 dark:text-cyan-50">AI Shipping Intelligence</h2>
              <p className="text-cyan-600 dark:text-cyan-400">Advanced predictive analytics for your shipments</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-cyan-100 dark:border-cyan-900 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">High Risk Shipments</div>
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">{shippingsByRisk.high}</div>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-500 dark:text-red-400" />
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-cyan-100 dark:border-cyan-900 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Weather Impacted</div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{weatherImpacted}</div>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-full">
                <CloudRain className="h-6 w-6 text-amber-500 dark:text-amber-400" />
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-cyan-100 dark:border-cyan-900 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Traffic Delayed</div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{trafficImpacted}</div>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-full">
                <Truck className="h-6 w-6 text-orange-500 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Delivery Time Prediction */}
        <InsightCard
          title="Delivery Time Prediction"
          icon={<Clock className="h-4 w-4" />}
          color="text-blue-600 dark:text-blue-400"
          bgColor="bg-blue-50 dark:bg-blue-950/50"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">On-Time Probability</div>
              <Badge 
                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
              >
                {Math.round((onTimeDeliveries / shipping.length) * 100)}%
              </Badge>
            </div>
            
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(onTimeDeliveries / shipping.length) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-green-500 dark:bg-green-600"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex flex-col items-center justify-center p-2 bg-gradient-to-br from-green-50 to-cyan-50 dark:from-green-950/40 dark:to-cyan-950/40 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">On Time</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">{onTimeDeliveries}</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/40 dark:to-orange-950/40 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">Delayed</div>
                <div className="text-xl font-bold text-red-600 dark:text-red-400">{delayedDeliveries}</div>
              </div>
            </div>
          </div>
        </InsightCard>
        
        {/* Risk Assessment */}
        <InsightCard
          title="Delivery Risk Assessment"
          icon={<Zap className="h-4 w-4" />}
          color="text-amber-600 dark:text-amber-400"
          bgColor="bg-amber-50 dark:bg-amber-950/50"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="flex flex-col items-center p-2 bg-red-50 dark:bg-red-950/40 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">High</div>
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{shippingsByRisk.high}</div>
              </div>
              <div className="flex flex-col items-center p-2 bg-yellow-50 dark:bg-yellow-950/40 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">Medium</div>
                <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{shippingsByRisk.medium}</div>
              </div>
              <div className="flex flex-col items-center p-2 bg-green-50 dark:bg-green-950/40 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">Low</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{shippingsByRisk.low}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm">Risk Factors</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-md">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm">Weather Impact</span>
                </div>
                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800">
                  {weatherImpacted}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-md">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm">Traffic Conditions</span>
                </div>
                <Badge className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800">
                  {trafficImpacted}
                </Badge>
              </div>
            </div>
          </div>
        </InsightCard>
        
        {/* Package Status Distribution */}
        <InsightCard
          title="Package Status Distribution"
          icon={<Package className="h-4 w-4" />}
          color="text-purple-600 dark:text-purple-400"
          bgColor="bg-purple-50 dark:bg-purple-950/50"
        >
          <div className="space-y-3">
            <div className="flex flex-col space-y-2">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-yellow-600" /> Pending</span>
                  <span className="font-medium">{pendingCount}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(pendingCount / shipping.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0 }}
                    className="h-full rounded-full bg-yellow-500 dark:bg-yellow-600"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1"><PackageOpen className="h-3 w-3 text-blue-600" /> Processing</span>
                  <span className="font-medium">{processingCount}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(processingCount / shipping.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="h-full rounded-full bg-blue-500 dark:bg-blue-600"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1"><Truck className="h-3 w-3 text-purple-600" /> Shipped</span>
                  <span className="font-medium">{shippedCount}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(shippedCount / shipping.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full bg-purple-500 dark:bg-purple-600"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1"><Package className="h-3 w-3 text-green-600" /> Delivered</span>
                  <span className="font-medium">{deliveredCount}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(deliveredCount / shipping.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full bg-green-500 dark:bg-green-600"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1"><AlertCircle className="h-3 w-3 text-red-600" /> Returned</span>
                  <span className="font-medium">{returnedCount}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(returnedCount / shipping.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full rounded-full bg-red-500 dark:bg-red-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </InsightCard>
      </div>
      
      {/* AI Recommendations */}
      <Card className="border-cyan-200 dark:border-cyan-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 pb-4">
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-cyan-800 dark:text-cyan-300">
            <Brain className="h-5 w-5" />
            AI Shipping Recommendations
          </CardTitle>
          <CardDescription>Smart suggestions to optimize your shipping operations</CardDescription>
        </CardHeader>
        <CardContent className="p-4 bg-white dark:bg-slate-900">
          <div className="space-y-3">
            {topSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg flex gap-3 items-start">
                <div className="p-2 rounded-full bg-cyan-100 dark:bg-cyan-800">
                  <TrendingUp className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion.text}</p>
                  <div className="flex items-center mt-2 text-xs text-cyan-600 dark:text-cyan-400">
                    <span>Suggested for {suggestion.count} shipments</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 border border-cyan-100 dark:border-cyan-900 rounded-lg bg-gradient-to-r from-white to-cyan-50 dark:from-slate-900 dark:to-cyan-950/30">
            <h4 className="text-sm font-medium text-cyan-800 dark:text-cyan-300 mb-2">Overall Shipping Health</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Your shipping operations are performing at {Math.round((onTimeDeliveries / shipping.length) * 100)}% efficiency with {shippingsByRisk.high} high-risk deliveries that need attention.
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-300 dark:border-cyan-800">
                AI Analysis
              </Badge>
              <Badge className={onTimeDeliveries > delayedDeliveries ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800" : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"}>
                {onTimeDeliveries > shipping.length * 0.9 ? "Excellent" : onTimeDeliveries > shipping.length * 0.8 ? "Good" : onTimeDeliveries > shipping.length * 0.6 ? "Average" : "Needs Improvement"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 