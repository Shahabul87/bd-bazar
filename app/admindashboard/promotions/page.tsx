"use client"

import { useState } from "react"
import { Plus, Search, Filter, Download } from "lucide-react"
import { PromotionsTable } from "./_components/promotions-table"
import { CampaignAnalytics } from "./_components/campaign-analytics"
import { DiscountBuilder } from "./_components/discount-builder"
import { EmailMarketing } from "./_components/email-marketing"
import { NewPromotionModal } from "./_components/new-promotion-modal"
import { PromotionFilterModal } from "./_components/promotion-filter-modal"

interface DateRange {
  from: string
  to: string
}

export default function PromotionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>(null)
  const [selectedDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })
  const [isNewPromotionModalOpen, setIsNewPromotionModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const handleNewPromotion = (data: any) => {
    console.log("New promotion data:", data)
    setIsNewPromotionModalOpen(false)
    // Implement creation logic
  }

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters)
    setIsFilterModalOpen(false)
    // Implement filter logic
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Marketing & Promotions</h1>
          <p className="text-gray-400">Manage your marketing campaigns and promotions</p>
        </div>
        <button
          onClick={() => setIsNewPromotionModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Promotion
        </button>
      </div>

      {/* Campaign Analytics */}
      <CampaignAnalytics campaignId="latest" />

      {/* Promotions Management */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            <Filter className="h-4 w-4" />
            {activeFilters ? "Filters Applied" : "Add Filter"}
          </button>
          <button
            onClick={() => {/* Implement export */}}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-700">
          <PromotionsTable
            searchQuery={searchQuery}
            filters={activeFilters}
          />
        </div>
      </div>

      {/* Discount Builder */}
      <DiscountBuilder />

      {/* Email Marketing */}
      <EmailMarketing />

      <NewPromotionModal
        isOpen={isNewPromotionModalOpen}
        onClose={() => setIsNewPromotionModalOpen(false)}
        onSubmit={handleNewPromotion}
      />

      <PromotionFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  )
} 