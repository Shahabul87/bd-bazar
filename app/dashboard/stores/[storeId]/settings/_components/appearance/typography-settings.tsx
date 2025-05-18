"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Typography {
  headingFont: string;
  bodyFont: string;
  baseFontSize: number;
  lineHeight: number;
  fontWeights: {
    heading: string;
    body: string;
  };
}

interface TypographySettingsProps {
  typography: Typography;
  onChange: (typography: Typography) => void;
}

export const TypographySettings = ({
  typography,
  onChange
}: TypographySettingsProps) => {
  const { 
    headingFont = "Inter", 
    bodyFont = "Inter", 
    baseFontSize = 16, 
    lineHeight = 1.5,
    fontWeights = {
      heading: "bold",
      body: "normal"
    }
  } = typography;

  const [headingFontOpen, setHeadingFontOpen] = useState(false);
  const [bodyFontOpen, setBodyFontOpen] = useState(false);
  const [fontSizeOpen, setFontSizeOpen] = useState(false);
  const [lineHeightOpen, setLineHeightOpen] = useState(false);
  const [headingWeightOpen, setHeadingWeightOpen] = useState(false);
  const [bodyWeightOpen, setBodyWeightOpen] = useState(false);

  const fontFamilyOptions = [
    { value: "Inter", label: "Inter", description: "Modern, clean sans-serif" },
    { value: "Roboto", label: "Roboto", description: "Google's signature font" },
    { value: "Montserrat", label: "Montserrat", description: "Elegant geometric sans-serif" },
    { value: "Playfair Display", label: "Playfair Display", description: "Serif for headings" },
    { value: "Lato", label: "Lato", description: "Balanced and readable" },
    { value: "Poppins", label: "Poppins", description: "Geometric with personality" },
    { value: "Oswald", label: "Oswald", description: "Narrow and condensed" },
    { value: "Open Sans", label: "Open Sans", description: "Humanist sans-serif" }
  ];

  const fontSizeOptions = [
    { value: 14, label: "Small", description: "Compact text (14px)" },
    { value: 16, label: "Medium", description: "Standard size (16px)" },
    { value: 18, label: "Large", description: "Enhanced readability (18px)" },
    { value: 20, label: "Extra Large", description: "Maximum readability (20px)" }
  ];

  const lineHeightOptions = [
    { value: 1.2, label: "Tight", description: "Compact line spacing" },
    { value: 1.5, label: "Standard", description: "Balanced line spacing" },
    { value: 1.8, label: "Spacious", description: "Increased readability" },
    { value: 2, label: "Extra Spacious", description: "Maximum readability" }
  ];

  const fontWeightOptions = [
    { value: "light", label: "Light", description: "300 weight - thin and elegant" },
    { value: "normal", label: "Normal", description: "400 weight - standard" },
    { value: "medium", label: "Medium", description: "500 weight - slightly bolder" },
    { value: "semibold", label: "Semibold", description: "600 weight - strong emphasis" },
    { value: "bold", label: "Bold", description: "700 weight - maximum emphasis" }
  ];

  const handleHeadingFontChange = (value: string) => {
    onChange({
      ...typography,
      headingFont: value
    });
  };

  const handleBodyFontChange = (value: string) => {
    onChange({
      ...typography,
      bodyFont: value
    });
  };

  const handleFontSizeChange = (value: number) => {
    onChange({
      ...typography,
      baseFontSize: value
    });
  };

  const handleLineHeightChange = (value: number) => {
    onChange({
      ...typography,
      lineHeight: value
    });
  };

  const handleHeadingWeightChange = (value: string) => {
    onChange({
      ...typography,
      fontWeights: {
        ...typography.fontWeights,
        heading: value
      }
    });
  };

  const handleBodyWeightChange = (value: string) => {
    onChange({
      ...typography,
      fontWeights: {
        ...typography.fontWeights,
        body: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-white mb-6">
          Typography Settings
        </h3>
        
        {/* Heading Font Family */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Heading Font
              </label>
              <p className="text-xs text-slate-400">
                Choose the font for headings
              </p>
            </div>
            <div className="relative w-64">
              <button
                onClick={() => setHeadingFontOpen(!headingFontOpen)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-between text-slate-200"
              >
                <span className="text-sm" style={{ fontFamily: headingFont }}>
                  {fontFamilyOptions.find(option => option.value === headingFont)?.label || headingFont}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              
              {headingFontOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg">
                  <ul className="py-1 max-h-60 overflow-auto">
                    {fontFamilyOptions.map((option) => (
                      <li 
                        key={option.value}
                        onClick={() => {
                          handleHeadingFontChange(option.value);
                          setHeadingFontOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-slate-700 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="block text-sm text-slate-200" style={{ fontFamily: option.value }}>
                            {option.label}
                          </span>
                          <span className="block text-xs text-slate-400">
                            {option.description}
                          </span>
                        </div>
                        {headingFont === option.value && (
                          <Check className="h-4 w-4 text-indigo-500" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body Font Family */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Body Font
              </label>
              <p className="text-xs text-slate-400">
                Choose the font for body text
              </p>
            </div>
            <div className="relative w-64">
              <button
                onClick={() => setBodyFontOpen(!bodyFontOpen)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-between text-slate-200"
              >
                <span className="text-sm" style={{ fontFamily: bodyFont }}>
                  {fontFamilyOptions.find(option => option.value === bodyFont)?.label || bodyFont}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              
              {bodyFontOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg">
                  <ul className="py-1 max-h-60 overflow-auto">
                    {fontFamilyOptions.map((option) => (
                      <li 
                        key={option.value}
                        onClick={() => {
                          handleBodyFontChange(option.value);
                          setBodyFontOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-slate-700 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="block text-sm text-slate-200" style={{ fontFamily: option.value }}>
                            {option.label}
                          </span>
                          <span className="block text-xs text-slate-400">
                            {option.description}
                          </span>
                        </div>
                        {bodyFont === option.value && (
                          <Check className="h-4 w-4 text-indigo-500" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Base Font Size */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Base Font Size
              </label>
              <p className="text-xs text-slate-400">
                Set the default size for text
              </p>
            </div>
            <div className="relative w-64">
              <button
                onClick={() => setFontSizeOpen(!fontSizeOpen)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-between text-slate-200"
              >
                <span className="text-sm">
                  {fontSizeOptions.find(option => option.value === baseFontSize)?.label || `${baseFontSize}px`}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              
              {fontSizeOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg">
                  <ul className="py-1 max-h-60 overflow-auto">
                    {fontSizeOptions.map((option) => (
                      <li 
                        key={option.value}
                        onClick={() => {
                          handleFontSizeChange(option.value);
                          setFontSizeOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-slate-700 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="block text-sm text-slate-200">
                            {option.label}
                          </span>
                          <span className="block text-xs text-slate-400">
                            {option.description}
                          </span>
                        </div>
                        {baseFontSize === option.value && (
                          <Check className="h-4 w-4 text-indigo-500" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Typography Preview */}
        <div className="mt-8 p-4 rounded-md bg-slate-900 border border-slate-700">
          <h4 className="text-white text-sm mb-4">Typography Preview</h4>
          <div className="p-6 bg-white rounded-md border">
            <h1 
              className="text-3xl mb-3 text-slate-900"
              style={{ 
                fontFamily: headingFont, 
                fontWeight: fontWeights.heading === 'bold' ? 700 : 
                           fontWeights.heading === 'semibold' ? 600 :
                           fontWeights.heading === 'medium' ? 500 :
                           fontWeights.heading === 'light' ? 300 : 400
              }}
            >
              Store Heading
            </h1>
            <h2 
              className="text-xl mb-4 text-slate-700"
              style={{ 
                fontFamily: headingFont,
                fontWeight: fontWeights.heading === 'bold' ? 700 : 
                           fontWeights.heading === 'semibold' ? 600 :
                           fontWeights.heading === 'medium' ? 500 :
                           fontWeights.heading === 'light' ? 300 : 400
              }}
            >
              Product Category
            </h2>
            <p 
              className="mb-3 text-slate-600"
              style={{ 
                fontFamily: bodyFont, 
                fontSize: `${baseFontSize}px`,
                lineHeight: lineHeight,
                fontWeight: fontWeights.body === 'bold' ? 700 : 
                           fontWeights.body === 'semibold' ? 600 :
                           fontWeights.body === 'medium' ? 500 :
                           fontWeights.body === 'light' ? 300 : 400
              }}
            >
              This is how your store's typography will look. The base font size is {baseFontSize}px with a line height of {lineHeight}.
            </p>
            <p 
              className="text-slate-600"
              style={{ 
                fontFamily: bodyFont, 
                fontSize: `${baseFontSize}px`,
                lineHeight: lineHeight,
                fontWeight: fontWeights.body === 'bold' ? 700 : 
                           fontWeights.body === 'semibold' ? 600 :
                           fontWeights.body === 'medium' ? 500 :
                           fontWeights.body === 'light' ? 300 : 400
              }}
            >
              Product descriptions and other content will use the body font settings for maximum readability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 