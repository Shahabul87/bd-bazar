import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NewCategoryForm } from "../_components/new-category-form";

export const metadata = {
  title: "Add New Category | Store Dashboard",
  description: "Add a new product category to your store",
};

export default async function NewCategoryPage({
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

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Add New Category
      </h1>
      
      <NewCategoryForm storeId={storeId} />
    </div>
  );
} 