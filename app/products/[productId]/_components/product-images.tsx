import { Package } from "lucide-react"

interface ProductImagesProps {
  images: any[]
  name: string
}

export const ProductImages = ({ images, name }: ProductImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square relative bg-gray-800 rounded-lg overflow-hidden">
        {images?.[0]?.url ? (
          <img 
            src={images[0].url}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-12 w-12 text-gray-600" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images?.slice(1).map((image) => (
          <div key={image.id} className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={image.url}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 