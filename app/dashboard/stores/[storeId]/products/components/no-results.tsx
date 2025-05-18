import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoResultsProps {
  onClearFilters: () => void;
}

export const NoResults = ({ onClearFilters }: NoResultsProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="h-24 w-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Search className="h-12 w-12 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No matching products</h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <Button onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}; 