"use client"

import { useState } from "react"
import { Plus, X, Tag, Calendar, Package, DollarSign } from "lucide-react"

interface DiscountRule {
  type: "percentage" | "fixed" | "shipping"
  value: number
  minCartValue?: number
  productIds?: string[]
  categoryIds?: string[]
  startDate: string
  endDate: string
  maxUses?: number
  customerLimit?: number
}

export const DiscountBuilder = () => {
  const [rules, setRules] = useState<DiscountRule[]>([])
  const [currentRule, setCurrentRule] = useState<DiscountRule>({
    type: "percentage",
    value: 0,
    startDate: "",
    endDate: ""
  })

  const addRule = () => {
    setRules([...rules, currentRule])
    setCurrentRule({
      type: "percentage",
      value: 0,
      startDate: "",
      endDate: ""
    })
  }

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <h2 className="text-lg font-medium mb-6">Discount Builder</h2>

      {/* Rule Builder Form */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Discount Type
            </label>
            <select
              value={currentRule.type}
              onChange={(e) => setCurrentRule({ ...currentRule, type: e.target.value as DiscountRule["type"] })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="percentage">Percentage Off</option>
              <option value="fixed">Fixed Amount</option>
              <option value="shipping">Free Shipping</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              {currentRule.type === "percentage" ? "Percentage" : "Amount"}
            </label>
            <input
              type="number"
              value={currentRule.value}
              onChange={(e) => setCurrentRule({ ...currentRule, value: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={currentRule.startDate}
              onChange={(e) => setCurrentRule({ ...currentRule, startDate: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={currentRule.endDate}
              onChange={(e) => setCurrentRule({ ...currentRule, endDate: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Minimum Cart Value
            </label>
            <input
              type="number"
              value={currentRule.minCartValue || ""}
              onChange={(e) => setCurrentRule({ ...currentRule, minCartValue: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Maximum Uses
            </label>
            <input
              type="number"
              value={currentRule.maxUses || ""}
              onChange={(e) => setCurrentRule({ ...currentRule, maxUses: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={addRule}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Rule
        </button>
      </div>

      {/* Active Rules */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400">Active Rules</h3>
        {rules.map((rule, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-700 rounded-lg">
                {rule.type === "percentage" ? (
                  <Tag className="h-5 w-5 text-blue-400" />
                ) : rule.type === "fixed" ? (
                  <DollarSign className="h-5 w-5 text-green-400" />
                ) : (
                  <Package className="h-5 w-5 text-purple-400" />
                )}
              </div>
              <div>
                <p className="font-medium">
                  {rule.type === "percentage"
                    ? `${rule.value}% Off`
                    : rule.type === "fixed"
                    ? `$${rule.value} Off`
                    : "Free Shipping"}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(rule.startDate).toLocaleDateString()} -{" "}
                    {new Date(rule.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeRule(index)}
              className="p-2 hover:bg-gray-700 rounded-lg text-red-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 