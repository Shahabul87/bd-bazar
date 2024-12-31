"use client"

import { useState } from "react"
import { X, Plus, MapPin, Truck, Calendar, Clock, Package } from "lucide-react"

interface NewArrangementModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export const NewArrangementModal = ({
  isOpen,
  onClose,
  onSubmit
}: NewArrangementModalProps) => {
  const [formData, setFormData] = useState({
    routeName: "",
    date: "",
    startTime: "",
    endTime: "",
    courier: "",
    vehicle: "",
    startLocation: "",
    endLocation: "",
    stops: [{
      address: "",
      order: 1
    }]
  })

  if (!isOpen) return null

  const handleAddStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, { address: "", order: prev.stops.length + 1 }]
    }))
  }

  const handleRemoveStop = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">New Delivery Arrangement</h2>
            <p className="text-sm text-gray-400">Create a new delivery route and schedule</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Route Name</label>
                  <input
                    type="text"
                    value={formData.routeName}
                    onChange={(e) => setFormData(prev => ({ ...prev, routeName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter route name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Schedule</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Courier Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Courier Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Courier</label>
                  <select
                    value={formData.courier}
                    onChange={(e) => setFormData(prev => ({ ...prev, courier: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Courier</option>
                    <option value="courier1">John Smith</option>
                    <option value="courier2">Jane Doe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Vehicle</label>
                  <select
                    value={formData.vehicle}
                    onChange={(e) => setFormData(prev => ({ ...prev, vehicle: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Vehicle</option>
                    <option value="van">Delivery Van</option>
                    <option value="truck">Truck</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Route Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Start Location</label>
                  <input
                    type="text"
                    value={formData.startLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, startLocation: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter start location"
                    required
                  />
                </div>
                
                {/* Stops */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-400">Delivery Stops</label>
                    <button
                      type="button"
                      onClick={handleAddStop}
                      className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                    >
                      <Plus className="h-4 w-4" />
                      Add Stop
                    </button>
                  </div>
                  
                  {formData.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">#{stop.order}</span>
                      <input
                        type="text"
                        value={stop.address}
                        onChange={(e) => {
                          const newStops = [...formData.stops]
                          newStops[index].address = e.target.value
                          setFormData(prev => ({ ...prev, stops: newStops }))
                        }}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter stop address"
                        required
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStop(index)}
                          className="p-2 hover:bg-gray-700 rounded-lg text-red-400"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">End Location</label>
                  <input
                    type="text"
                    value={formData.endLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, endLocation: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter end location"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Arrangement
          </button>
        </div>
      </div>
    </div>
  )
} 