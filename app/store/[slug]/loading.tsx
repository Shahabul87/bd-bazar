import { Loader2 } from "lucide-react"

export default function StoreLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Loading Store</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Just a moment while we load the store details...</p>
      </div>
    </div>
  )
} 