"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PlusIcon, Sparkles } from "lucide-react";

interface AddCategoryButtonProps {
  storeId: string;
}

export const AddCategoryButton = ({ storeId }: AddCategoryButtonProps) => {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <div className="relative group">
        {/* Sparkle effects that appear on hover */}
        <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -top-1 left-6 text-amber-500">
            <Sparkles className="h-3 w-3" />
          </div>
          <div className="absolute top-4 -right-1 text-emerald-500">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="absolute -bottom-1 left-3 text-sky-500">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </div>
        
        <button
          onClick={() => router.push(`/dashboard/stores/${storeId}/categories/new`)}
          className="relative bg-gradient-to-br from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center transition-all duration-300 group-hover:scale-105"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Add Category</span>
        </button>
      </div>
    </motion.div>
  );
}; 