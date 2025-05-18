"use client";

import { Check, ChevronDown, PaintBucket, SunMoon, Moon } from "lucide-react";
import { useState } from "react";

interface ColorSchemeSettingsProps {
  primaryColor: string;
  accentColor: string;
  colorMode: string;
  onChangePrimaryColor: (color: string) => void;
  onChangeAccentColor: (color: string) => void;
  onChangeColorMode: (mode: string) => void;
}

export const ColorSchemeSettings = ({
  primaryColor,
  accentColor,
  colorMode,
  onChangePrimaryColor,
  onChangeAccentColor,
  onChangeColorMode
}: ColorSchemeSettingsProps) => {
  const [primaryColorOpen, setPrimaryColorOpen] = useState(false);
  const [accentColorOpen, setAccentColorOpen] = useState(false);
  
  const colorOptions = [
    { value: "indigo", label: "Indigo", hex: "#6366f1" },
    { value: "blue", label: "Blue", hex: "#3b82f6" },
    { value: "emerald", label: "Emerald", hex: "#10b981" },
    { value: "amber", label: "Amber", hex: "#f59e0b" },
    { value: "rose", label: "Rose", hex: "#f43f5e" },
    { value: "violet", label: "Violet", hex: "#8b5cf6" },
    { value: "cyan", label: "Cyan", hex: "#06b6d4" },
    { value: "orange", label: "Orange", hex: "#f97316" }
  ];

  const colorModeOptions = [
    { value: "system", label: "System", description: "Follow system preference" },
    { value: "light", label: "Light", icon: SunMoon, description: "Light theme for your store" },
    { value: "dark", label: "Dark", icon: Moon, description: "Dark theme for your store" }
  ];

  const getColorHex = (colorName: string) => {
    return colorOptions.find(option => option.value === colorName)?.hex || "#6366f1";
  };

  const getContrastColor = (hex: string) => {
    // Simple contrast calculation - real implementation would be more sophisticated
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  };

  const primaryColorHex = getColorHex(primaryColor);
  const accentColorHex = getColorHex(accentColor);
  const primaryContrastColor = getContrastColor(primaryColorHex);
  const accentContrastColor = getContrastColor(accentColorHex);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-white mb-6">
          Color Scheme
        </h3>
        
        {/* Primary Color */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Primary Color
              </label>
              <p className="text-xs text-slate-400">
                Main color used for primary buttons and accents
              </p>
            </div>
            <div className="relative w-64">
              <button
                onClick={() => setPrimaryColorOpen(!primaryColorOpen)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-between text-slate-200"
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: primaryColorHex }}
                  ></div>
                  <span className="text-sm">
                    {colorOptions.find(option => option.value === primaryColor)?.label || primaryColor}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              
              {primaryColorOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg">
                  <div className="p-2 grid grid-cols-4 gap-1">
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onChangePrimaryColor(option.value);
                          setPrimaryColorOpen(false);
                        }}
                        className="group flex flex-col items-center p-2 rounded hover:bg-slate-700"
                      >
                        <div 
                          className={`w-8 h-8 rounded-full mb-1 flex items-center justify-center ${primaryColor === option.value ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-800' : ''}`}
                          style={{ backgroundColor: option.hex }}
                        >
                          {primaryColor === option.value && (
                            <Check 
                              className="h-4 w-4" 
                              style={{ color: getContrastColor(option.hex) }} 
                            />
                          )}
                        </div>
                        <span className="text-xs text-slate-200">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Accent Color */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Accent Color
              </label>
              <p className="text-xs text-slate-400">
                Secondary color used for highlights and secondary elements
              </p>
            </div>
            <div className="relative w-64">
              <button
                onClick={() => setAccentColorOpen(!accentColorOpen)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-between text-slate-200"
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: accentColorHex }}
                  ></div>
                  <span className="text-sm">
                    {colorOptions.find(option => option.value === accentColor)?.label || accentColor}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              
              {accentColorOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg">
                  <div className="p-2 grid grid-cols-4 gap-1">
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onChangeAccentColor(option.value);
                          setAccentColorOpen(false);
                        }}
                        className="group flex flex-col items-center p-2 rounded hover:bg-slate-700"
                      >
                        <div 
                          className={`w-8 h-8 rounded-full mb-1 flex items-center justify-center ${accentColor === option.value ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-800' : ''}`}
                          style={{ backgroundColor: option.hex }}
                        >
                          {accentColor === option.value && (
                            <Check 
                              className="h-4 w-4" 
                              style={{ color: getContrastColor(option.hex) }} 
                            />
                          )}
                        </div>
                        <span className="text-xs text-slate-200">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Color Mode */}
        <div className="mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Color Mode
            </label>
            <p className="text-xs text-slate-400 mb-4">
              Choose the default appearance for your store
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {colorModeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onChangeColorMode(option.value)}
                className={`p-4 rounded-md border ${
                  colorMode === option.value 
                    ? 'border-indigo-500 bg-indigo-500/10' 
                    : 'border-slate-700 bg-slate-800'
                } flex flex-col items-center`}
              >
                {option.icon && <option.icon className="h-6 w-6 text-slate-300 mb-2" />}
                {!option.icon && <PaintBucket className="h-6 w-6 text-slate-300 mb-2" />}
                <span className="text-sm text-slate-200">{option.label}</span>
                <span className="text-xs text-slate-400 mt-1">{option.description}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Preview */}
        <div className="mt-6">
          <h4 className="text-white text-sm font-medium mb-3">Color Scheme Preview</h4>
          <div className="p-5 bg-slate-900 rounded-md border border-slate-700">
            <div className={`p-4 rounded-md ${colorMode === 'dark' ? 'bg-slate-800' : 'bg-white'} border ${colorMode === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex flex-col">
                <h3 
                  className={`text-lg font-medium mb-2 ${colorMode === 'dark' ? 'text-white' : 'text-slate-900'}`}
                >
                  Store Preview
                </h3>
                <p 
                  className={`text-sm mb-4 ${colorMode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  See how your color scheme affects various UI elements
                </p>
                
                <div className="flex space-x-3 mb-6">
                  <button
                    className="px-4 py-2 rounded-md text-sm font-medium"
                    style={{ 
                      backgroundColor: primaryColorHex,
                      color: primaryContrastColor
                    }}
                  >
                    Primary Button
                  </button>
                  
                  <button
                    className="px-4 py-2 rounded-md text-sm font-medium"
                    style={{ 
                      backgroundColor: accentColorHex,
                      color: accentContrastColor
                    }}
                  >
                    Secondary Button
                  </button>
                  
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium border ${
                      colorMode === 'dark' ? 'border-slate-600 text-slate-200' : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    Tertiary Button
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-md border ${
                        colorMode === 'dark' ? 'border-slate-700 bg-slate-850' : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div 
                        className="w-full h-24 rounded-md mb-2" 
                        style={{ 
                          backgroundColor: i === 0 
                            ? primaryColorHex
                            : i === 1 
                              ? accentColorHex 
                              : colorMode === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                      ></div>
                      <div className={`h-3 w-3/4 rounded mb-1 ${colorMode === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                      <div className={`h-3 w-1/2 rounded ${colorMode === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: primaryColorHex }}
                  ></div>
                  <span 
                    className={`text-sm ${colorMode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    Text with primary accent
                  </span>
                  <div 
                    className="w-3 h-3 rounded-full mx-2 ml-4"
                    style={{ backgroundColor: accentColorHex }}
                  ></div>
                  <span 
                    className={`text-sm ${colorMode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    Text with secondary accent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 