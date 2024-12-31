"use client";

import { useState } from "react"
import { PromotionsDataTable } from "./promotions-data-table"

interface PromotionsTableProps {
  searchQuery: string
  filters: any
}

export const PromotionsTable = ({
  searchQuery,
  filters
}: PromotionsTableProps) => {
  const [selectedPromotions, setSelectedPromotions] = useState<string[]>([])

  const handleEdit = (promotion: any) => {
    console.log("Editing promotion:", promotion)
    // Implement edit logic
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700">
      <PromotionsDataTable
        searchQuery={searchQuery}
        filters={filters}
        selectedPromotions={selectedPromotions}
        onSelectPromotions={setSelectedPromotions}
        onEdit={handleEdit}
      />
    </div>
  )
}
