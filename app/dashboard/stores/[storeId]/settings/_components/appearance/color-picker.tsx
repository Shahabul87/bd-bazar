"use client";

import { useState, useEffect } from "react";
import { Paintbrush, Check } from "lucide-react";

interface ColorPickerProps {
  label: string;
  description: string;
  value: string;
  onChange: (color: string) => void;
}

// Predefined color palette
const PRESET_COLORS = [
  // Blues & Purples
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
  // Greens & Teals
  "#10b981", "#06b6d4", "#0ea5e9", "#14b8a6", "#22c55e",
  // Reds & Oranges
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#ec4899",
  // Darks & Neutrals
  "#0f172a", "#1e293b", "#334155", "#475569", "#64748b",
];

export const ColorPicker = ({
  label,
  description,
  value,
  onChange
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    setCurrentColor(value);
  }, [value]);
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    onChange(newColor);
  };
  
  const handlePresetClick = (color: string) => {
    setCurrentColor(color);
    onChange(color);
  };

  // Calculate contrasting text color for the selected color
  const getContrastText = (hexColor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance (perceived brightness)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };
  
  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-5">
      <div className="flex items-start mb-3">
        <div 
          className="w-12 h-12 rounded-lg mr-3 relative overflow-hidden shadow-md"
          style={{ backgroundColor: currentColor }}
        >
          <div 
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <input 
              type="color"
              value={currentColor}
              onChange={handleColorChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Paintbrush 
              className={`h-5 w-5 transition-all ${isDragging ? 'scale-90' : ''}`}
              style={{ color: getContrastText(currentColor) }}
            />
          </div>
        </div>
        <div>
          <h3 className="text-white font-medium">
            {label}
          </h3>
          <p className="text-xs text-slate-400">
            {description}
          </p>
        </div>
      </div>
      
      <div className="mt-4 mb-3">
        <label className="text-xs font-medium text-slate-400 mb-1 block">
          Color Value
        </label>
        <div className="flex rounded-md overflow-hidden">
          <span className="bg-slate-700 text-slate-300 px-3 py-2 text-sm font-mono border-r border-slate-600">
            #
          </span>
          <input
            type="text"
            value={currentColor.replace('#', '')}
            onChange={(e) => {
              const val = e.target.value;
              if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                const newColor = `#${val.padEnd(6, '0')}`;
                setCurrentColor(newColor);
                if (val.length === 6) {
                  onChange(newColor);
                }
              }
            }}
            className="bg-slate-800 text-slate-200 px-3 py-2 text-sm font-mono flex-1 border-none focus:ring-0 focus:outline-none"
          />
        </div>
      </div>
      
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
        >
          {isOpen ? 'Hide color presets' : 'Show color presets'}
        </button>
        
        {isOpen && (
          <div className="mt-3">
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handlePresetClick(color)}
                  className={`
                    w-full aspect-square rounded-md border transition-all relative
                    ${currentColor.toUpperCase() === color.toUpperCase() 
                      ? 'ring-2 ring-indigo-500 border-transparent' 
                      : 'border-slate-700 hover:border-slate-600'
                    }
                  `}
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  {currentColor.toUpperCase() === color.toUpperCase() && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check size={14} color={getContrastText(color)} />
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-3 grid grid-cols-7 gap-1.5">
              {['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#334155'].map((color) => (
                <button
                  key={color}
                  onClick={() => handlePresetClick(color)}
                  className={`
                    w-full aspect-square rounded-md border transition-all
                    ${currentColor.toUpperCase() === color.toUpperCase() 
                      ? 'ring-1 ring-indigo-500 border-transparent' 
                      : 'border-slate-700 hover:border-slate-600'
                    }
                  `}
                  style={{ backgroundColor: color }}
                  title="Slate shades"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Preview area */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="text-xs text-slate-400 mb-2">Preview</div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-full h-9 flex items-center justify-center rounded-md text-sm font-medium"
            style={{ 
              backgroundColor: currentColor,
              color: getContrastText(currentColor)
            }}
          >
            Button
          </div>
          <div 
            className="w-full h-9 flex items-center justify-center rounded-md text-sm font-medium border"
            style={{ 
              borderColor: currentColor,
              color: currentColor
            }}
          >
            Outline
          </div>
        </div>
      </div>
    </div>
  );
}; 