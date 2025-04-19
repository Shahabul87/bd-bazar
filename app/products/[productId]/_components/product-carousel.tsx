"use client"

import { useState, useRef } from "react"
import { Package, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { Slider } from "@/components/ui/slider"

interface ProductCarouselProps {
  images: {
    id: string;
    url: string;
  }[];
  name: string;
}

export const ProductCarousel = ({ images, name }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    resetZoom()
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    resetZoom()
  }

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPosition({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomChange = (value: number[]) => {
    setScale(value[0])
    if (value[0] === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
          {images.length > 0 ? (
            <img
              src={images[currentIndex].url}
              alt={`${name} - Image ${currentIndex + 1}`}
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/75"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/75"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Navigation */}
        <div className="grid grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id || `image-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden bg-gray-800",
                currentIndex === index && "ring-2 ring-blue-500"
              )}
            >
              <img
                src={image.url}
                alt={`${name} - Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modal View */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-gray-900">
          <VisuallyHidden>
            <DialogTitle>
              {name} - Image {currentIndex + 1}
            </DialogTitle>
          </VisuallyHidden>
          
          <div className="relative">
            {/* Controls */}
            <div className="absolute right-4 top-4 z-50 flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full bg-black/50 hover:bg-black/75"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Modal Image with Pan */}
            <div 
              className="relative h-[80vh] bg-gray-900 overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              ref={imageContainerRef}
            >
              {images.length > 0 && (
                <div 
                  className={cn(
                    "relative flex items-center justify-center h-full transition-none",
                    scale > 1 ? "cursor-grab" : "cursor-default",
                    isDragging && "cursor-grabbing"
                  )}
                >
                  <img
                    src={images[currentIndex].url}
                    alt={`${name} - Image ${currentIndex + 1}`}
                    className="max-h-full object-contain transition-transform duration-200"
                    style={{ 
                      transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                      transformOrigin: 'center'
                    }}
                    draggable="false"
                  />
                </div>
              )}

              {/* Navigation Arrows - Only show when not zoomed */}
              {scale === 1 && images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75"
                  >
                    <ChevronLeft className="h-8 w-8 text-white" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75"
                  >
                    <ChevronRight className="h-8 w-8 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black/50 rounded-full p-4 flex items-center gap-4">
              <ZoomOut className="h-4 w-4 text-white" />
              <Slider
                defaultValue={[1]}
                value={[scale]}
                min={1}
                max={4}
                step={0.1}
                onValueChange={handleZoomChange}
                className="w-[200px]"
              />
              <ZoomIn className="h-4 w-4 text-white" />
            </div>

            {/* Modal Thumbnails */}
            <div className="bg-gray-900 p-4">
              <div className="grid grid-cols-8 gap-2">
                {images.map((image, index) => (
                  <button
                    key={image.id || `modal-thumb-${index}`}
                    onClick={() => {
                      setCurrentIndex(index)
                      resetZoom()
                    }}
                    className={cn(
                      "relative aspect-square rounded-lg overflow-hidden bg-gray-800",
                      currentIndex === index && "ring-2 ring-blue-500"
                    )}
                  >
                    <img
                      src={image.url}
                      alt={`${name} - Thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 