"use client"

import { useEffect, useState } from "react"
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api'

interface DeliveryMapViewProps {
  stops: {
    lat: number
    lng: number
    label: string
  }[]
  startPoint: {
    lat: number
    lng: number
  }
  endPoint: {
    lat: number
    lng: number
  }
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
}

const darkMapStyle = [
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
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  }
]

export const DeliveryMapView = ({ stops, startPoint, endPoint }: DeliveryMapViewProps) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)

  useEffect(() => {
    if (window.google && stops.length > 0) {
      const directionsService = new google.maps.DirectionsService()

      const waypoints = stops.map(stop => ({
        location: new google.maps.LatLng(stop.lat, stop.lng),
        stopover: true
      }))

      const request: google.maps.DirectionsRequest = {
        origin: new google.maps.LatLng(startPoint.lat, startPoint.lng),
        destination: new google.maps.LatLng(endPoint.lat, endPoint.lng),
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result)
        }
      })
    }
  }, [stops, startPoint, endPoint])

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
        options={{
          styles: darkMapStyle,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true
        }}
      >
        {directions ? (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: false,
              polylineOptions: {
                strokeColor: "#3b82f6",
                strokeWeight: 4
              }
            }}
          />
        ) : (
          <>
            <Marker
              position={startPoint}
              label="S"
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
              }}
            />
            {stops.map((stop, index) => (
              <Marker
                key={index}
                position={{ lat: stop.lat, lng: stop.lng }}
                label={(index + 1).toString()}
              />
            ))}
            <Marker
              position={endPoint}
              label="E"
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }}
            />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  )
} 