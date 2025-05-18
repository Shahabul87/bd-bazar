"use client";

import { motion } from "framer-motion";
import { Users, Brain, Sparkles } from "lucide-react";

interface CustomersHeaderProps {
  storeName: string;
  customerCount: number;
}

export const CustomersHeader = ({
  storeName,
  customerCount,
}: CustomersHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden"
    >
      {/* Background with cyberpunk gradient and neural pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600" />
      
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="neural-grid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="white" />
              <path d="M20 0 V40 M0 20 H40" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
              <path d="M0 0 L40 40 M40 0 L0 40" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>
      
      <div className="relative p-8 z-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-6 md:mb-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white/90 text-xs font-medium mb-4">
            <Brain className="h-3 w-3 mr-1" />
            <span>AI-Powered Customer Insights</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 flex items-center">
            Customer Intelligence
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 3,
                ease: "easeInOut" 
              }}
              className="ml-3"
            >
              <Sparkles className="h-7 w-7 text-yellow-300" />
            </motion.div>
          </h1>
          
          <p className="text-white/80 max-w-2xl">
            Discover powerful insights about customers who shop at <span className="font-semibold">{storeName}</span>. 
            Our AI analyzes purchase patterns, predicts behavior, and helps you build customer relationships.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center px-5 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm text-center">
          <div className="text-4xl font-bold text-white mb-1">
            {customerCount}
          </div>
          <div className="text-white/80 text-sm flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {customerCount === 1 ? "Customer" : "Customers"}
          </div>
        </div>
      </div>
      
      {/* Animated floating elements */}
      <motion.div 
        className="absolute top-6 right-1/4 w-1 h-1 rounded-full bg-cyan-300"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-8 right-1/3 w-1.5 h-1.5 rounded-full bg-yellow-300"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.7, 1, 0.7] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 4,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-16 w-2 h-2 rounded-full bg-green-300"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 5,
          ease: "easeInOut" 
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-fuchsia-500/30 blur-2xl" />
      <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-blue-500/30 blur-2xl" />
    </motion.div>
  );
}; 