"use client";

import { motion } from "framer-motion";
import { Package, TrendingUp } from "lucide-react";

interface OrdersHeaderProps {
  storeName: string;
  orderCount: number;
}

export const OrdersHeader = ({
  storeName,
  orderCount,
}: OrdersHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden"
    >
      {/* Background with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-700" />
      
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-6 md:mb-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white/90 text-xs font-medium mb-4">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>Orders Dashboard</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {storeName} Orders
          </h1>
          
          <p className="text-white/80 max-w-2xl">
            Track and manage all orders for your store. Process payments, update statuses,
            and handle customer requests all in one place.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center px-5 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm text-center">
          <div className="text-4xl font-bold text-white mb-1">
            {orderCount}
          </div>
          <div className="text-white/80 text-sm">
            {orderCount === 1 ? "Order" : "Orders"}
          </div>
        </div>
      </div>
      
      {/* Animated elements */}
      <div className="absolute top-6 right-1/4 w-1 h-1 rounded-full bg-yellow-300 animate-pulse opacity-75" />
      <div className="absolute bottom-8 right-1/3 w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse opacity-75" />
      <div className="absolute top-1/2 right-16 w-2 h-2 rounded-full bg-pink-300 animate-pulse opacity-75" />
      
      {/* Decorative element */}
      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-pink-500/20 blur-2xl" />
      <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl" />
    </motion.div>
  );
}; 