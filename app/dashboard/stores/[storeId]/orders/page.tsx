import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getStoreOrders } from "@/actions/get-store-orders";
import { OrdersHeader } from "./_components/orders-header";
import { OrdersGrid } from "./_components/orders-grid";
import { OrderStats } from "./_components/order-stats";

export const metadata = {
  title: "Store Orders | Dashboard",
  description: "Manage and track all your store orders",
};

export default async function OrdersPage({
  params
}: {
  params: { storeId: string }
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  // Properly await params before destructuring
  const { storeId } = await params;

  // Verify this store belongs to the user
  const store = await db.store.findUnique({
    where: {
      id: storeId,
      userId: session.user.id
    }
  });

  if (!store) {
    redirect("/dashboard/stores");
  }

  // Get all orders for this store
  const orders = await getStoreOrders(storeId);

  return (
    <div className="space-y-6">
      <OrdersHeader 
        storeName={store.name}
        orderCount={orders.length} 
      />
      
      <OrderStats orders={orders} />
      
      <OrdersGrid 
        orders={orders}
        storeId={storeId}
      />
    </div>
  );
} 