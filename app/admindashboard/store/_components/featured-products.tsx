"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Star, GripVertical, X } from "lucide-react"

interface FeaturedProduct {
  id: string
  name: string
  image: string
  price: number
  category: string
  featured: boolean
}

// Mock data - replace with actual API call
const initialProducts: FeaturedProduct[] = [
  {
    id: "FEAT-001",
    name: "Wireless Headphones",
    image: "https://picsum.photos/seed/1/80/80",
    price: 299.99,
    category: "Electronics",
    featured: true
  },
  {
    id: "FEAT-002",
    name: "Smart Watch",
    image: "https://picsum.photos/seed/2/80/80",
    price: 199.99,
    category: "Electronics",
    featured: true
  },
  {
    id: "FEAT-003",
    name: "Running Shoes",
    image: "https://picsum.photos/seed/3/80/80",
    price: 129.99,
    category: "Sports",
    featured: true
  }
]

interface DraggableProductProps {
  product: FeaturedProduct
  index: number
  moveProduct: (dragIndex: number, hoverIndex: number) => void
  onRemove: (id: string) => void
}

const DraggableProduct = ({ product, index, moveProduct, onRemove }: DraggableProductProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'PRODUCT',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveProduct(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'PRODUCT',
    item: () => ({ id: product.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center gap-4 transition-all duration-200`}
      style={{ opacity }}
    >
      <div className="text-gray-400 hover:text-gray-300 cursor-grab">
        <GripVertical className="h-5 w-5" />
      </div>
      
      <Image
        src={product.image}
        alt={product.name}
        width={48}
        height={48}
        className="rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-white">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.category}</p>
      </div>
      
      <div className="text-right">
        <p className="font-medium text-white">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          <Star className="h-4 w-4 fill-current" />
          <span>Featured</span>
        </div>
      </div>

      <button
        onClick={() => onRemove(product.id)}
        className="p-1 hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-300"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

export const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState(initialProducts)

  const moveProduct = (dragIndex: number, hoverIndex: number) => {
    const dragProduct = featuredProducts[dragIndex]
    setFeaturedProducts(prevProducts => {
      const newProducts = [...prevProducts]
      newProducts.splice(dragIndex, 1)
      newProducts.splice(hoverIndex, 0, dragProduct)
      return newProducts
    })
  }

  const removeFeatured = (productId: string) => {
    setFeaturedProducts(prev => prev.filter(p => p.id !== productId))
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Featured Products</h2>
          <p className="text-sm text-gray-400">Drag to reorder featured products</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          Add Featured Product
        </button>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="space-y-3">
          {featuredProducts.map((product, index) => (
            <DraggableProduct
              key={`featured-${product.id}`}
              product={product}
              index={index}
              moveProduct={moveProduct}
              onRemove={removeFeatured}
            />
          ))}
        </div>
      </DndProvider>

      {featuredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No featured products yet</p>
          <p className="text-sm mt-1">Add products to feature them in your store</p>
        </div>
      )}
    </div>
  )
} 