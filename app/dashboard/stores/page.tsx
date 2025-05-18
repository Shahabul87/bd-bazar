import { auth } from "@/auth";
import { StoreManagementClient } from "./_components/store-management-client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { db } from "@/lib/db";

export const metadata = {
  title: "Store Management | Dashboard",
  description: "Manage your online stores",
};

export default async function StoresPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  console.log("Current user from session:", JSON.stringify(session.user, null, 2));

  let userStores = [];
  
  try {
    // Fetch stores created by the current user
    const dbStores = await db.store.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Convert Decimal to number for serialization to client components
    userStores = dbStores.map(store => ({
      ...store,
      totalRevenue: store.totalRevenue ? parseFloat(store.totalRevenue.toString()) : 0,
    }));
    
    console.log(`Found ${userStores.length} stores for user ${session.user.id}`);
  } catch (error) {
    console.error("Error fetching stores:", error);
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        }
      >
        <StoreManagementClient 
          user={session.user as any} 
          initialStores={userStores}
        />
      </Suspense>
    </div>
  );
} 