"use client"

import { useState } from "react"

export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addTransaction = async (data: Omit<Transaction, "id" | "status">) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newTransaction: Transaction = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        status: "completed"
      }
      
      setTransactions(prev => [newTransaction, ...prev])
      return newTransaction
    } catch (error) {
      console.error("Failed to add transaction:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getTransactionStats = () => {
    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
    
    return {
      income,
      expenses,
      balance: income - expenses
    }
  }

  return {
    transactions,
    isLoading,
    addTransaction,
    getTransactionStats
  }
} 