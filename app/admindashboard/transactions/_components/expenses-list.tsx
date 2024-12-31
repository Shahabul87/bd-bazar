"use client"

import { ArrowRight } from "lucide-react"

interface Expense {
  vendor: string
  date: string
  amount: string
  status: "completed" | "pending" | "failed"
}

const expenses: Expense[] = [
  {
    vendor: "Avanada Inc.",
    date: "23 Jul 2023",
    amount: "-$1,386.00",
    status: "completed"
  },
  {
    vendor: "Tech Solutions Ltd.",
    date: "22 Jul 2023",
    amount: "-$392.00",
    status: "pending"
  }
]

export const ExpensesList = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Recent Expenses</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{expense.vendor}</h4>
              <p className="text-sm text-gray-500">{expense.date}</p>
            </div>
            <div>
              <span className={`font-medium ${
                expense.status === "completed" ? "text-red-600" :
                expense.status === "pending" ? "text-yellow-600" :
                "text-red-600"
              }`}>
                {expense.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 