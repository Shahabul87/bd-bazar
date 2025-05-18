"use client";

import { useRouter } from "next/navigation";
import { Store, ExternalLink, Share2, Settings } from "lucide-react";
import { Store as StoreType } from "./types";
import { toast } from "sonner";

interface StoreListViewProps {
  stores: StoreType[];
  language: string;
  onCopyLink: (slug: string) => void;
}

export function StoreListView({ stores, language, onCopyLink }: StoreListViewProps) {
  const router = useRouter();

  // Get unique color for a business type
  const getColorScheme = (businessType: string = "") => {
    const type = businessType?.toLowerCase() || "";
    
    if (type.includes("fashion") || type.includes("clothing") || type.includes("apparel")) {
      return "bg-pink-500/10 text-pink-400 border-pink-500/30";
    } else if (type.includes("tech") || type.includes("electronic")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    } else if (type.includes("food") || type.includes("restaurant") || type.includes("grocery")) {
      return "bg-orange-500/10 text-orange-400 border-orange-500/30";
    } else if (type.includes("health") || type.includes("beauty") || type.includes("wellness")) {
      return "bg-green-500/10 text-green-400 border-green-500/30";
    } else if (type.includes("home") || type.includes("furniture") || type.includes("decor")) {
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    } else {
      // Default - indigo/purple
      return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
    }
  };

  // Handle share button click
  const handleShareStore = async (store: StoreType) => {
    const url = `${window.location.origin}/store/${store.slug}`;

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
    }
  };

  // Handle manage store
  const handleManageStore = (storeId: string) => {
    router.push(`/dashboard/stores/${storeId}`);
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-x-auto">
      <table className="w-full min-w-[650px]">
        <thead>
          <tr className="border-b border-slate-700/50 bg-slate-800/80">
            <th className="text-left p-3 md:p-4 text-gray-400 font-medium text-xs md:text-sm">
              {language === 'en' ? 'Store' : 'স্টোর'}
            </th>
            <th className="text-left p-3 md:p-4 text-gray-400 font-medium text-xs md:text-sm hidden md:table-cell">
              {language === 'en' ? 'Type' : 'ধরন'}
            </th>
            <th className="text-left p-3 md:p-4 text-gray-400 font-medium text-xs md:text-sm hidden sm:table-cell">
              {language === 'en' ? 'Status' : 'অবস্থা'}
            </th>
            <th className="text-left p-3 md:p-4 text-gray-400 font-medium text-xs md:text-sm hidden lg:table-cell">
              {language === 'en' ? 'Products' : 'পণ্য'}
            </th>
            <th className="text-left p-3 md:p-4 text-gray-400 font-medium text-xs md:text-sm hidden lg:table-cell">
              {language === 'en' ? 'Orders' : 'অর্ডার'}
            </th>
            <th className="text-left p-3 md:p-4 text-gray-400 font-medium text-xs md:text-sm hidden lg:table-cell">
              {language === 'en' ? 'Revenue' : 'রাজস্ব'}
            </th>
            <th className="text-right p-3 md:p-4 text-gray-400 font-medium text-xs md:text-sm">
              {language === 'en' ? 'Actions' : 'পদক্ষেপ'}
            </th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => {
            const typeColor = getColorScheme(store.businessType);
            
            return (
              <tr 
                key={store.id} 
                className={`border-b border-slate-700/50 hover:bg-slate-700/20 ${index % 2 === 0 ? 'bg-slate-800/20' : ''}`}
              >
                <td className="p-3 md:p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 md:w-10 md:h-10 flex-shrink-0 rounded-lg ${typeColor} border flex items-center justify-center`}>
                      {store.logo ? (
                        <img 
                          src={store.logo} 
                          alt={`${store.name} logo`} 
                          className="w-4 h-4 md:w-5 md:h-5" 
                        />
                      ) : (
                        <Store className="h-4 w-4 md:h-5 md:w-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm md:text-base">{store.name}</h4>
                      <p className="text-xs text-gray-400">/{store.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 md:p-4 text-gray-300 text-sm hidden md:table-cell">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs ${typeColor}`}>
                    {store.type}
                  </span>
                </td>
                <td className="p-3 md:p-4 hidden sm:table-cell">
                  <span className={`inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs font-medium ${
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
                </td>
                <td className="p-3 md:p-4 text-gray-300 text-sm hidden lg:table-cell">{typeof store.products === 'number' ? store.products.toString() : '0'}</td>
                <td className="p-3 md:p-4 text-gray-300 text-sm hidden lg:table-cell">{typeof store.orders === 'number' ? store.orders.toString() : '0'}</td>
                <td className="p-3 md:p-4 text-gray-300 text-sm hidden lg:table-cell">${typeof store.revenue === 'number' ? store.revenue.toString() : '0'}</td>
                <td className="p-3 md:p-4 text-right">
                  <div className="flex items-center justify-end gap-1 md:gap-2">
                    <a 
                      href={`/store/${store.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 md:p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-indigo-600/30 transition-colors"
                      title={language === 'en' ? 'View Store' : 'স্টোর দেখুন'}
                    >
                      <ExternalLink className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </a>
                    <button
                      onClick={() => handleShareStore(store)}
                      className="p-1 md:p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-indigo-600/30 transition-colors"
                      title={language === 'en' ? 'Share Store' : 'স্টোর শেয়ার করুন'}
                    >
                      <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </button>
                    <button 
                      onClick={() => handleManageStore(store.id)}
                      className="p-1 md:p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-indigo-600/30 transition-colors"
                      title={language === 'en' ? 'Manage Store' : 'স্টোর পরিচালনা করুন'}
                    >
                      <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 