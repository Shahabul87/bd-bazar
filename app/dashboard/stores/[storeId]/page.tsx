import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getStoreById, getStoreOrders, getStoreMetrics } from "@/lib/actions/store-actions";

// Remove components with React icons that need to be client components
import { PageBackground } from "./_components/page-background";
import { StoreHeader } from "./_components/store-header";
import DashboardContent from "./_components/dashboard-content";
import { getTranslations } from "./_components/translations";

export const metadata = {
  title: "Store Dashboard | Manage Your Store",
  description: "View and manage your store performance, products, and orders",
};

export default async function StoreDetailsPage({
  params
}: {
  params: { storeId: string }
}) {
  const session = await auth();
  const cookieStore = await cookies();
  const preferredLanguage = (await cookieStore.get('NEXT_LOCALE'))?.value || 'en';
  
  // Get storeId from params
  const { storeId } = await params;

  if (!session?.user) {
    redirect("/login");
  }

  try {
    // Fetch store data, orders, and metrics using server actions
    const [store, orders, metrics] = await Promise.all([
      getStoreById(storeId),
      getStoreOrders(storeId, 5),
      getStoreMetrics(storeId)
    ]);
    
    // Serialize Decimal objects to strings/numbers to avoid client component issues
    const serializedStore = {
      ...store,
      totalRevenue: store.totalRevenue ? Number(store.totalRevenue) : 0,
      products: store.products.map((product: any) => ({
        ...product,
        price: Number(product.price)
      }))
    };
    
    // Serialize order data to handle Decimal values
    const serializedOrders = orders.map((order: any) => ({
      ...order,
      total: Number(order.total),
      items: order.items.map((item: any) => ({
        ...item,
        price: Number(item.price),
        product: {
          ...item.product,
          price: Number(item.product.price)
        }
      }))
    }));

    // Get the translations based on preferred language
    const t = getTranslations(preferredLanguage as 'en' | 'bn');

    return (
      <PageBackground>
        {/* Header with store details */}
        <StoreHeader 
          store={serializedStore}
          storeId={storeId} 
          preferredLanguage={preferredLanguage} 
          t={{ 
            title: t.title, 
            subtitle: t.subtitle, 
            storeId: t.storeId 
          }} 
        />

        {/* Pass real data to dashboard content */}
        <DashboardContent 
          store={serializedStore} 
          orders={serializedOrders} 
          metrics={metrics}
        />
      </PageBackground>
    );
  } catch (error) {
    console.error("Error fetching store data:", error);
    redirect("/dashboard/stores");
  }
} 