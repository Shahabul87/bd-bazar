import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getStoreCategories } from "@/actions/get-store-categories";
import { CategoryHeader } from "./_components/category-header";
import { CategoryGrid } from "./_components/category-grid";
import { AddCategoryButton } from "./_components/add-category-button";

export const metadata = {
  title: "Product Categories | Store Dashboard",
  description: "Manage your store product categories",
};

export default async function CategoriesPage({
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

  // Get all categories for this store
  const categories = await getStoreCategories(storeId);

  return (
    <div className="space-y-8 relative"> 
      <CategoryHeader
        storeName={store.name}
        categoryCount={categories.length}
      />
      
      <AddCategoryButton storeId={storeId} />
      
      <CategoryGrid 
        categories={categories}
        storeId={storeId}
      />
    </div>
  );
} 