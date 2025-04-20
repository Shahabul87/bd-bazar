"use client";

import { Store as StoreType } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShoppingBag, Users, DollarSign, ArrowUpRight, Store, Settings, ExternalLink, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface StoreCardProps {
  store: StoreType;
}

export function StoreCard({ store }: StoreCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden transition-all bg-slate-800/60 border-slate-700/50 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-24 sm:h-28 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-between">
          <Badge 
            variant={store.status === "active" ? "default" : "outline"}
            className={`text-xs ${store.status === "active" 
              ? "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30" 
              : "bg-gray-700/20 hover:bg-gray-700/30 text-gray-400 border border-gray-500/30"}`}
          >
            <span className={`mr-1 h-1.5 w-1.5 rounded-full ${store.status === "active" ? "bg-green-400" : "bg-gray-400"}`}></span>
            {store.status === "active" ? "Active" : "Inactive"}
          </Badge>
          
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-transform duration-300">
            {store.logo ? (
              <img 
                src={store.logo} 
                alt={`${store.name} logo`} 
                className="w-4 h-4 sm:w-5 sm:h-5" 
              />
            ) : (
              <Store className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            )}
          </div>
        </div>
      </div>
      
      <CardHeader className="p-3 sm:p-4 pb-0">
        <div className="flex flex-col">
          <CardTitle className="text-base sm:text-lg font-medium text-white">{store.name}</CardTitle>
          <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
            <span className="text-indigo-400">/{store.slug}</span>
            <span className="mx-2 text-gray-600">•</span>
            {store.type}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-4 pt-2">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-3 sm:mt-4">
          <div className="flex flex-col items-center p-1.5 sm:p-2 rounded-lg bg-slate-700/30 transition-colors">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-400 mb-1" />
            <span className="text-[10px] sm:text-xs text-gray-400">Visitors</span>
            <span className="font-medium text-xs sm:text-sm text-white">{store.visitors}</span>
          </div>
          <div className="flex flex-col items-center p-1.5 sm:p-2 rounded-lg bg-slate-700/30 transition-colors">
            <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-400 mb-1" />
            <span className="text-[10px] sm:text-xs text-gray-400">Orders</span>
            <span className="font-medium text-xs sm:text-sm text-white">{store.orders}</span>
          </div>
          <div className="flex flex-col items-center p-1.5 sm:p-2 rounded-lg bg-slate-700/30 transition-colors">
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-400 mb-1" />
            <span className="text-[10px] sm:text-xs text-gray-400">Revenue</span>
            <span className="font-medium text-xs sm:text-sm text-white">${store.revenue}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between p-3 sm:p-4 pt-0 border-t border-slate-700/50 mt-3 sm:mt-4">
        <Button variant="ghost" size="sm" asChild className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-600/20 h-8 text-xs sm:text-sm px-2 sm:px-3">
          <Link href={`/dashboard/stores/${store.id}`} className="flex items-center">
            Manage
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
        
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-white hover:bg-indigo-600/20">
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-white hover:bg-indigo-600/20">
            <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </CardFooter>
      
      {/* Hover effect gradient border */}
      <div className={`absolute inset-0 border border-indigo-500/30 rounded-lg pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </Card>
  );
} 