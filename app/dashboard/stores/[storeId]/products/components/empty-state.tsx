import Link from "next/link";
import { Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  storeId: string;
}

export const EmptyState = ({ storeId }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="h-24 w-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Package2 className="h-12 w-12 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No products yet</h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        You haven't added any products to this store yet. Create your first product to get started.
      </p>
      <Link href={`/dashboard/stores/${storeId}/products/new`}>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
          Add Product
        </Button>
      </Link>
    </div>
  );
}; 