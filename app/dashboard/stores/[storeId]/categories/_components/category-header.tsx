"use client";

import { Layers, Tag, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryHeaderProps {
  storeName: string;
  categoryCount: number;
}

export const CategoryHeader = ({
  storeName,
  categoryCount,
}: CategoryHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden bg-slate-800/90 border border-slate-700 shadow-md"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />
      
      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <div className="p-2.5 bg-slate-800/80 rounded-lg mr-3">
                <Layers className="h-5 w-5 text-sky-500" />
              </div>
              <h4 className="text-sm font-medium text-sky-500 uppercase tracking-wide">Product Categories</h4>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Manage Categories
            </h1>
            
            <p className="text-slate-400 max-w-2xl">
              Organize your products for <span className="font-semibold text-slate-300">{storeName}</span> with
              categories to improve discoverability and customer experience.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-slate-800/90 rounded-lg border border-slate-700 p-4 flex items-center">
              <div className="p-2 rounded-lg bg-slate-800/80 mr-3">
                <Tag className="h-4 w-4 text-sky-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {categoryCount}
                </div>
                <div className="text-sm text-slate-400">
                  {categoryCount === 1 ? "Category" : "Categories"}
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/90 rounded-lg border border-slate-700 p-4 flex items-center">
              <div className="p-2 rounded-lg bg-slate-800/80 mr-3">
                <ShoppingBag className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  100% 
                </div>
                <div className="text-sm text-slate-400">
                  Categorization
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 