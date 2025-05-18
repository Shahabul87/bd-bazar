"use client";

import { useState } from "react";
import { OrderWithDetails } from "@/actions/get-store-orders";
import { OrderCard } from "./order-card";
import { motion } from "framer-motion";
import { Search, Filter, Package } from "lucide-react";

interface OrdersGridProps {
  orders: OrderWithDetails[];
  storeId: string;
}

export const OrdersGrid = ({ orders, storeId }: OrdersGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  if (orders.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm border border-dashed border-gray-300">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50">
          <Package className="h-8 w-8 text-indigo-500" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">No orders yet</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          When customers place orders that include products from your store, they will appear here.
        </p>
      </div>
    );
  }

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.user.name && order.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.user.email && order.user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.items.some(item => item.product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === null || 
      order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get unique statuses for the filter dropdown
  const statuses = [...new Set(orders.map(order => order.status))];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search orders by ID, customer, or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Status filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
            >
              <option value="">All statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border text-center">
          <p className="text-gray-500">No orders match your filters.</p>
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredOrders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              storeId={storeId} 
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}; 