"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Store, Truck, Clock, ShieldCheck, MapPin } from "lucide-react"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

interface ShippingInfoProps {
  price: number;
  inStock?: boolean;
  stockCount?: number;
  store?: {
    id: string;
    name: string;
    fullAddress?: string;
  } | null;
  product: any;
}

type DeliveryOption = 'delivery' | 'pickup';

export const ShippingInfo = ({
  price,
  inStock = true,
  stockCount = 0,
  store,
  product
}: ShippingInfoProps) => {
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('delivery');
  const [isLoading, setIsLoading] = useState(false);
  const cart = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || null,
      quantity: 1,
      deliveryOption
    };
    
    cart.addItem(cartItem);
    toast.success("Added to cart");
  };

  const handleBuyNow = async () => {
    try {
      setIsLoading(true);
      
      // First add to cart
      handleAddToCart();
      
      // Then redirect to checkout
      router.push('/checkout');
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
      <div className="space-y-6">
        {/* Price and Stock */}
        <div>
          <div className="text-2xl font-bold text-white">
            {formatPrice(price)}
          </div>
          <div className={`text-sm mt-1 ${inStock ? 'text-green-500' : 'text-red-500'}`}>
            {inStock ? `${stockCount} in stock` : 'Out of stock'}
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Delivery Options */}
        <div className="space-y-4">
          <h3 className="font-medium text-white">Choose Delivery Option</h3>
          <RadioGroup
            defaultValue="delivery"
            value={deliveryOption}
            onValueChange={(value) => setDeliveryOption(value as DeliveryOption)}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem
                value="delivery"
                id="delivery"
                className="peer sr-only"
              />
              <Label
                htmlFor="delivery"
                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 p-4 hover:border-gray-700 peer-data-[state=checked]:border-blue-500 cursor-pointer"
              >
                <Truck className="mb-2 h-6 w-6 text-gray-400" />
                <span className="text-sm font-medium text-white">Delivery</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="pickup"
                id="pickup"
                className="peer sr-only"
              />
              <Label
                htmlFor="pickup"
                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 p-4 hover:border-gray-700 peer-data-[state=checked]:border-blue-500 cursor-pointer"
              >
                <Store className="mb-2 h-6 w-6 text-gray-400" />
                <span className="text-sm font-medium text-white">Pickup</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Delivery Information */}
        {deliveryOption === 'delivery' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
              <Truck className="h-5 w-5" />
              <div>
                <p className="font-medium text-white">Free Delivery</p>
                <p className="text-sm">For orders over {formatPrice(100)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <Clock className="h-5 w-5" />
              <div>
                <p className="font-medium text-white">Fast Shipping</p>
                <p className="text-sm">Get it in 2-4 business days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <ShieldCheck className="h-5 w-5" />
              <div>
                <p className="font-medium text-white">Secure Transaction</p>
                <p className="text-sm">Protected by SSL encryption</p>
              </div>
            </div>
          </div>
        )}

        {/* Pickup Information */}
        {deliveryOption === 'pickup' && store && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium text-white">Pickup Location</p>
                <Link 
                  href={`/stores/${store.id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {store.name}
                </Link>
                {store.fullAddress && (
                  <p className="text-sm text-gray-400 mt-1">
                    {store.fullAddress}
                  </p>
                )}
                <p className="text-sm text-green-500 mt-2">
                  Usually ready in 24 hours
                </p>
              </div>
            </div>
          </div>
        )}

        <Separator className="bg-gray-800" />

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full"
            disabled={!inStock || isLoading}
            onClick={handleBuyNow}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </Button>
          <Button 
            variant="outline"
            className="w-full"
            disabled={!inStock || isLoading}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}; 