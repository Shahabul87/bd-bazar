import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800/40 dark:bg-gray-900/40">
      <div className="flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
        <p className="text-gray-400 text-lg font-medium">Loading dashboard...</p>
      </div>
    </div>
  )
} 