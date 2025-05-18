"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { PageBackground } from "./_components/page-background";

export default function StoreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <PageBackground>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-20">
        <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full mb-6">
          <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          Something went wrong
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
          {error.message || "There was an error loading the store dashboard. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={reset} variant="default" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/dashboard/stores">
              <ArrowLeft className="h-4 w-4" />
              Back to stores
            </Link>
          </Button>
        </div>
      </div>
    </PageBackground>
  );
} 