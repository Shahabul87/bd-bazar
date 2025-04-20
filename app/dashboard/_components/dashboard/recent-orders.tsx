"use client";

import { useState } from 'react';
import { ShoppingCart, EyeIcon, MoreHorizontal, ChevronRight, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export function RecentOrders() {
  // In a real app, these would come from an API
  const orders = [
    {
      id: 'ORD-7843',
      customer: 'Ahmed Rahman',
      email: 'ahmed.r@example.com',
      date: 'Today, 2:30 PM',
      amount: '$229.99',
      status: 'completed',
      items: 3
    },
    {
      id: 'ORD-7842',
      customer: 'Fatima Khan',
      email: 'fatima.k@example.com',
      date: 'Today, 11:15 AM',
      amount: '$129.50',
      status: 'processing',
      items: 2
    },
    {
      id: 'ORD-7841',
      customer: 'Mohammad Ali',
      email: 'mohammad.a@example.com',
      date: 'Yesterday, 8:45 PM',
      amount: '$89.99',
      status: 'completed',
      items: 1
    },
    {
      id: 'ORD-7840',
      customer: 'Nusrat Jahan',
      email: 'nusrat.j@example.com',
      date: 'Yesterday, 3:20 PM',
      amount: '$345.00',
      status: 'failed',
      items: 4
    },
    {
      id: 'ORD-7839',
      customer: 'Rafiq Islam',
      email: 'rafiq.i@example.com',
      date: 'Mar 12, 10:30 AM',
      amount: '$175.25',
      status: 'completed',
      items: 2
    }
  ];
  
  const statusStyles = {
    completed: 'bg-green-500/10 text-green-500 border-green-500/20',
    processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    failed: 'bg-red-500/10 text-red-500 border-red-500/20'
  };
  
  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'completed') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'processing') return <Clock className="h-4 w-4 text-blue-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };
  
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
      <div className="border-b border-slate-700/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <ShoppingCart className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-medium text-white">Recent Orders</h3>
        </div>
        
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">ORDER ID</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">CUSTOMER</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">DATE</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">AMOUNT</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">STATUS</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-400">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
              >
                <td className="py-3 px-4">
                  <span className="font-medium text-white">{order.id}</span>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-white">{order.customer}</div>
                    <div className="text-xs text-gray-400">{order.email}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-300">
                  {order.date}
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-white">{order.amount}</span>
                  <span className="text-xs text-gray-400 ml-1">({order.items} items)</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={order.status} />
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusStyles[order.status as keyof typeof statusStyles]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-slate-700/50">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-slate-700/50">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 text-center">
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
} 