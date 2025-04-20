import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Suspense } from "react";
import { 
  Loader2, Store, BarChart3, Building2, Truck, Users, 
  BadgePercent, Package, ShoppingBag, Database
} from "lucide-react";
import { cookies } from "next/headers";
import { LanguageSwitcher } from "./_components/language-switcher";
import { StoreForm } from "./_components/store-form";

export const metadata = {
  title: "Store Details | Dashboard",
  description: "Manage your store details",
};

export default async function StoreDetailsPage({
  params
}: {
  params: { storeId: string }
}) {
  const session = await auth();
  const cookieStore = await cookies();
  const preferredLanguage = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  
  const { storeId } = await params;

  if (!session?.user) {
    redirect("/login");
  }

  // Text content in both languages
  const content = {
    en: {
      title: "Store Dashboard",
      subtitle: "Manage your store details and monitor performance",
      quickStats: "Quick Stats",
      editStoreDetails: "Edit Store Details",
      storeId: "Store ID",
      loading: "Loading your store details...",
      quickActions: "Quick Actions",
      actions: [
        { name: "Products", description: "Manage your products", icon: Package },
        { name: "Orders", description: "View and fulfill orders", icon: ShoppingBag },
        { name: "Customers", description: "Customer management", icon: Users },
        { name: "Analytics", description: "Performance metrics", icon: BarChart3 },
      ],
      stats: [
        { name: "Revenue", value: "$12,345", change: "+12%", icon: Database },
        { name: "Orders", value: "534", change: "+8%", icon: Truck },
        { name: "Customers", value: "1,290", change: "+18%", icon: Users },
        { name: "Conversion", value: "3.2%", change: "+5%", icon: BadgePercent },
      ]
    },
    bn: {
      title: "স্টোর ড্যাশবোর্ড",
      subtitle: "আপনার স্টোরের বিবরণ পরিচালনা করুন এবং পারফরম্যান্স মনিটর করুন",
      quickStats: "দ্রুত পরিসংখ্যান",
      editStoreDetails: "স্টোরের বিবরণ সম্পাদনা করুন",
      storeId: "স্টোর আইডি",
      loading: "আপনার স্টোরের বিবরণ লোড হচ্ছে...",
      quickActions: "দ্রুত কার্যক্রম",
      actions: [
        { name: "পণ্যসমূহ", description: "আপনার পণ্য পরিচালনা করুন", icon: Package },
        { name: "অর্ডারসমূহ", description: "অর্ডার দেখুন এবং পূরণ করুন", icon: ShoppingBag },
        { name: "গ্রাহকরা", description: "গ্রাহক ব্যবস্থাপনা", icon: Users },
        { name: "বিশ্লেষণ", description: "পারফরম্যান্স মেট্রিক্স", icon: BarChart3 },
      ],
      stats: [
        { name: "রাজস্ব", value: "$12,345", change: "+12%", icon: Database },
        { name: "অর্ডার", value: "534", change: "+8%", icon: Truck },
        { name: "গ্রাহক", value: "1,290", change: "+18%", icon: Users },
        { name: "রূপান্তর", value: "3.2%", change: "+5%", icon: BadgePercent },
      ]
    }
  };

  // Use the preferred language content
  const t = content[preferredLanguage as 'en' | 'bn'];

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen bg-gradient-to-bl from-slate-900 via-slate-800 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute -top-40 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute top-[30%] -left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with 3D-like effect */}
        <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.5))]"></div>
          <div className="relative px-6 py-10 md:px-8 md:py-12 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
                    <Store className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                  <div className="flex items-center">
                    <span className="text-white/90 text-sm font-medium uppercase tracking-wider mr-2">
                      {preferredLanguage === 'en' ? 'Store Management' : 'স্টোর ম্যানেজমেন্ট'}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white/90 text-xs px-2 py-1 rounded-md">
                      {preferredLanguage === 'en' ? 'PREMIUM' : 'প্রিমিয়াম'}
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-md">
                  {t.title}
                </h1>
                <p className="text-white/80 max-w-lg text-sm md:text-base">
                  {t.subtitle}
                </p>
              </div>
              
              <div className="mt-6 md:mt-0 flex items-center space-x-4">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white/90 text-sm border border-white/10">
                  <span className="font-medium mr-2">{t.storeId}:</span>
                  <span className="font-mono">{storeId}</span>
                </div>
                <LanguageSwitcher currentLanguage={preferredLanguage} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white/90 mb-4">{t.quickStats}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl
                          transform hover:scale-[1.02] transition-all duration-300 hover:bg-white/10
                          relative overflow-hidden group"
              >
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full
                             group-hover:scale-110 transition-transform duration-300"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-sm font-medium">{stat.name}</p>
                    <p className="text-white font-bold text-2xl mt-1">{stat.value}</p>
                    <span className={`text-sm font-medium mt-1 inline-block px-2 py-0.5 rounded-full ${
                      stat.change.startsWith('+') ? 'text-green-300 bg-green-900/20' : 'text-red-300 bg-red-900/20'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/5">
                    <stat.icon className="h-5 w-5 text-white/80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Store form section */}
          <div className="xl:col-span-9">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-8">
              <div className="px-6 py-4 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-b border-white/10">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-indigo-300" />
                  {t.editStoreDetails}
                </h2>
              </div>
              <div className="p-6">
                <Suspense
                  fallback={
                    <div className="flex flex-col justify-center items-center min-h-[400px]">
                      <div className="h-16 w-16 rounded-full border-4 border-indigo-300/30 border-t-indigo-600 animate-spin"></div>
                      <p className="text-white/70 mt-6 font-medium">
                        {t.loading}
                      </p>
                    </div>
                  }
                >
                  <StoreForm storeId={storeId} preferredLanguage={preferredLanguage} />
                </Suspense>
              </div>
            </div>
          </div>
          
          {/* Sidebar with quick actions */}
          <div className="xl:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl sticky top-6">
              <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-blue-600/30 to-indigo-600/30">
                <h3 className="text-lg font-medium text-white">{t.quickActions}</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {t.actions.map((action, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center p-3 rounded-lg text-left
                                bg-white/5 hover:bg-white/10 backdrop-blur-sm
                                border border-white/5 hover:border-white/20
                                transition-all duration-200 group"
                    >
                      <div className="mr-3 p-2 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-600/20 group-hover:from-indigo-500/30 group-hover:to-purple-600/30 transition-colors">
                        <action.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{action.name}</h4>
                        <p className="text-white/60 text-sm">{action.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 