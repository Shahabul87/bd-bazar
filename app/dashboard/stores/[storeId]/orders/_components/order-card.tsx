"use client";

import { motion } from "framer-motion";
import { OrderWithDetails } from "@/actions/get-store-orders";
import { Clock, CheckCircle, XCircle, Package, User, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";

interface OrderCardProps {
  order: OrderWithDetails;
  storeId: string;
}

export const OrderCard = ({ order, storeId }: OrderCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Get status based styling
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          icon: Clock,
          iconBg: "bg-yellow-500",
        };
      case "processing":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          icon: Package,
          iconBg: "bg-blue-500",
        };
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: CheckCircle,
          iconBg: "bg-green-500",
        };
      case "cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: XCircle,
          iconBg: "bg-red-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: Package,
          iconBg: "bg-gray-500",
        };
    }
  };
  
  const statusStyles = getStatusStyles(order.status);
  const StatusIcon = statusStyles.icon;
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={item}
      layoutId={`order-${order.id}`}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer relative bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      style={{ 
        transform: expanded ? 'scale(1.02)' : 'scale(1)',
        zIndex: expanded ? 10 : 1 
      }}
    >
      {/* Order header */}
      <div className="p-5 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`h-8 w-8 rounded-full ${statusStyles.iconBg} flex items-center justify-center`}>
              <StatusIcon className="h-4 w-4 text-white" />
            </div>
            <div className="font-medium">{order.id.slice(0, 8)}</div>
          </div>
          
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles.bg} ${statusStyles.text}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">{format(new Date(order.createdAt), 'MMM d, yyyy')}</p>
          </div>
          <div>
            <p className="text-gray-500">Total</p>
            <p className="font-medium">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      {/* Order details */}
      <div className="p-5">
        <div className="flex items-start space-x-3 mb-4">
          <User className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">{order.user.name || 'Guest User'}</p>
            <p className="text-gray-500 text-sm">{order.user.email || 'No email provided'}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Order Items</p>
          
          <div className="grid grid-cols-1 gap-3">
            {order.items.slice(0, expanded ? order.items.length : 2).map((item) => (
              <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg">
                <div className="relative h-10 w-10 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  {item.product.images[0] ? (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium truncate">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          {!expanded && order.items.length > 2 && (
            <div className="text-center pt-2">
              <button className="text-xs flex items-center justify-center w-full text-indigo-600 hover:text-indigo-800">
                {order.items.length - 2} more items <ChevronRight className="h-3 w-3 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Action button */}
      <div className="p-4 bg-gray-50 border-t">
        <button 
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Navigate to order details page
            window.location.href = `/dashboard/stores/${storeId}/orders/${order.id}`;
          }}
        >
          Manage Order
        </button>
      </div>
      
      {/* Decorative corner */}
      <div className={`absolute top-0 right-0 h-4 w-16 ${statusStyles.iconBg}`} style={{ borderBottomLeftRadius: '0.5rem' }} />
    </motion.div>
  );
}; 