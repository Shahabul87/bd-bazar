"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import { formatPrice } from "@/lib/format"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

import { ContactInformation } from "./_components/contact-information"
import { ShippingAddress } from "./_components/shipping-address"
import { PaymentInformation } from "./_components/payment-information"
import { OrderSummary } from "./_components/order-summary"

export default function CheckoutPage() {
  const cart = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Get checkout items from localStorage
  const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]')
  const checkoutTotal = parseFloat(localStorage.getItem('checkoutTotal') || '0')

  if (checkoutItems.length === 0) {
    router.push('/cart')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      setFormData(prev => ({ ...prev, [name]: formatted }))
      return
    }

    // Format card expiry
    if (name === 'cardExpiry') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5)
      setFormData(prev => ({ ...prev, [name]: formatted }))
      return
    }

    // Format CVC
    if (name === 'cardCvc') {
      const formatted = value.slice(0, 3)
      setFormData(prev => ({ ...prev, [name]: formatted }))
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (Object.values(formData).some(value => !value)) {
        throw new Error("Please fill in all fields")
      }

      // Here you would typically:
      // 1. Process payment
      // 2. Create order in database
      // 3. Clear cart
      // 4. Redirect to success page

      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      cart.clearCart()
      localStorage.removeItem('checkoutItems')
      localStorage.removeItem('checkoutTotal')
      
      router.push('/checkout/success')
      toast.success("Order placed successfully!")

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link 
          href="/cart"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-white">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <ContactInformation 
                formData={formData} 
                handleInputChange={handleInputChange} 
              />
              <ShippingAddress 
                formData={formData} 
                handleInputChange={handleInputChange} 
              />
              <PaymentInformation 
                formData={formData} 
                handleInputChange={handleInputChange} 
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  `Pay ${formatPrice(checkoutTotal)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <OrderSummary 
            items={checkoutItems} 
            total={checkoutTotal} 
          />
        </div>
      </div>
    </div>
  )
} 