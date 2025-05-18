"use client";

import { useRouter } from "next/navigation";
import { CategoryCard } from "./category-card";
import { CategoryWithProductCount } from "@/actions/get-store-categories";
import { motion } from "framer-motion";
import { PlusCircle, Tag, Layers } from "lucide-react";

interface CategoryGridProps {
  categories: CategoryWithProductCount[];
  storeId: string;
}

export const CategoryGrid = ({ 
  categories,
  storeId
}: CategoryGridProps) => {
  const router = useRouter();

  if (categories.length === 0) {
    return (
      <div className="mt-8 bg-slate-800/90 border border-slate-700 rounded-xl p-12 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-800/80 p-4 rounded-full mb-4">
          <Tag className="h-8 w-8 text-sky-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No categories yet</h3>
        <p className="text-slate-400 max-w-md mb-6">
          Start organizing your products by creating your first category. Categories help customers find products more easily.
        </p>
        <button
          onClick={() => router.push(`/dashboard/stores/${storeId}/categories/new`)}
          className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 shadow-sm transition-colors"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add your first category
        </button>
      </div>
    );
  }

  // Group categories by main category
  const groupedCategories: Record<string, CategoryWithProductCount[]> = {};
  
  categories.forEach(category => {
    if (!groupedCategories[category.mainCategory]) {
      groupedCategories[category.mainCategory] = [];
    }
    groupedCategories[category.mainCategory].push(category);
  });

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
    <div className="space-y-10">
      {Object.entries(groupedCategories).map(([mainCategory, categoryGroup], index) => (
        <div key={mainCategory} className="bg-slate-800/90 rounded-xl border border-slate-700 shadow-sm p-6">
          <div className="flex items-center mb-5">
            <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center mr-3">
              <Layers className="h-5 w-5 text-sky-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {mainCategory}
              </h2>
              <p className="text-sm text-slate-400">
                {categoryGroup.length} {categoryGroup.length === 1 ? 'subcategory' : 'subcategories'}
              </p>
            </div>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {categoryGroup.map((category) => (
              <CategoryCard 
                key={category.id}
                category={category}
                storeId={storeId}
              />
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}; 