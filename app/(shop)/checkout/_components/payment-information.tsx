"use client"

import { CreditCard, Lock } from "lucide-react"

interface PaymentInformationProps {
  formData: {
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PaymentInformation = ({ formData, handleInputChange }: PaymentInformationProps) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg space-y-4">
      <h2 className="text-lg font-medium text-white">Payment Information</h2>
      <div className="space-y-4">
        <div className="relative">
          <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="Card number"
            maxLength={19}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleInputChange}
              placeholder="CVC"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 