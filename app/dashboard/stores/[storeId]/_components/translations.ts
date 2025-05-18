import { 
  BarChart3, Building2, Truck, Users, 
  BadgePercent, Package, ShoppingBag, Database
} from "lucide-react";

// Define text content in both languages
export const getTranslations = (language: 'en' | 'bn') => {
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

  return content[language];
}; 