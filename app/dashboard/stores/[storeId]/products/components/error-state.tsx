import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <AlertCircle className="h-12 w-12 text-rose-500 mb-4" />
      <p className="text-lg font-medium text-rose-500">{error}</p>
      <Button 
        onClick={onRetry} 
        className="mt-4"
      >
        Try Again
      </Button>
    </div>
  );
}; 