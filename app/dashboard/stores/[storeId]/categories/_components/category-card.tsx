"use client";

import { useRouter } from "next/navigation";
import { Edit, Tag, Trash, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryWithProductCount } from "@/actions/get-store-categories";
import { useState } from "react";

interface CategoryCardProps {
  category: CategoryWithProductCount;
  storeId: string;
}

export const CategoryCard = ({
  category,
  storeId
}: CategoryCardProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Get a consistent color based on the category name
  const getCategoryColor = (mainCategory: string) => {
    // Predefined color schemes with good contrast for dark theme
    const colorSchemes = [
      { bg: "bg-slate-800/70", border: "border-sky-900/50", text: "text-sky-500", accent: "text-sky-500" }, // Sky
      { bg: "bg-slate-800/70", border: "border-emerald-900/50", text: "text-emerald-500", accent: "text-emerald-500" }, // Emerald
      { bg: "bg-slate-800/70", border: "border-orange-900/50", text: "text-orange-500", accent: "text-orange-500" }, // Orange
      { bg: "bg-slate-800/70", border: "border-purple-900/50", text: "text-purple-500", accent: "text-purple-500" }, // Purple
      { bg: "bg-slate-800/70", border: "border-rose-900/50", text: "text-rose-500", accent: "text-rose-500" }, // Rose
      { bg: "bg-slate-800/70", border: "border-indigo-900/50", text: "text-indigo-500", accent: "text-indigo-500" }, // Indigo
      { bg: "bg-slate-800/70", border: "border-amber-900/50", text: "text-amber-500", accent: "text-amber-500" }, // Amber
    ];

    // Use string hash to pick a consistent color
    let hash = 0;
    for (let i = 0; i < mainCategory.length; i++) {
      hash = mainCategory.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colorSchemes.length;
    return colorSchemes[index];
  };

  const colors = getCategoryColor(category.mainCategory);

  return (
    <motion.div
      variants={item}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative rounded-xl overflow-hidden border border-slate-700 transition-all duration-300 shadow-sm hover:shadow-md ${colors.bg} ${isHovered ? colors.border : ""}`}
        style={{ transform: isHovered ? 'translateY(-5px)' : 'none' }}
      >
        {/* Category card header with icon */}
        <div className="px-5 pt-5 pb-3 border-b border-slate-700/50">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 rounded-lg bg-slate-800/80">
              <Tag className={`h-5 w-5 ${colors.accent}`} />
            </div>
            
            <div className="flex space-x-1">
              <button 
                onClick={() => router.push(`/dashboard/stores/${storeId}/categories/${category.id}`)}
                className="p-1.5 rounded-full bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
                title="Edit category"
              >
                <Edit className="h-3.5 w-3.5" />
              </button>
              <button 
                className="p-1.5 rounded-full bg-slate-700/50 hover:bg-rose-900/70 text-slate-300 hover:text-rose-300 transition-colors"
                title="Delete category"
              >
                <Trash className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          
          <h3 className={`text-lg font-semibold text-white`}>
            {category.mainCategory}
          </h3>
          
          {category.subCategory && (
            <div className={`text-sm font-medium mt-0.5 text-slate-400`}>
              {category.subCategory}
              {category.finalCategory && ` › ${category.finalCategory}`}
            </div>
          )}
        </div>
        
        {/* Category card body */}
        <div className="px-5 py-4">
          {/* Product count */}
          <div className="flex items-center mb-3 text-slate-300">
            <ShoppingBag className="h-4 w-4 mr-1.5 opacity-70" />
            <span className="text-sm font-medium">
              {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
            </span>
          </div>
          
          {/* Category slug */}
          <div className="flex items-center">
            <code className={`text-xs px-2 py-1 rounded font-mono bg-slate-800 border border-slate-700 ${colors.text}`}>
              /{category.slug}
            </code>
          </div>
          
          {/* View products button */}
          <button
            onClick={() => router.push(`/dashboard/stores/${storeId}/products?category=${category.id}`)}
            className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              isHovered ? `${colors.bg} text-white` : 'bg-slate-800 text-slate-300'
            } border-slate-700`}
          >
            View Products
          </button>
        </div>
      </div>
    </motion.div>
  );
}; 