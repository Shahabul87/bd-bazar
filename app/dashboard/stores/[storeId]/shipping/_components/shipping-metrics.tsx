"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShippingItem } from "./shipping-column";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertCircle, Activity, Package, Truck, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// In a real application, you'd use a proper chart library like Recharts
// This is a simple implementation for demonstration
const SimpleBarChart = ({ data }: { data: { name: string; value: number; color: string }[] }) => {
  const max = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex flex-col space-y-2">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span className="font-medium">{item.value}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / max) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full rounded-full ${item.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

interface ShippingMetricsProps {
  shipping: ShippingItem[];
}

export const ShippingMetrics: React.FC<ShippingMetricsProps> = ({ shipping }) => {
  // Calculate metrics
  const totalShipments = shipping.length;
  const pendingShipments = shipping.filter(s => s.status === "pending").length;
  const processingShipments = shipping.filter(s => s.status === "processing").length;
  const shippedShipments = shipping.filter(s => s.status === "shipped").length;
  const deliveredShipments = shipping.filter(s => s.status === "delivered").length;
  const returnedShipments = shipping.filter(s => s.status === "returned").length;
  
  const onTimeShipments = shipping.filter(s => s.aiPrediction.deliveryOnTime).length;
  const delayedShipments = shipping.filter(s => !s.aiPrediction.deliveryOnTime).length;
  const onTimePercentage = totalShipments ? Math.round((onTimeShipments / totalShipments) * 100) : 0;
  
  const highRiskShipments = shipping.filter(s => s.aiPrediction.delayRisk === "high").length;
  const weatherImpactedShipments = shipping.filter(s => s.aiPrediction.weatherImpact !== "none").length;
  const trafficImpactedShipments = shipping.filter(s => s.aiPrediction.trafficConditions === "congested").length;
  
  // Shipping methods breakdown
  const shippingMethods = shipping.reduce((acc, item) => {
    acc[item.shippingMethod] = (acc[item.shippingMethod] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const shippingMethodData = Object.entries(shippingMethods).map(([name, value]) => ({
    name,
    value,
    color: 
      name === "Standard" ? "bg-blue-500 dark:bg-blue-600" : 
      name === "Express" ? "bg-purple-500 dark:bg-purple-600" : 
      name === "Next Day" ? "bg-green-500 dark:bg-green-600" : 
      "bg-cyan-500 dark:bg-cyan-600"
  }));
  
  // AI predictions analysis
  const delayRiskData = [
    { name: "Low Risk", value: shipping.filter(s => s.aiPrediction.delayRisk === "low").length, color: "bg-green-500 dark:bg-green-600" },
    { name: "Medium Risk", value: shipping.filter(s => s.aiPrediction.delayRisk === "medium").length, color: "bg-yellow-500 dark:bg-yellow-600" },
    { name: "High Risk", value: shipping.filter(s => s.aiPrediction.delayRisk === "high").length, color: "bg-red-500 dark:bg-red-600" },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Delivery Performance Card */}
      <Card className="overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full transform translate-x-10 -translate-y-10 z-0"></div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2 text-cyan-800 dark:text-cyan-300">
              <Activity className="h-5 w-5" />
              Delivery Performance
            </CardTitle>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
              {onTimePercentage}% On-Time
            </Badge>
          </div>
          <CardDescription>Overview of delivery performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-cyan-50 dark:from-green-950/40 dark:to-cyan-950/40 p-3 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">On-Time</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{onTimeShipments}</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/40 dark:to-orange-950/40 p-3 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">Delayed</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{delayedShipments}</div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Risk Distribution</div>
              <SimpleBarChart data={delayRiskData} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Shipping Methods Card */}
      <Card className="overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-pink-500/5 rounded-full transform -translate-x-20 translate-y-20 z-0"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-cyan-800 dark:text-cyan-300">
            <Truck className="h-5 w-5" />
            Shipping Methods
          </CardTitle>
          <CardDescription>Breakdown of shipping methods used</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleBarChart data={shippingMethodData} />
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
              <span className="text-sm">Avg. Delivery Time:</span>
              <span className="font-medium">3.2 days</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
              <span className="text-sm">Avg. Distance:</span>
              <span className="font-medium">423 mi</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Insights Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-cyan-950 relative border-cyan-200 dark:border-cyan-800">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 opacity-10"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-cyan-800 dark:text-cyan-300">
            <Brain className="h-5 w-5" />
            AI Shipping Insights
          </CardTitle>
          <CardDescription>AI-powered predictions and analysis</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">High Risk Shipments</span>
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
                {highRiskShipments}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Weather Impacted</span>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800">
                {weatherImpactedShipments}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Traffic Congestion</span>
              </div>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800">
                {trafficImpactedShipments}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 mt-2 bg-cyan-100/50 dark:bg-cyan-900/50 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                <span className="text-sm font-medium text-cyan-800 dark:text-cyan-200">AI Suggestion</span>
              </div>
            </div>
            <div className="text-sm p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg">
              Consider reviewing {highRiskShipments} high-risk shipments affected by weather and traffic conditions.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 