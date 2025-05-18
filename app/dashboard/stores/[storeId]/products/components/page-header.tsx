import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  storeId: string;
}

export const PageHeader = ({ storeId }: PageHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-indigo-100">
            Manage your store's products, inventory and performance
          </p>
        </div>
        
        <Link href={`/dashboard/stores/${storeId}/products/new`}>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all duration-200 font-medium">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
    </div>
  );
}; 