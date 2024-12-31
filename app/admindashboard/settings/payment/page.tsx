"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Building
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface PaymentMethod {
  id: string
  name: string
  enabled: boolean
  icon: any
  description: string
  fees: string
}

export default function PaymentSettingsPage() {
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "credit_card",
      name: "Credit Card",
      enabled: true,
      icon: CreditCard,
      description: "Accept Visa, Mastercard, and other major credit cards",
      fees: "2.9% + $0.30 per transaction"
    },
    {
      id: "paypal",
      name: "PayPal",
      enabled: false,
      icon: Wallet,
      description: "Allow customers to pay with their PayPal account",
      fees: "3.4% + $0.30 per transaction"
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      enabled: false,
      icon: Building,
      description: "Accept direct bank transfers",
      fees: "$1.00 per transaction"
    }
  ])

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    )
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-700 rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Payment Settings</h1>
          <p className="text-gray-400">Configure payment methods and processing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Payment Methods</h2>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-start justify-between p-4 border border-gray-700 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <method.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">{method.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{method.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Fees: {method.fees}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={method.enabled}
                      onChange={() => togglePaymentMethod(method.id)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax Settings */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Tax Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Tax Rate (%)</label>
              <input
                type="number"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter tax rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax Calculation</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white">
                <option>Calculate tax based on shipping address</option>
                <option>Calculate tax based on billing address</option>
                <option>Fixed tax rate for all orders</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="prices_include_tax"
                className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="prices_include_tax" className="text-sm">
                Prices entered with tax included
              </label>
            </div>
          </div>
        </div>

        {/* Currency Settings */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Currency Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Currency</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency Format</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white">
                <option>$100.00</option>
                <option>100.00 USD</option>
                <option>US$100.00</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoice Settings */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Invoice Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Invoice Prefix</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="INV-"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Invoice Footer Text</label>
              <textarea
                rows={3}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter footer text for invoices"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  )
} 