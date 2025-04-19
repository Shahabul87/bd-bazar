"use client"

import { useState, useMemo } from "react"
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"
import { Search } from "lucide-react"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!

interface StoreLocationMapProps {
  storeId: string
  defaultValues: {
    latitude?: number
    longitude?: number
  }
}

export const StoreLocationMap = ({ 
  storeId,
  defaultValues 
}: StoreLocationMapProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchAddress, setSearchAddress] = useState("")
  const [selectedLocation, setSelectedLocation] = useState({
    lat: defaultValues.latitude || 23.8103, // Default to Bangladesh center
    lng: defaultValues.longitude || 90.4125
  })

  const mapCenter = useMemo(() => ({
    lat: selectedLocation.lat,
    lng: selectedLocation.lng
  }), [selectedLocation])

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      })
    }
  }

  const handleSearch = async () => {
    try {
      const geocoder = new google.maps.Geocoder()
      const result = await geocoder.geocode({ address: searchAddress })
      
      if (result.results[0]?.geometry?.location) {
        const location = result.results[0].geometry.location
        setSelectedLocation({
          lat: location.lat(),
          lng: location.lng()
        })
      }
    } catch (error) {
      toast.error("Location search failed")
      console.error(error)
    }
  }

  const handleSaveLocation = async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/stores/${storeId}/location`, {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng
      })
      
      toast.success("Store location updated successfully")
    } catch (error) {
      toast.error("Failed to update store location")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Store Location</h2>
        <p className="text-sm text-gray-400">Select your store's exact location on the map</p>
      </div>

      {/* Search Box */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            placeholder="Search location..."
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button 
          onClick={handleSearch}
          variant="outline"
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Search
        </Button>
      </div>

      {/* Map Container */}
      <div className="h-[400px] w-full rounded-lg overflow-hidden">
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={mapCenter}
            zoom={13}
            onClick={handleMapClick}
            options={{
              styles: [
                {
                  elementType: "geometry",
                  stylers: [{ color: "#242f3e" }]
                },
                {
                  elementType: "labels.text.stroke",
                  stylers: [{ color: "#242f3e" }]
                },
                {
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#746855" }]
                }
              ]
            }}
          >
            <Marker
              position={selectedLocation}
              draggable={true}
              onDragEnd={(e) => {
                if (e.latLng) {
                  setSelectedLocation({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                  })
                }
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveLocation}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Saving..." : "Save Location"}
        </Button>
      </div>
    </div>
  )
} 