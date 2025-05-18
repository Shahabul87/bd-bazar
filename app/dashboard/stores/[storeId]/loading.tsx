import { Skeleton } from "@/components/ui/skeleton";
import { PageBackground } from "./_components/page-background";

export default function StoreLoading() {
  return (
    <PageBackground>
      {/* Header Skeleton */}
      <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-r from-indigo-600/70 to-purple-600/70 shadow-sm">
        <div className="px-6 py-10 md:px-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="space-y-4 w-full max-w-md">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-lg bg-white/20" />
                <Skeleton className="h-5 w-32 rounded-md bg-white/20" />
              </div>
              <Skeleton className="h-10 w-60 rounded-md bg-white/20" />
              <Skeleton className="h-4 w-full rounded-md bg-white/20" />
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-4">
              <Skeleton className="h-9 w-40 rounded-lg bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content Skeleton */}
      <div className="space-y-6">
        {/* Status indicator */}
        <div className="flex justify-end">
          <Skeleton className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
                  <Skeleton className="h-8 w-28 rounded-md bg-slate-200 dark:bg-slate-700" />
                  <Skeleton className="h-3 w-20 rounded-md bg-slate-200 dark:bg-slate-700" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Product Gallery Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-40 mb-4 rounded-md bg-slate-200 dark:bg-slate-700" />
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Skeleton className="h-[270px] w-full bg-slate-200 dark:bg-slate-700" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-40 rounded-md bg-slate-200 dark:bg-slate-700" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
                <Skeleton className="h-4 w-16 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>
              <Skeleton className="h-3 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-5 w-40 rounded-md bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-8 w-32 rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="h-[250px] flex items-center justify-center">
              <Skeleton className="h-full w-full rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>

          {/* Recent Activity Skeleton */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <Skeleton className="h-5 w-36 mb-6 rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <Skeleton className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 mr-3" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-700 mb-2" />
                    <Skeleton className="h-3 w-20 rounded-md bg-slate-200 dark:bg-slate-700" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-md bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <Skeleton className="h-5 w-48 mb-4 rounded-md bg-slate-200 dark:bg-slate-700" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32 rounded-md bg-slate-200 dark:bg-slate-700" />
                  <Skeleton className="h-4 w-16 rounded-md bg-slate-200 dark:bg-slate-700" />
                </div>
                <Skeleton className="h-2 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
                <Skeleton className="h-3 w-40 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageBackground>
  );
} 