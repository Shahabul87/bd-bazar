"use client";

import { useRouter } from "next/navigation";
import { Store as StoreIcon, ExternalLink, Copy, Settings, FileText, Briefcase, Share2 } from "lucide-react";
import { Store } from "./types";
import { useState } from "react";
import { toast } from "sonner";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const router = useRouter();
  const [isSharing, setIsSharing] = useState(false);

  // Get unique color scheme based on business type
  const getColorScheme = (businessType: string = "") => {
    const type = businessType.toLowerCase();
    
    if (type.includes("fashion") || type.includes("clothing") || type.includes("apparel")) {
      return {
        gradient: "from-pink-600 to-purple-600",
        border: "border-pink-500/30",
        accent: "bg-pink-500",
        lightAccent: "bg-pink-500/10 text-pink-300",
        icon: "text-pink-400",
        hover: "hover:bg-pink-500/20 hover:text-pink-200"
      };
    } else if (type.includes("tech") || type.includes("electronic")) {
      return {
        gradient: "from-blue-600 to-cyan-600",
        border: "border-blue-500/30",
        accent: "bg-blue-500",
        lightAccent: "bg-blue-500/10 text-blue-300",
        icon: "text-blue-400",
        hover: "hover:bg-blue-500/20 hover:text-blue-200"
      };
    } else if (type.includes("food") || type.includes("restaurant") || type.includes("grocery")) {
      return {
        gradient: "from-orange-600 to-yellow-600",
        border: "border-orange-500/30",
        accent: "bg-orange-500",
        lightAccent: "bg-orange-500/10 text-orange-300",
        icon: "text-orange-400",
        hover: "hover:bg-orange-500/20 hover:text-orange-200"
      };
    } else if (type.includes("health") || type.includes("beauty") || type.includes("wellness")) {
      return {
        gradient: "from-green-600 to-emerald-600",
        border: "border-green-500/30",
        accent: "bg-green-500",
        lightAccent: "bg-green-500/10 text-green-300",
        icon: "text-green-400",
        hover: "hover:bg-green-500/20 hover:text-green-200"
      };
    } else if (type.includes("home") || type.includes("furniture") || type.includes("decor")) {
      return {
        gradient: "from-amber-600 to-yellow-600",
        border: "border-amber-500/30",
        accent: "bg-amber-500",
        lightAccent: "bg-amber-500/10 text-amber-300",
        icon: "text-amber-400",
        hover: "hover:bg-amber-500/20 hover:text-amber-200"
      };
    } else {
      // Default - indigo/purple
      return {
        gradient: "from-indigo-600 to-purple-600",
        border: "border-indigo-500/30",
        accent: "bg-indigo-500",
        lightAccent: "bg-indigo-500/10 text-indigo-300",
        icon: "text-indigo-400",
        hover: "hover:bg-indigo-500/20 hover:text-indigo-200"
      };
    }
  };

  const colorScheme = getColorScheme(store.businessType);

  // Handle sharing store
  const handleShareStore = async () => {
    const url = `${window.location.origin}/store/${store.slug}`;
    setIsSharing(true);

    try {
      if (navigator.share) {
        // Use native sharing if available
        await navigator.share({
          title: `${store.name} - Online Store`,
          text: `Check out ${store.name}!`,
          url: url
        });
        toast.success("Shared successfully!");
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  // Handle manage store click
  const handleManageStore = () => {
    router.push(`/dashboard/stores/${store.id}`);
  };

  return (
    <div className={`bg-slate-800/70 ${colorScheme.border} rounded-xl overflow-hidden flex flex-col transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-${colorScheme.accent}/10`}>
      {/* Gradient top bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${colorScheme.gradient}`}></div>
      
      {/* Store header with logo and name */}
      <div className="p-5 flex items-center gap-4">
        <div className={`w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br ${colorScheme.gradient} flex items-center justify-center shadow-md`}>
          {store.logo ? (
            <img 
              src={store.logo} 
              alt={`${store.name} logo`} 
              className="w-8 h-8 rounded-md" 
            />
          ) : (
            <StoreIcon className="h-8 w-8 text-white" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-white text-lg">{store.name}</h3>
          <p className="text-sm text-gray-400">/{store.slug}</p>
        </div>
      </div>
      
      <div className="px-5 pb-5">
        {/* Store type and theme */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`rounded-lg ${colorScheme.lightAccent} px-3 py-2`}>
            <p className="text-xs opacity-80 mb-1">Type</p>
            <p className="text-sm font-medium">{store.type}</p>
          </div>
          <div className="bg-slate-700/40 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-400 mb-1">Theme</p>
            <p className="text-sm text-white">{store.theme}</p>
          </div>
        </div>
        
        {/* Business type and description */}
        <div className="mb-4 bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-start gap-2 mb-3">
            <Briefcase className={`h-4 w-4 ${colorScheme.icon} mt-0.5 flex-shrink-0`} />
            <div>
              <p className="text-xs text-gray-400">Business Type</p>
              <p className="text-sm text-white">{store.businessType || 'Not specified'}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className={`h-4 w-4 ${colorScheme.icon} mt-0.5 flex-shrink-0`} />
            <div>
              <p className="text-xs text-gray-400">Description</p>
              <p className="text-sm text-white line-clamp-2">{store.description || 'No description'}</p>
            </div>
          </div>
        </div>
        
        {/* Store stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-800/80 rounded-lg p-2 text-center">
            <p className={`text-xs ${colorScheme.icon}`}>Products</p>
            <p className="text-white font-medium">{typeof store.products === 'number' ? store.products : 0}</p>
          </div>
          <div className="bg-slate-800/80 rounded-lg p-2 text-center">
            <p className={`text-xs ${colorScheme.icon}`}>Orders</p>
            <p className="text-white font-medium">{typeof store.orders === 'number' ? store.orders : 0}</p>
          </div>
          <div className="bg-slate-800/80 rounded-lg p-2 text-center">
            <p className={`text-xs ${colorScheme.icon}`}>Revenue</p>
            <p className="text-white font-medium">${typeof store.revenue === 'number' ? store.revenue : 0}</p>
          </div>
        </div>
        
        {/* Store status and actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              store.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
              store.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
              'bg-gray-500/10 text-gray-400 border border-gray-500/20'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full mr-1 ${
                store.status === 'active' ? 'bg-green-400' : 
                store.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-400'
              }`}></span>
              <span>{store.status}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareStore}
              disabled={isSharing}
              className={`p-2 ${colorScheme.icon} ${colorScheme.hover} rounded-lg transition-colors`}
              title="Share Store"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <a 
              href={`/store/${store.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 text-gray-400 hover:text-white rounded-lg hover:bg-indigo-600/30 transition-colors`}
              title="View Store"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={handleManageStore}
              className={`p-2 ${colorScheme.icon} ${colorScheme.hover} rounded-lg transition-colors`}
              title="Manage Store"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 