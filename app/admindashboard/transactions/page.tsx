"use client"

import { useState } from "react"
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react"
import { format } from "date-fns"
import { SummaryCard } from "./_components/summary-card"
import { ActivityChart } from "./_components/activity-chart"
import { CustomerTable } from "./_components/customer-table"
import { TopProducts } from "./_components/top-products"
import { ExpensesList } from "./_components/expenses-list"
import { PromoCard } from "./_components/promo-card"
import { AddTransactionModal } from "./_components/add-transaction-modal"
import { useTransactions } from "./_hooks/use-transactions"

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addTransaction, getTransactionStats } = useTransactions()
  const currentDate = format(new Date(), "h:mm a dd MMM yyyy")

  const handleAddTransaction = async (data: any) => {
    try {
      await addTransaction({
        ...data,
        amount: parseFloat(data.amount),
        date: new Date(data.date).toISOString()
      })
    } catch (error) {
      console.error("Failed to add transaction:", error)
    }
  }

  const stats = getTransactionStats()

  return (
    <>
      <div className="flex gap-6">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Transactions</h1>
              <p className="text-gray-500">{currentDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard
              title="Income"
              amount={`$${stats.income.toLocaleString()}`}
              icon={ArrowUpCircle}
              type="income"
              trend={8.5}
            />
            <SummaryCard
              title="Outcome"
              amount={`$${stats.expenses.toLocaleString()}`}
              icon={ArrowDownCircle}
              type="outcome"
              trend={-3.2}
            />
            <SummaryCard
              title="Total Balance"
              amount={`$${stats.balance.toLocaleString()}`}
              icon={Wallet}
              type="balance"
              showAddButton
              onAddClick={() => setIsModalOpen(true)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityChart
              title="Total Projected"
              subtitle="Toronto, Vancouver, Ottawa"
              total="$124,500"
              trend="+5.6% vs last year"
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                values: [30000, 45000, 38000, 55000, 48000, 52000, 47000]
              }}
            />
            <ActivityChart
              title="Data Activity"
              subtitle="Canada"
              total="$54,000"
              trend="+3.3% vs last year"
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                values: [12000, 15000, 18000, 14000, 16000, 19000, 17000]
              }}
            />
          </div>

          <CustomerTable />
        </div>

        <div className="w-80 p-6 space-y-6">
          <TopProducts />
          <ExpensesList />
          <PromoCard />
        </div>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </>
  )
} 