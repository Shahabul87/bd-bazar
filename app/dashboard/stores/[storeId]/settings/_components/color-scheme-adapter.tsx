import React, { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  mode: "light" | "dark" | "auto";
}

interface ColorSchemeAdapterProps {
  onUpdate: (colorScheme: ColorScheme) => void;
  initialValue?: ColorScheme;
}

export const ColorSchemeAdapter = ({ onUpdate, initialValue }: ColorSchemeAdapterProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(initialValue || {
    primary: "#4f46e5",
    secondary: "#8b5cf6",
    accent: "#ec4899",
    background: "#ffffff",
    text: "#374151",
    mode: "light"
  });

  useEffect(() => {
    if (initialValue) {
      setColorScheme(initialValue);
    }
  }, [initialValue]);

  const handleColorChange = (field: keyof ColorScheme, value: string) => {
    const updatedColorScheme = { 
      ...colorScheme, 
      [field]: value 
    };
    setColorScheme(updatedColorScheme);
    onUpdate(updatedColorScheme);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-indigo-500" />
        <h3 className="font-semibold text-lg text-slate-50">Color Scheme</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Color */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Primary Color
          </label>
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-md border border-slate-700 cursor-pointer"
              style={{ backgroundColor: colorScheme.primary }}
            >
              <input 
                type="color" 
                value={colorScheme.primary}
                onChange={(e) => handleColorChange("primary", e.target.value)}
                className="opacity-0 w-full h-full cursor-pointer"
              />
            </div>
            <input 
              type="text" 
              value={colorScheme.primary}
              onChange={(e) => handleColorChange("primary", e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        {/* Secondary Color */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Secondary Color
          </label>
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-md border border-slate-700 cursor-pointer"
              style={{ backgroundColor: colorScheme.secondary }}
            >
              <input 
                type="color" 
                value={colorScheme.secondary}
                onChange={(e) => handleColorChange("secondary", e.target.value)}
                className="opacity-0 w-full h-full cursor-pointer"
              />
            </div>
            <input 
              type="text" 
              value={colorScheme.secondary}
              onChange={(e) => handleColorChange("secondary", e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        {/* Accent Color */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Accent Color
          </label>
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-md border border-slate-700 cursor-pointer"
              style={{ backgroundColor: colorScheme.accent }}
            >
              <input 
                type="color" 
                value={colorScheme.accent}
                onChange={(e) => handleColorChange("accent", e.target.value)}
                className="opacity-0 w-full h-full cursor-pointer"
              />
            </div>
            <input 
              type="text" 
              value={colorScheme.accent}
              onChange={(e) => handleColorChange("accent", e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        {/* Color Mode */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Color Mode
          </label>
          <div className="flex gap-3">
            {["light", "dark", "auto"].map((mode) => (
              <div 
                key={mode}
                onClick={() => handleColorChange("mode", mode as "light" | "dark" | "auto")}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all flex-1
                  ${colorScheme.mode === mode 
                    ? "bg-indigo-500/20 border-indigo-500" 
                    : "bg-slate-800 border-slate-700"}
                  border
                `}
              >
                <span className="font-medium text-slate-200 capitalize">{mode}</span>
                {colorScheme.mode === mode && (
                  <Check className="ml-auto h-4 w-4 text-indigo-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Preview */}
      <div className="mt-8">
        <h4 className="text-slate-300 mb-3 text-sm font-medium">Preview</h4>
        <div className={`
          p-4 rounded-lg ${colorScheme.mode === "dark" ? "bg-gray-900" : "bg-white"} 
          border ${colorScheme.mode === "dark" ? "border-gray-800" : "border-gray-200"}
        `}>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colorScheme.primary}20` }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
                style={{ color: colorScheme.primary }}
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <div>
              <h5 className={`font-semibold ${colorScheme.mode === "dark" ? "text-white" : "text-gray-900"}`}>
                Shopping Cart
              </h5>
              <p className={`text-sm ${colorScheme.mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                3 items in your cart
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <button 
              className="w-full py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colorScheme.primary }}
            >
              Checkout
            </button>
            <button 
              className={`
                w-full py-2 rounded-lg font-medium border
                ${colorScheme.mode === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-gray-900"}
              `}
              style={{ color: colorScheme.secondary }}
            >
              Continue Shopping
            </button>
            <div className="mt-3 p-3 rounded-md" style={{ backgroundColor: `${colorScheme.accent}20`, color: colorScheme.accent }}>
              <p className="text-sm font-medium">Special Offer! Free shipping on orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 