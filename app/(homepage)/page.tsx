import { getLatestProducts, getTrendingProducts, getProductCount, getStoreCount } from "@/actions/get-all-products"
import { HeroSection } from "./_components/hero-section"
import { StatsSection } from "./_components/stats-section"
import { LatestProducts } from "./_components/latest-products"
import { TrendingProducts } from "./_components/trending-products"
import { HeaderAfterLogin } from "./header-after-login"
import { MainFooter } from "./main-footer"
import { LanguageProvider } from '@/app/context/LanguageContext'

export default async function HomePage() {
  // Fetch all required data
  const [products, trendingProducts, totalProducts, totalStores] = await Promise.all([
    getLatestProducts(),
    getTrendingProducts(),
    getProductCount(),
    getStoreCount()
  ]);

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gray-950">
        <HeaderAfterLogin />
        <HeroSection />
        <StatsSection 
          totalProducts={totalProducts}
          totalStores={totalStores}
          trendingCount={trendingProducts.length}
        />
        <LatestProducts products={products} />
        <TrendingProducts products={trendingProducts} />
      </div>
    </LanguageProvider>
  )
}