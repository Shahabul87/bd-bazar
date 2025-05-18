import React, { useState, useEffect } from "react";
import { Layout, Check } from "lucide-react";

interface LayoutConfig {
  displayDensity: string;
  sidebarStyle: string;
  productGridLayout: string;
  contentWidth: string;
}

interface LayoutAdapterProps {
  onUpdate: (layout: LayoutConfig) => void;
  initialValue?: LayoutConfig;
}

export const LayoutAdapter = ({ onUpdate, initialValue }: LayoutAdapterProps) => {
  const [layout, setLayout] = useState<LayoutConfig>(initialValue || {
    displayDensity: "comfortable",
    sidebarStyle: "expanded",
    productGridLayout: "grid-3x3",
    contentWidth: "contained"
  });

  useEffect(() => {
    if (initialValue) {
      setLayout(initialValue);
    }
  }, [initialValue]);

  const handleChange = (field: keyof LayoutConfig, value: string) => {
    const updatedLayout = { 
      ...layout, 
      [field]: value 
    };
    setLayout(updatedLayout);
    onUpdate(updatedLayout);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Layout className="h-5 w-5 text-indigo-500" />
        <h3 className="font-semibold text-lg text-slate-50">Layout Settings</h3>
      </div>
      
      {/* Content Width */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Content Width
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div 
            onClick={() => handleChange("contentWidth", "contained")}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${layout.contentWidth === "contained" 
                ? "bg-indigo-500/20 border-indigo-500" 
                : "bg-slate-800 border-slate-700"}
            `}
          >
            <div className="w-full h-24 bg-slate-700 rounded-md mb-3 flex items-center justify-center">
              <div className="bg-slate-600 w-3/4 h-16 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm">Contained</span>
              {layout.contentWidth === "contained" && (
                <Check className="h-4 w-4 text-indigo-500" />
              )}
            </div>
          </div>
          <div 
            onClick={() => handleChange("contentWidth", "narrow")}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${layout.contentWidth === "narrow" 
                ? "bg-indigo-500/20 border-indigo-500" 
                : "bg-slate-800 border-slate-700"}
            `}
          >
            <div className="w-full h-24 bg-slate-700 rounded-md mb-3 flex items-center justify-center">
              <div className="bg-slate-600 w-1/2 h-16 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm">Narrow</span>
              {layout.contentWidth === "narrow" && (
                <Check className="h-4 w-4 text-indigo-500" />
              )}
            </div>
          </div>
          <div 
            onClick={() => handleChange("contentWidth", "full")}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${layout.contentWidth === "full" 
                ? "bg-indigo-500/20 border-indigo-500" 
                : "bg-slate-800 border-slate-700"}
            `}
          >
            <div className="w-full h-24 bg-slate-700 rounded-md mb-3 flex items-center justify-center">
              <div className="bg-slate-600 w-full h-16 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm">Full Width</span>
              {layout.contentWidth === "full" && (
                <Check className="h-4 w-4 text-indigo-500" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Grid Layout */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Product Grid Layout
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div 
            onClick={() => handleChange("productGridLayout", "grid-2x2")}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${layout.productGridLayout === "grid-2x2" 
                ? "bg-indigo-500/20 border-indigo-500" 
                : "bg-slate-800 border-slate-700"}
            `}
          >
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-slate-700 h-16 rounded"></div>
              <div className="bg-slate-700 h-16 rounded"></div>
              <div className="bg-slate-700 h-16 rounded"></div>
              <div className="bg-slate-700 h-16 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm">2x2 Grid</span>
              {layout.productGridLayout === "grid-2x2" && (
                <Check className="h-4 w-4 text-indigo-500" />
              )}
            </div>
          </div>
          <div 
            onClick={() => handleChange("productGridLayout", "grid-3x3")}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${layout.productGridLayout === "grid-3x3" 
                ? "bg-indigo-500/20 border-indigo-500" 
                : "bg-slate-800 border-slate-700"}
            `}
          >
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-slate-700 h-10 rounded"></div>
              <div className="bg-slate-700 h-10 rounded"></div>
              <div className="bg-slate-700 h-10 rounded"></div>
              <div className="bg-slate-700 h-10 rounded"></div>
              <div className="bg-slate-700 h-10 rounded"></div>
              <div className="bg-slate-700 h-10 rounded"></div>
              <div className="bg-slate-700 h-10 rounded"></div>
              <div className="bg-slate-700 h-10 rounded"></div>
              <div className="bg-slate-700 h-10 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm">3x3 Grid</span>
              {layout.productGridLayout === "grid-3x3" && (
                <Check className="h-4 w-4 text-indigo-500" />
              )}
            </div>
          </div>
          <div 
            onClick={() => handleChange("productGridLayout", "grid-4x4")}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${layout.productGridLayout === "grid-4x4" 
                ? "bg-indigo-500/20 border-indigo-500" 
                : "bg-slate-800 border-slate-700"}
            `}
          >
            <div className="grid grid-cols-4 gap-1 mb-3">
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
              <div className="bg-slate-700 h-8 rounded-sm"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm">4x4 Grid</span>
              {layout.productGridLayout === "grid-4x4" && (
                <Check className="h-4 w-4 text-indigo-500" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Display Density */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Display Density
        </label>
        <div className="flex flex-wrap gap-4">
          {["compact", "comfortable", "spacious"].map((density) => (
            <div 
              key={density}
              onClick={() => handleChange("displayDensity", density)}
              className={`
                border rounded-lg px-4 py-2 cursor-pointer transition-all
                ${layout.displayDensity === density 
                  ? "bg-indigo-500/20 border-indigo-500" 
                  : "bg-slate-800 border-slate-700"}
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-medium text-sm capitalize">{density}</span>
                {layout.displayDensity === density && (
                  <Check className="h-4 w-4 text-indigo-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sidebar Style */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Sidebar Style
        </label>
        <div className="flex flex-wrap gap-4">
          {["expanded", "collapsed", "hidden"].map((style) => (
            <div 
              key={style}
              onClick={() => handleChange("sidebarStyle", style)}
              className={`
                border rounded-lg px-4 py-2 cursor-pointer transition-all
                ${layout.sidebarStyle === style 
                  ? "bg-indigo-500/20 border-indigo-500" 
                  : "bg-slate-800 border-slate-700"}
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-medium text-sm capitalize">{style}</span>
                {layout.sidebarStyle === style && (
                  <Check className="h-4 w-4 text-indigo-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Layout Preview */}
      <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
        <h4 className="text-slate-300 mb-3 text-sm font-medium">Preview</h4>
        <div className="bg-white dark:bg-gray-900 rounded-md overflow-hidden">
          <div className="bg-slate-100 dark:bg-gray-800 p-3 border-b border-slate-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="font-medium">Store Name</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
          <div className="flex">
            {layout.sidebarStyle !== "hidden" && (
              <div className={`bg-slate-50 dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 ${
                layout.sidebarStyle === "expanded" ? "w-56" : "w-20"
              }`}>
                <div className="p-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="mb-2 h-8 bg-slate-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex-1 p-4">
              <div className="mb-4 h-8 bg-slate-100 dark:bg-gray-800 rounded w-1/3"></div>
              <div className={`grid ${
                layout.productGridLayout === "grid-2x2" ? "grid-cols-2" :
                layout.productGridLayout === "grid-4x4" ? "grid-cols-4" :
                "grid-cols-3"
              } gap-${
                layout.displayDensity === "compact" ? "3" :
                layout.displayDensity === "spacious" ? "6" :
                "4"
              }`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-slate-100 dark:bg-gray-800 rounded-lg p-3">
                    <div className="bg-slate-200 dark:bg-gray-700 h-32 mb-2 rounded"></div>
                    <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 