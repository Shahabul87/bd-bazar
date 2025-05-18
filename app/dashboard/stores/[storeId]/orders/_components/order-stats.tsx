"use client";

import { motion } from "framer-motion";
import { OrderWithDetails } from "@/actions/get-store-orders";
import { Package, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

interface OrderStatsProps {
  orders: OrderWithDetails[];
}

export const OrderStats = ({ orders }: OrderStatsProps) => {
  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const processingOrders = orders.filter(order => order.status === "processing").length;
  const completedOrders = orders.filter(order => order.status === "completed").length;
  const cancelledOrders = orders.filter(order => order.status === "cancelled").length;
  
  const totalItems = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);
  
  // Array of stat cards
  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "bg-green-500",
      textColor: "text-green-600",
      borderColor: "border-green-300",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-300",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Processing",
      value: processingOrders,
      icon: Package,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      borderColor: "border-blue-300",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed",
      value: completedOrders,
      icon: CheckCircle,
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-300",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Cancelled",
      value: cancelledOrders,
      icon: XCircle,
      color: "bg-red-500",
      textColor: "text-red-600",
      borderColor: "border-red-300",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`relative overflow-hidden rounded-lg border ${stat.borderColor} ${stat.bgColor} p-5`}
        >
          <div className="flex justify-between">
            <div>
              <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`h-10 w-10 rounded-full ${stat.color} flex items-center justify-center`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </div>
          
          {/* Decorative gradient */}
          <div className={`absolute -bottom-2 -right-2 h-16 w-16 rounded-full ${stat.color} opacity-10 blur-xl`} />
        </motion.div>
      ))}
    </div>
  );
}; 