import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">Loading products...</p>
    </div>
  );
}; 