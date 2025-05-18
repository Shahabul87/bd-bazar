"use client";

import { Card } from "@/components/ui/card";
import { Clock, PackageCheck, Truck, ShieldCheck, AlertTriangle } from "lucide-react";

interface PackageStatusCardProps {
  title: string;
  count: number;
  color: "yellow" | "blue" | "purple" | "green" | "red";
  percentage: number;
}

export const PackageStatusCard: React.FC<PackageStatusCardProps> = ({
  title,
  count,
  color,
  percentage
}) => {
  // Get icon based on title
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "processing":
        return <PackageCheck className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <ShieldCheck className="h-5 w-5" />;
      case "returned":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <PackageCheck className="h-5 w-5" />;
    }
  };

  // Get color based on status
  const getColorClasses = () => {
    switch (color) {
      case "yellow":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          text: "text-yellow-800 dark:text-yellow-300",
          iconBg: "bg-yellow-200 dark:bg-yellow-800",
          iconColor: "text-yellow-700 dark:text-yellow-300",
          progressBg: "bg-yellow-200 dark:bg-yellow-800/40",
          progressFill: "bg-yellow-500 dark:bg-yellow-600",
        };
      case "blue":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-800 dark:text-blue-300",
          iconBg: "bg-blue-200 dark:bg-blue-800",
          iconColor: "text-blue-700 dark:text-blue-300",
          progressBg: "bg-blue-200 dark:bg-blue-800/40",
          progressFill: "bg-blue-500 dark:bg-blue-600",
        };
      case "purple":
        return {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-800 dark:text-purple-300",
          iconBg: "bg-purple-200 dark:bg-purple-800",
          iconColor: "text-purple-700 dark:text-purple-300",
          progressBg: "bg-purple-200 dark:bg-purple-800/40",
          progressFill: "bg-purple-500 dark:bg-purple-600",
        };
      case "green":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-800 dark:text-green-300",
          iconBg: "bg-green-200 dark:bg-green-800",
          iconColor: "text-green-700 dark:text-green-300",
          progressBg: "bg-green-200 dark:bg-green-800/40",
          progressFill: "bg-green-500 dark:bg-green-600",
        };
      case "red":
        return {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-800 dark:text-red-300",
          iconBg: "bg-red-200 dark:bg-red-800",
          iconColor: "text-red-700 dark:text-red-300",
          progressBg: "bg-red-200 dark:bg-red-800/40",
          progressFill: "bg-red-500 dark:bg-red-600",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-900/30",
          text: "text-gray-800 dark:text-gray-300",
          iconBg: "bg-gray-200 dark:bg-gray-800",
          iconColor: "text-gray-700 dark:text-gray-300",
          progressBg: "bg-gray-200 dark:bg-gray-800/40",
          progressFill: "bg-gray-500 dark:bg-gray-600",
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <Card className={`p-4 border overflow-hidden relative ${colorClasses.bg} border-transparent`}>
      {/* Background gradient pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-black opacity-5"></div>
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white opacity-10"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${colorClasses.iconBg} ${colorClasses.iconColor}`}>
            {getIcon()}
          </div>
          <h3 className={`font-medium ${colorClasses.text}`}>{title}</h3>
        </div>
        
        <div className="mt-3">
          <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">{count}</div>
          
          {/* Progress bar */}
          <div className={`h-2 w-full rounded-full ${colorClasses.progressBg} overflow-hidden mt-2`}>
            <div
              className={`h-full rounded-full ${colorClasses.progressFill}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            {percentage}% of total shipments
          </div>
        </div>
      </div>
    </Card>
  );
}; 