"use client";

import { useState, useEffect } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { 
  Store, 
  Plus, 
  Globe, 
  Settings, 
  BarChart3, 
  ExternalLink, 
  Copy, 
  MoreHorizontal, 
  Paintbrush, 
  Package,
  Grid3x3,
  List,
  Loader2,
  Check,
  PlusCircle
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { CreateStoreModal } from "./create-store-modal";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/app/dashboard/_components/dashboard/dashboard-header";
import { DashboardShell } from "@/app/dashboard/_components/dashboard/dashboard-shell";
import { StoreCard } from "./store-card";
import { EmptyStores } from "./empty-stores";
import { toast } from "sonner";
import axios from "axios";

interface StoreManagementClientProps {
  user: any; // Accept any user type to avoid type conflicts
  initialStores?: any[]; // In a real app, you would type this properly
}

interface Store {
  id: string;
  name: string;
  slug: string;
  type: string;
  theme: string;
  status: 'active' | 'inactive' | 'pending';
  visitors: number;
  orders: number;
  revenue: number;
  lastUpdated: string;
  products: number;
  logo?: string;
}

// Mock store data - in a real app, this would come from an API
const MOCK_STORES: Store[] = [
  {
    id: '1',
    name: 'Tech Haven',
    slug: 'tech-haven',
    type: 'Electronics',
    theme: 'Modern Dark',
    status: 'active',
    visitors: 1250,
    orders: 42,
    revenue: 3840,
    lastUpdated: '2023-12-15',
    products: 104,
    logo: "/assets/default-store-icon.svg"
  },
  {
    id: '2',
    name: 'Fashion Forward',
    slug: 'fashion-forward',
    type: 'Clothing',
    theme: 'Elegant Light',
    status: 'active',
    visitors: 845,
    orders: 31,
    revenue: 2560,
    lastUpdated: '2023-12-18',
    products: 78,
    logo: "/assets/default-store-icon.svg"
  },
  {
    id: '3',
    name: 'Home Essentials',
    slug: 'home-essentials',
    type: 'Home & Garden',
    theme: 'Cozy Neutral',
    status: 'pending',
    visitors: 0,
    orders: 0,
    revenue: 0,
    lastUpdated: '2023-12-20',
    products: 45,
    logo: "/assets/default-store-icon.svg"
  }
];

// Store templates
const STORE_TEMPLATES = [
  {
    id: 'electronics',
    name: 'Electronics Store',
    description: 'Optimized for selling tech products and gadgets',
    features: ['Product comparison', 'Specifications display', 'Related accessories']
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    description: 'Perfect for clothing, accessories, and footwear',
    features: ['Size guides', 'Color variants', 'Outfit suggestions']
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Ideal for furniture, decor, and garden products',
    features: ['Room visualization', 'Dimension details', 'Care instructions']
  },
  {
    id: 'beauty',
    name: 'Beauty & Cosmetics',
    description: 'Designed for makeup, skincare, and beauty products',
    features: ['Ingredient lists', 'How-to guides', 'Personalized recommendations']
  },
  {
    id: 'food',
    name: 'Food & Grocery',
    description: 'Optimized for food products and grocery items',
    features: ['Nutritional information', 'Recipe suggestions', 'Dietary filters']
  },
  {
    id: 'general',
    name: 'General Merchandise',
    description: 'Versatile template for various product types',
    features: ['Flexible layouts', 'Customizable categories', 'Adaptable product pages']
  }
];

// Store themes
const STORE_THEMES = [
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    preview: '/themes/modern-dark.jpg'
  },
  {
    id: 'elegant-light',
    name: 'Elegant Light',
    preview: '/themes/elegant-light.jpg'
  },
  {
    id: 'vibrant-colorful',
    name: 'Vibrant Colorful',
    preview: '/themes/vibrant-colorful.jpg'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    preview: '/themes/minimalist.jpg'
  },
  {
    id: 'cozy-neutral',
    name: 'Cozy Neutral',
    preview: '/themes/cozy-neutral.jpg'
  },
  {
    id: 'bold-contrast',
    name: 'Bold Contrast',
    preview: '/themes/bold-contrast.jpg'
  }
];

