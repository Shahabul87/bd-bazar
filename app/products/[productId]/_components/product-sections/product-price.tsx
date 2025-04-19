import { formatPrice } from "@/lib/format"

interface ProductPriceProps {
  price: number;
  inStock: boolean;
  stockCount: number;
}

export const ProductPrice = ({ price, inStock, stockCount }: ProductPriceProps) => {
  return (
    <div>
      <span className="text-3xl font-bold text-white">{formatPrice(price)}</span>
      {inStock ? (
        <span className="ml-4 text-sm text-green-500">
          In Stock ({stockCount} available)
        </span>
      ) : (
        <span className="ml-4 text-sm text-red-500">Out of Stock</span>
      )}
    </div>
  );
}; 