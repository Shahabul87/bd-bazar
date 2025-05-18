import React, { useState, useEffect } from "react";
import { Typography } from "lucide-react";

interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  baseFontSize: number;
  lineHeight: number;
  fontWeights: {
    heading: string;
    body: string;
  };
}

interface TypographyAdapterProps {
  onUpdate: (typography: TypographyConfig) => void;
  initialValue?: TypographyConfig;
}

const fontOptions = [
  { value: "Inter", label: "Inter (Sans-serif)" },
  { value: "Roboto", label: "Roboto (Sans-serif)" },
  { value: "Open Sans", label: "Open Sans (Sans-serif)" },
  { value: "Lora", label: "Lora (Serif)" },
  { value: "Playfair Display", label: "Playfair Display (Serif)" },
  { value: "Merriweather", label: "Merriweather (Serif)" },
  { value: "Montserrat", label: "Montserrat (Sans-serif)" },
  { value: "Poppins", label: "Poppins (Sans-serif)" }
];

const fontWeightOptions = [
  { value: "light", label: "Light" },
  { value: "normal", label: "Regular" },
  { value: "medium", label: "Medium" },
  { value: "semibold", label: "Semi Bold" },
  { value: "bold", label: "Bold" }
];

export const TypographyAdapter = ({ onUpdate, initialValue }: TypographyAdapterProps) => {
  const [typography, setTypography] = useState<TypographyConfig>(initialValue || {
    headingFont: "Inter",
    bodyFont: "Inter",
    baseFontSize: 16,
    lineHeight: 1.5,
    fontWeights: {
      heading: "medium",
      body: "normal"
    }
  });

  useEffect(() => {
    if (initialValue) {
      setTypography(initialValue);
    }
  }, [initialValue]);

  const handleChange = (field: string, value: any) => {
    const updatedTypography = { 
      ...typography,
      [field]: value
    };
    setTypography(updatedTypography);
    onUpdate(updatedTypography);
  };

  const handleFontWeightChange = (type: 'heading' | 'body', value: string) => {
    const updatedWeights = {
      ...typography.fontWeights,
      [type]: value
    };
    const updatedTypography = {
      ...typography,
      fontWeights: updatedWeights
    };
    setTypography(updatedTypography);
    onUpdate(updatedTypography);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Typography className="h-5 w-5 text-indigo-500" />
        <h3 className="font-semibold text-lg text-slate-50">Typography Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Heading Font */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Heading Font
          </label>
          <select
            value={typography.headingFont}
            onChange={(e) => handleChange("headingFont", e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Body Font */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Body Font
          </label>
          <select
            value={typography.bodyFont}
            onChange={(e) => handleChange("bodyFont", e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Base Font Size */}
        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Base Font Size
            </label>
            <span className="text-sm text-slate-400">{typography.baseFontSize}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={typography.baseFontSize}
            onChange={(e) => handleChange("baseFontSize", parseInt(e.target.value))}
            className="w-full bg-slate-700 range-lg rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Line Height */}
        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Line Height
            </label>
            <span className="text-sm text-slate-400">{typography.lineHeight}x</span>
          </div>
          <input
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={typography.lineHeight}
            onChange={(e) => handleChange("lineHeight", parseFloat(e.target.value))}
            className="w-full bg-slate-700 range-lg rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Heading Font Weight */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Heading Weight
          </label>
          <select
            value={typography.fontWeights.heading}
            onChange={(e) => handleFontWeightChange("heading", e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {fontWeightOptions.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
        </div>

        {/* Body Font Weight */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Body Weight
          </label>
          <select
            value={typography.fontWeights.body}
            onChange={(e) => handleFontWeightChange("body", e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {fontWeightOptions.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Typography Preview */}
      <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
        <h4 className="text-slate-300 mb-3 text-sm font-medium">Preview</h4>
        <div 
          className="p-4 rounded-md bg-white dark:bg-gray-900" 
          style={{ 
            fontFamily: typography.bodyFont,
            fontSize: `${typography.baseFontSize}px`,
            lineHeight: typography.lineHeight
          }}
        >
          <h1 
            className="text-2xl mb-2 text-gray-900 dark:text-white" 
            style={{ 
              fontFamily: typography.headingFont,
              fontWeight: typography.fontWeights.heading === 'bold' ? 'bold' : 
                        typography.fontWeights.heading === 'semibold' ? '600' :
                        typography.fontWeights.heading === 'medium' ? '500' :
                        typography.fontWeights.heading === 'light' ? '300' : 'normal'
            }}
          >
            Heading Text Example
          </h1>
          <p 
            className="text-gray-700 dark:text-gray-300"
            style={{ 
              fontWeight: typography.fontWeights.body === 'bold' ? 'bold' : 
                        typography.fontWeights.body === 'semibold' ? '600' :
                        typography.fontWeights.body === 'medium' ? '500' :
                        typography.fontWeights.body === 'light' ? '300' : 'normal'
            }}
          >
            This is an example body text that demonstrates how your typography settings will look on your store website. The font size, line height, and weights you choose will affect readability and overall appearance.
          </p>
        </div>
      </div>
    </div>
  );
}; 