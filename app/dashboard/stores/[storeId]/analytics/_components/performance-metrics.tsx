"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, TrendingDown, Users, ShoppingBag, 
  DollarSign, Repeat2, Star, CreditCard 
} from "lucide-react";
import { useState, useEffect } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  metricColor: "rose" | "orange" | "amber" | "emerald" | "green" | "blue" | "indigo" | "purple";
  changeColor: string;
}

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  metricColor, 
  changeColor 
}: MetricCardProps) => {
  const getIconBackgroundColor = () => {
    switch (metricColor) {
      case "rose":
        return "bg-rose-500/10 text-rose-400";
      case "orange":
        return "bg-orange-500/10 text-orange-400";
      case "amber":
        return "bg-amber-500/10 text-amber-400";
      case "emerald":
        return "bg-emerald-500/10 text-emerald-400";
      case "green":
        return "bg-green-500/10 text-green-400";
      case "blue":
        return "bg-blue-500/10 text-blue-400";
      case "indigo":
        return "bg-indigo-500/10 text-indigo-400";
      case "purple":
        return "bg-purple-500/10 text-purple-400";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  const getCardBorderColor = () => {
    switch (metricColor) {
      case "rose":
        return "border-rose-500/20";
      case "orange":
        return "border-orange-500/20";
      case "amber":
        return "border-amber-500/20";
      case "emerald":
        return "border-emerald-500/20";
      case "green":
        return "border-green-500/20";
      case "blue":
        return "border-blue-500/20";
      case "indigo":
        return "border-indigo-500/20";
      case "purple":
        return "border-purple-500/20";
      default:
        return "border-slate-700";
    }
  };

  const getValueColor = () => {
    switch (metricColor) {
      case "rose":
        return "text-rose-50";
      case "orange":
        return "text-orange-50";
      case "amber":
        return "text-amber-50";
      case "emerald":
        return "text-emerald-50";
      case "green":
        return "text-green-50";
      case "blue":
        return "text-blue-50";
      case "indigo":
        return "text-indigo-50";
      case "purple":
        return "text-purple-50";
      default:
        return "text-white";
    }
  };

  return (
    <Card className={`overflow-hidden ${getCardBorderColor()} bg-slate-800/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-300">{title}</p>
            <div className={`p-2 rounded-full ${getIconBackgroundColor()} border border-slate-600/40`}>
              {icon}
            </div>
          </div>
          <div className="mt-4">
            <h2 className={`text-3xl font-bold ${getValueColor()}`}>{value}</h2>
            <div className="flex items-center mt-2">
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400 mr-1" />
              )}
              <span className={`text-sm font-medium ${changeColor}`}>
                {change >= 0 ? "+" : ""}{change}% from last month
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PerformanceMetricsProps {
  storeId: string;
}

const PerformanceMetrics = ({ storeId }: PerformanceMetricsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    // Simulating API call to fetch metrics
    const fetchMetrics = () => {
      // In a real app, this would use the storeId to fetch store-specific metrics
      console.log(`Fetching metrics for store: ${storeId}`);
      
      setTimeout(() => {
        // Mock API response
        const mockMetrics = [
          {
            id: "1",
            title: "Total Revenue",
            value: "$12,458.75",
            change: 12.5,
            icon: <DollarSign className="w-4 h-4" />,
            metricColor: "green" as const,
            changeColor: "text-green-400"
          },
          {
            id: "2",
            title: "Orders",
            value: "384",
            change: 8.2,
            icon: <ShoppingBag className="w-4 h-4" />,
            metricColor: "blue" as const,
            changeColor: "text-green-400"
          },
          {
            id: "3",
            title: "Customers",
            value: "1,294",
            change: 5.7,
            icon: <Users className="w-4 h-4" />,
            metricColor: "purple" as const,
            changeColor: "text-green-400"
          },
          {
            id: "4",
            title: "Conversion Rate",
            value: "3.42%",
            change: -1.8,
            icon: <Repeat2 className="w-4 h-4" />,
            metricColor: "indigo" as const,
            changeColor: "text-rose-400"
          },
          {
            id: "5",
            title: "Avg. Order Value",
            value: "$34.72",
            change: 4.3,
            icon: <CreditCard className="w-4 h-4" />,
            metricColor: "orange" as const,
            changeColor: "text-green-400"
          },
          {
            id: "6",
            title: "Customer Satisfaction",
            value: "4.8/5",
            change: 0.2,
            icon: <Star className="w-4 h-4" />,
            metricColor: "rose" as const,
            changeColor: "text-green-400"
          },
        ];

        setMetrics(mockMetrics);
        setIsLoading(false);
      }, 1500);
    };

    fetchMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full p-8 rounded-lg border border-slate-700 bg-slate-800/90 backdrop-blur-sm">
        <div className="flex items-center justify-center h-60">
          <div className="animate-pulse text-slate-400">Loading metrics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            metricColor={metric.metricColor}
            changeColor={metric.changeColor}
          />
        ))}
      </div>
    </div>
  );
};

export { PerformanceMetrics }; 