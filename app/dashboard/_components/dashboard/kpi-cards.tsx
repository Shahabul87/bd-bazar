"use client";

import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Activity
} from 'lucide-react';

interface KPICardsProps {
  dateRange: string;
}

export const KPICards = ({ dateRange }: KPICardsProps) => {
  // In a real app, these would come from an API based on the date range
  const kpiData = [
    { 
      title: 'Total Revenue', 
      value: '$12,648.75', 
      change: 12.5, 
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-600',
      secondaryValue: '94 orders'
    },
    { 
      title: 'Orders', 
      value: '149', 
      change: 8.2, 
      icon: ShoppingCart, 
      color: 'from-blue-500 to-indigo-600',
      secondaryValue: '34 pending'
    },
    { 
      title: 'Conversion Rate', 
      value: '3.6%', 
      change: -2.4, 
      icon: Activity, 
      color: 'from-purple-500 to-fuchsia-600',
      secondaryValue: '1,023 visits'
    },
    { 
      title: 'New Customers', 
      value: '28', 
      change: 16.8, 
      icon: Users, 
      color: 'from-orange-500 to-pink-600',
      secondaryValue: '18% returning'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <div 
          key={index}
          className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{kpi.value}</h3>
              </div>
              <div className={`
                h-12 w-12 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center
              `}>
                <kpi.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {kpi.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  kpi.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                </span>
              </div>
              <span className="text-sm text-slate-500">{kpi.secondaryValue}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 