export function StoreManagementClient({ user, initialStores }: StoreManagementClientProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [isCreatingStore, setIsCreatingStore] = useState(false);
  const [stores, setStores] = useState<Store[]>(initialStores || MOCK_STORES);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch stores on component mount
  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/stores");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
        toast.error("Failed to load stores");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Copy store URL to clipboard
  const copyStoreUrl = (slug: string) => {
    const url = `${window.location.origin}/store/${slug}`;
    navigator.clipboard.writeText(url);
    // Show toast notification
    setShowLinkCopied(true);
    setTimeout(() => setShowLinkCopied(false), 2000);
  };

  const handleCreateStore = async (storeData: { name: string; type: string; theme: string }) => {
    // In a real app, this would be an API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Create a new store with mock data
          const newStore = {
            id: `store-${stores.length + 1}`,
            name: storeData.name,
            slug: storeData.name.toLowerCase().replace(/\s+/g, '-'),
            type: storeData.type,
            theme: storeData.theme,
            status: "active" as const,
            visitors: 0,
            orders: 0,
            revenue: 0,
            lastUpdated: new Date().toISOString(),
            products: 0,
            logo: "/assets/default-store-icon.svg" // Use a static image path instead of inline SVG
          };

          setStores(prev => [newStore, ...prev]);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1500); // Simulate API delay
    });
  };

  const handleCreateSuccess = (newStore: Store) => {
    setStores(prev => [...prev, newStore]);
    router.refresh();
  };

  return (
    <DashboardShell>
      {/* Hero section with gradient background */}
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
        
        <div className="relative px-6 md:px-8 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Store className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
                {language === 'en' ? 'Management' : 'ম্যানেজমেন্ট'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              {language === 'en' ? 'Your Stores' : 'আপনার স্টোরগুলি'}
            </h1>
            <p className="text-white/80 max-w-lg text-sm md:text-base">
              {language === 'en' 
                ? 'Create and manage your online storefronts. Each store can have its own products, theme, and settings.' 
                : 'আপনার অনলাইন স্টোরফ্রন্টগুলি তৈরি এবং পরিচালনা করুন। প্রতিটি স্টোরের নিজস্ব পণ্য, থিম এবং সেটিংস থাকতে পারে।'}
            </p>
          </div>
          
          <Button 
            onClick={() => setIsCreatingStore(true)}
            className="bg-white text-indigo-700 hover:bg-white/90 shadow-lg px-4 md:px-5 py-2 md:py-6 h-auto whitespace-nowrap"
            size="lg"
          >
            <PlusCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            {language === 'en' ? 'Create Store' : 'স্টোর তৈরি করুন'}
          </Button>
        </div>
      </div>

      {/* Store stats overview */}
      {!isCreatingStore && stores.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
            <span className="text-slate-400 text-xs md:text-sm mb-1">{language === 'en' ? 'Total Stores' : 'মোট স্টোর'}</span>
            <span className="text-white text-xl md:text-2xl font-bold">{stores.length}</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
            <span className="text-slate-400 text-xs md:text-sm mb-1">{language === 'en' ? 'Active Stores' : 'সক্রিয় স্টোর'}</span>
            <span className="text-white text-xl md:text-2xl font-bold">{stores.filter(s => s.status === 'active').length}</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
            <span className="text-slate-400 text-xs md:text-sm mb-1">{language === 'en' ? 'Total Products' : 'মোট পণ্য'}</span>
            <span className="text-white text-xl md:text-2xl font-bold">{stores.reduce((acc, store) => acc + store.products, 0)}</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
            <span className="text-slate-400 text-xs md:text-sm mb-1">{language === 'en' ? 'Total Revenue' : 'মোট রাজস্ব'}</span>
            <span className="text-white text-xl md:text-2xl font-bold">${stores.reduce((acc, store) => acc + store.revenue, 0)}</span>
          </div>
        </div>
      )}

      {/* View mode switcher */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 mb-6">
        <h2 className="text-lg md:text-xl font-medium text-white">
          {language === 'en' ? 'Store Overview' : 'স্টোর ওভারভিউ'}
        </h2>
        <div className="flex bg-slate-800/80 rounded-lg p-1 border border-slate-700/50">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md flex items-center ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Grid3x3 className="h-4 w-4 mr-1 md:mr-2" />
            <span className="text-xs md:text-sm font-medium">{language === 'en' ? 'Grid' : 'গ্রিড'}</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md flex items-center ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <List className="h-4 w-4 mr-1 md:mr-2" />
            <span className="text-xs md:text-sm font-medium">{language === 'en' ? 'List' : 'তালিকা'}</span>
          </button>
        </div>
      </div>

      {/* Stores display - Loading state */}
      {isCreatingStore && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-800/30 border border-slate-700/50 rounded-xl backdrop-blur-sm">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-indigo-300/30 border-t-indigo-600 animate-spin"></div>
            <Store className="h-6 w-6 text-indigo-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-300 mt-6 font-medium">
            {language === 'en' ? 'Loading your stores...' : 'আপনার স্টোরগুলি লোড হচ্ছে...'}
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isCreatingStore && stores.length === 0 && (
        <EmptyStores onCreateStore={() => setIsCreatingStore(true)} />
      )}

      {/* Grid view */}
      {!isCreatingStore && stores.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}

      {/* List view with improved styling */}
      {!isCreatingStore && stores.length > 0 && viewMode === 'list' && (
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
              {stores.map((store, index) => (
                <tr 
                  key={store.id} 
                  className={`border-b border-slate-700/50 hover:bg-slate-700/20 ${index % 2 === 0 ? 'bg-slate-800/20' : ''}`}
                >
                  <td className="p-3 md:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        {store.logo ? (
                          <img 
                            src={store.logo} 
                            alt={`${store.name} logo`} 
                            className="w-4 h-4 md:w-5 md:h-5" 
                          />
                        ) : (
                          <Store className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm md:text-base">{store.name}</h4>
                        <p className="text-xs text-gray-400">/{store.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 md:p-4 text-gray-300 text-sm hidden md:table-cell">{store.type}</td>
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
                  <td className="p-3 md:p-4 text-gray-300 text-sm hidden lg:table-cell">{store.products}</td>
                  <td className="p-3 md:p-4 text-gray-300 text-sm hidden lg:table-cell">{store.orders}</td>
                  <td className="p-3 md:p-4 text-gray-300 text-sm hidden lg:table-cell">${store.revenue}</td>
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
                        onClick={() => copyStoreUrl(store.slug)}
                        className="p-1 md:p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-indigo-600/30 transition-colors"
                        title={language === 'en' ? 'Copy Link' : 'লিঙ্ক কপি করুন'}
                      >
                        <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </button>
                      <a 
                        href={`/dashboard/stores/${store.id}`}
                        className="p-1 md:p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-indigo-600/30 transition-colors"
                        title={language === 'en' ? 'Manage Store' : 'স্টোর পরিচালনা করুন'}
                      >
                        <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Store Modal */}
      <CreateStoreModal
        isOpen={isCreatingStore}
        onClose={() => setIsCreatingStore(false)}
        templates={STORE_TEMPLATES}
        themes={STORE_THEMES}
        onSuccess={handleCreateSuccess}
      />

      {/* Link copied notification */}
      <div 
        className={`fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-opacity duration-200 ${
          showLinkCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Check className="h-5 w-5 text-white" />
        <span>{language === 'en' ? 'Link copied to clipboard' : 'লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে'}</span>
      </div>
    </DashboardShell>
  );
} 