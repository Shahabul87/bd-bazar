import { AlertCircle, Box, CheckCircle2 } from "lucide-react";
import { ProductStats } from "../types";

interface StatsOverviewProps {
  stats: ProductStats;
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-xl p-4 shadow-sm border border-emerald-100 dark:border-emerald-900/30">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">Total Products</p>
            <h3 className="text-2xl font-bold mt-1 text-emerald-800 dark:text-emerald-300">{stats.totalProducts}</h3>
          </div>
          <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg">
            <Box className="text-emerald-600 dark:text-emerald-400 h-5 w-5" />
          </div>
        </div>
        <p className="text-emerald-600/70 dark:text-emerald-400/70 text-xs mt-2">
          {stats.totalProducts > 0 
            ? `${Math.round(stats.activeProducts / stats.totalProducts * 100)}% active` 
            : "No products yet"}
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-900/30">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">Active Products</p>
            <h3 className="text-2xl font-bold mt-1 text-blue-800 dark:text-blue-300">
              {stats.activeProducts}
            </h3>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
            <CheckCircle2 className="text-blue-600 dark:text-blue-400 h-5 w-5" />
          </div>
        </div>
        <p className="text-blue-600/70 dark:text-blue-400/70 text-xs mt-2">
          Ready to sell in your store
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 rounded-xl p-4 shadow-sm border border-amber-100 dark:border-amber-900/30">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-amber-600 dark:text-amber-400 font-medium text-sm">Low Stock</p>
            <h3 className="text-2xl font-bold mt-1 text-amber-800 dark:text-amber-300">
              {stats.lowStock}
            </h3>
          </div>
          <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg">
            <AlertCircle className="text-amber-600 dark:text-amber-400 h-5 w-5" />
          </div>
        </div>
        <p className="text-amber-600/70 dark:text-amber-400/70 text-xs mt-2">
          Products with less than 10 in stock
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 rounded-xl p-4 shadow-sm border border-rose-100 dark:border-rose-900/30">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-rose-600 dark:text-rose-400 font-medium text-sm">Out of Stock</p>
            <h3 className="text-2xl font-bold mt-1 text-rose-800 dark:text-rose-300">
              {stats.outOfStock}
            </h3>
          </div>
          <div className="bg-rose-100 dark:bg-rose-900/50 p-2 rounded-lg">
            <AlertCircle className="text-rose-600 dark:text-rose-400 h-5 w-5" />
          </div>
        </div>
        <p className="text-rose-600/70 dark:text-rose-400/70 text-xs mt-2">
          Products that need restocking
        </p>
      </div>
    </div>
  );
}; 