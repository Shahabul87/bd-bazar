"use client";

import { TrendingUp, BrainCircuit, Zap } from 'lucide-react';

export function AIPredictions() {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
      <div className="border-b border-slate-700/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
            <BrainCircuit className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-medium text-white">AI Predictions</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <h4 className="text-white font-medium">Sales Forecast</h4>
          </div>
          <p className="text-gray-300 text-sm mb-3">
            Based on current data and market trends, your store is projected to achieve a <span className="text-green-400 font-medium">15% increase</span> in sales over the next month.
          </p>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Current</span>
            <span>Projected</span>
          </div>
        </div>
        
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <h4 className="text-white font-medium">Inventory Recommendations</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="h-4 w-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] mt-0.5">!</span>
              <span>Restock <strong>Wireless Earbuds</strong> within 5 days based on current sell-through rate.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-4 w-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[10px] mt-0.5">+</span>
              <span>Increase inventory of <strong>Phone Cases</strong> by 15% to meet projected holiday demand.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-4 w-4 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-[10px] mt-0.5">-</span>
              <span>Consider reducing stock of <strong>Tablet Accessories</strong> due to slowing demand.</span>
            </li>
          </ul>
        </div>
        
        <button className="w-full py-2 text-sm text-blue-400 hover:text-blue-300 font-medium">
          View All Predictions
        </button>
      </div>
    </div>
  );
} 