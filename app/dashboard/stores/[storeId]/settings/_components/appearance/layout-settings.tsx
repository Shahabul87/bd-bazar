"use client";

import { useState } from "react";
import { Layout, Columns, Grid, ChevronsUpDown, Check, Rows, Eye, EyeOff, Square, Image as ImageIcon, ChevronDown, Grid2X2, Grid3X3, LayoutGrid, Layers, Monitor, Smartphone, Tablet, MenuSquare, SidebarClose, SidebarOpen, Tag, Sliders, PanelLeft, MousePointer2, Accessibility, Info, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GridCustomizationOption {
  name: string;
  value: number;
}

interface LayoutSettingsProps {
  displayDensity: string;
  sidebarStyle: string;
  productGridLayout: string;
  onChangeDisplayDensity: (density: string) => void;
  onChangeSidebarStyle: (style: string) => void;
  onChangeProductGridLayout: (layout: string) => void;
}

export const LayoutSettings = ({
  displayDensity = "comfortable",
  sidebarStyle = "expanded",
  productGridLayout = "grid-3x3",
  onChangeDisplayDensity,
  onChangeSidebarStyle,
  onChangeProductGridLayout
}: LayoutSettingsProps) => {
  const [densityDropdownOpen, setDensityDropdownOpen] = useState(false);
  const [sidebarDropdownOpen, setSidebarDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'advanced' | 'accessibility'>('general');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [customColumns, setCustomColumns] = useState<GridCustomizationOption[]>([
    { name: "Desktop", value: 4 },
    { name: "Tablet", value: 3 },
    { name: "Mobile", value: 2 }
  ]);
  const [customGap, setCustomGap] = useState(16);
  const [advancedEnabled, setAdvancedEnabled] = useState(false);
  
  const displayDensityOptions = [
    { value: "compact", label: "Compact", description: "Maximizes content in the available space" },
    { value: "comfortable", label: "Comfortable", description: "Balanced spacing for readability" },
    { value: "spacious", label: "Spacious", description: "More breathing room between elements" }
  ];
  
  const sidebarOptions = [
    { value: "expanded", label: "Expanded", description: "Full width sidebar with text labels" },
    { value: "collapsed", label: "Collapsed", description: "Icons only, more content space" },
    { value: "hidden", label: "Hidden", description: "Maximizes content area" }
  ];

  const accessibilitySettings = [
    { id: "highContrast", label: "High Contrast Mode", description: "Increases contrast for better readability", default: false },
    { id: "largeText", label: "Large Text", description: "Increases text size throughout the store", default: false },
    { id: "reducedMotion", label: "Reduced Motion", description: "Minimizes animations and transitions", default: false },
    { id: "screenReader", label: "Screen Reader Optimization", description: "Enhances compatibility with screen readers", default: true }
  ];

  const handleColumnChange = (deviceIndex: number, newValue: number) => {
    const newColumns = [...customColumns];
    newColumns[deviceIndex].value = newValue;
    setCustomColumns(newColumns);
  };

  // Get grid columns based on current layout or custom settings
  const getGridColumns = () => {
    if (!advancedEnabled) {
      switch (productGridLayout) {
        case "grid-2x2": return previewDevice === 'desktop' ? 2 : previewDevice === 'tablet' ? 2 : 1;
        case "grid-3x3": return previewDevice === 'desktop' ? 3 : previewDevice === 'tablet' ? 2 : 1;
        case "grid-4x4": return previewDevice === 'desktop' ? 4 : previewDevice === 'tablet' ? 3 : 2;
        default: return 3;
      }
    } else {
      return customColumns.find(col => 
        (previewDevice === 'desktop' && col.name === 'Desktop') ||
        (previewDevice === 'tablet' && col.name === 'Tablet') ||
        (previewDevice === 'mobile' && col.name === 'Mobile')
      )?.value || 3;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-white mb-6">
          Layout & Display Settings
        </h3>
        
        {/* Settings Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 p-1 bg-slate-800 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'general' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'advanced' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              Advanced
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'accessibility' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              Accessibility
            </button>
          </div>
        </div>
        
        {activeTab === 'general' && (
          <>
            {/* Display Density */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1">
                    Display Density
                  </label>
                  <p className="text-xs text-slate-400">
                    Controls the spacing and size of UI elements
                  </p>
                </div>
                <div className="relative w-64">
                  <button
                    onClick={() => setDensityDropdownOpen(!densityDropdownOpen)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-between text-slate-200"
                  >
                    <span className="text-sm">
                      {displayDensityOptions.find(option => option.value === displayDensity)?.label || displayDensity}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  {densityDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {displayDensityOptions.map((option) => (
                          <li 
                            key={option.value}
                            onClick={() => {
                              onChangeDisplayDensity(option.value);
                              setDensityDropdownOpen(false);
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
                            {displayDensity === option.value && (
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
            
            {/* Sidebar Style */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1">
                    Sidebar Style
                  </label>
                  <p className="text-xs text-slate-400">
                    Choose how the navigation sidebar appears
                  </p>
                </div>
                <div className="relative w-64">
                  <button
                    onClick={() => setSidebarDropdownOpen(!sidebarDropdownOpen)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-between text-slate-200"
                  >
                    <span className="text-sm">
                      {sidebarOptions.find(option => option.value === sidebarStyle)?.label || sidebarStyle}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  {sidebarDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md bg-slate-800 border border-slate-700 shadow-lg">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {sidebarOptions.map((option) => (
                          <li 
                            key={option.value}
                            onClick={() => {
                              onChangeSidebarStyle(option.value);
                              setSidebarDropdownOpen(false);
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
                            {sidebarStyle === option.value && (
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
            
            {/* Product Grid Layout */}
            <div className="mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Product Grid Layout
                </label>
                <p className="text-xs text-slate-400 mb-4">
                  Choose how product grids are displayed in your store
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Button
                  onClick={() => onChangeProductGridLayout('grid-2x2')}
                  variant={productGridLayout === 'grid-2x2' ? 'secondary' : 'outline'}
                  className={cn(
                    "h-auto w-full p-4 justify-start",
                    productGridLayout === 'grid-2x2' ? 'border-purple-600 bg-purple-500/10' : 'border-border',
                  )}
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <Grid2X2 className="h-10 w-10 mb-2 text-purple-500" />
                    <span className="text-sm font-medium">2×2 Grid</span>
                  </div>
                </Button>
                <Button
                  onClick={() => onChangeProductGridLayout('grid-3x3')}
                  variant={productGridLayout === 'grid-3x3' ? 'secondary' : 'outline'}
                  className={cn(
                    "h-auto w-full p-4 justify-start",
                    productGridLayout === 'grid-3x3' ? 'border-purple-600 bg-purple-500/10' : 'border-border',
                  )}
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <Grid3X3 className="h-10 w-10 mb-2 text-purple-500" />
                    <span className="text-sm font-medium">3×3 Grid</span>
                  </div>
                </Button>
                <Button
                  onClick={() => onChangeProductGridLayout('grid-4x4')}
                  variant={productGridLayout === 'grid-4x4' ? 'secondary' : 'outline'}
                  className={cn(
                    "h-auto w-full p-4 justify-start",
                    productGridLayout === 'grid-4x4' ? 'border-purple-600 bg-purple-500/10' : 'border-border',
                  )}
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <LayoutGrid className="h-10 w-10 mb-2 text-purple-500" />
                    <span className="text-sm font-medium">4×4 Grid</span>
                  </div>
                </Button>
              </div>
            </div>
            
            {/* Product Card Settings */}
            <div className="mb-8">
              <h4 className="text-white text-sm font-medium mb-3">
                Product Information Display
              </h4>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-slate-400" />
                      Show price prominently
                    </label>
                    <div className="bg-indigo-500/20 text-indigo-400 text-xs font-medium py-1 px-2 rounded">
                      Always visible
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-slate-400" />
                      Display stock status
                    </label>
                    <div className="bg-indigo-500/20 text-indigo-400 text-xs font-medium py-1 px-2 rounded">
                      Always visible
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-slate-400" />
                      Show product variants
                    </label>
                    <div className="bg-indigo-500/20 text-indigo-400 text-xs font-medium py-1 px-2 rounded">
                      Always visible
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300 flex items-center gap-2">
                      <MenuSquare className="h-4 w-4 text-slate-400" />
                      Display product details
                    </label>
                    <div className="bg-indigo-500/20 text-indigo-400 text-xs font-medium py-1 px-2 rounded">
                      Always visible
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-indigo-400 mt-2">Note: All important product information is now set to always be visible for better user experience.</p>
            </div>
          </>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-white text-sm font-medium">Advanced Grid Customization</h4>
                <p className="text-xs text-slate-400 mt-1">Fine-tune your product grid for different devices</p>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-slate-400 mr-2">Enable</span>
                <button 
                  onClick={() => setAdvancedEnabled(!advancedEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors ${advancedEnabled ? 'bg-indigo-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${advancedEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>

            {advancedEnabled && (
              <>
                <div className="space-y-4 mb-4">
                  {customColumns.map((device, index) => (
                    <div key={device.name} className="flex items-center justify-between">
                      <label className="text-sm text-slate-300">{device.name} Columns</label>
                      <div className="w-1/2">
                        <div className="flex items-center">
                          <input
                            type="range"
                            min="1"
                            max="6"
                            value={device.value}
                            onChange={(e) => handleColumnChange(index, parseInt(e.target.value))}
                            className="w-full"
                          />
                          <span className="ml-2 text-sm text-slate-300 w-6 text-center">{device.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300">Grid Gap</label>
                    <div className="w-1/2">
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="32"
                          step="4"
                          value={customGap}
                          onChange={(e) => setCustomGap(parseInt(e.target.value))}
                          className="w-full"
                        />
                        <span className="ml-2 text-sm text-slate-300 w-6 text-center">{customGap}px</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <h5 className="text-sm text-slate-300 mb-2 flex items-center gap-1">
                    <Info className="h-4 w-4 text-indigo-400" />
                    Advanced Mode
                  </h5>
                  <p className="text-xs text-slate-400">
                    Changes in advanced mode will override the default grid layouts. Your settings will be applied to all product grid pages.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'accessibility' && (
          <div className="space-y-6">
            <p className="text-slate-400 text-sm">Make your store accessible to all users with these settings.</p>
            
            <div className="space-y-4">
              {accessibilitySettings.map(setting => (
                <div key={setting.id} className="flex items-start p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="mt-0.5">
                    <button 
                      className={`w-5 h-5 rounded ${setting.default ? 'bg-indigo-500' : 'bg-slate-700'} flex items-center justify-center`}
                    >
                      {setting.default && <Check className="h-3 w-3 text-white" />}
                    </button>
                  </div>
                  <div className="ml-3">
                    <label className="text-sm font-medium text-slate-200 flex items-center">
                      {setting.label}
                      {setting.id === "screenReader" && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-indigo-500/20 text-indigo-400 rounded">Recommended</span>
                      )}
                    </label>
                    <p className="text-xs text-slate-400 mt-1">{setting.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 mt-4">
              <div className="flex items-start">
                <Accessibility className="h-5 w-5 text-indigo-400 mr-2 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-slate-200">Accessibility Statement</h5>
                  <p className="text-xs text-slate-400 mt-1">
                    Your store is configured with accessibility best practices. These settings ensure optimal experience for all users, including those with disabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Preview */}
        <div className="mt-8">
          <h4 className="text-white text-sm font-medium mb-3">Layout Preview</h4>
          <div className="p-5 bg-slate-900 rounded-md border border-slate-700">
            <div className="flex space-x-4 h-64 overflow-hidden rounded-md border border-slate-700">
              {/* Sidebar preview */}
              <div className={`
                bg-slate-800 border-r border-slate-700 
                ${sidebarStyle === 'expanded' ? 'w-40' : sidebarStyle === 'collapsed' ? 'w-14' : 'w-0'}
                flex-shrink-0 transition-all duration-300
              `}>
                {sidebarStyle !== 'hidden' && (
                  <div className="p-2">
                    <div className="bg-indigo-800/30 rounded-md p-2 mb-4 flex items-center justify-center">
                      {sidebarStyle === 'expanded' ? (
                        <span className="text-xs text-slate-300">Store Name</span>
                      ) : (
                        <span className="text-xs text-slate-300">S</span>
                      )}
                    </div>
                    
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`flex items-center my-2 px-2 py-1.5 rounded-md ${i === 0 ? 'bg-slate-700' : ''}`}
                      >
                        <div className="w-6 h-6 rounded-md bg-slate-700 flex-shrink-0"></div>
                        {sidebarStyle === 'expanded' && (
                          <span className="text-xs text-slate-400 ml-2">Menu Item</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Content preview */}
              <div className={`flex-1 bg-slate-800 p-3 ${
                displayDensity === 'compact' 
                  ? 'space-y-2' 
                  : displayDensity === 'comfortable'
                    ? 'space-y-3' 
                    : 'space-y-4'
              }`}>
                <div>
                  <div className="w-1/3 h-3 bg-slate-700 rounded-md mb-2"></div>
                  <div className={`grid grid-cols-${getGridColumns()} gap-${customGap/4}`} style={{ 
                    gridTemplateColumns: `repeat(${getGridColumns()}, minmax(0, 1fr))`,
                    gap: advancedEnabled ? `${customGap}px` : undefined
                  }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="bg-slate-700 rounded-md overflow-hidden">
                        <div 
                          className={`w-full ${
                            productGridLayout === 'grid-2x2' 
                              ? 'aspect-square' 
                              : productGridLayout === 'grid-3x3'
                                ? 'aspect-[4/3]' 
                                : 'aspect-[3/2]'
                          } bg-slate-600`}
                        ></div>
                        <div className={`p-${
                          displayDensity === 'compact' 
                            ? '1' 
                            : displayDensity === 'comfortable'
                              ? '2' 
                              : '3'
                        }`}>
                          <div className="w-full h-2 bg-slate-600 rounded-sm mb-1"></div>
                          <div className="w-2/3 h-2 bg-indigo-500 rounded-sm mb-1"></div>
                          <div className="flex justify-between items-center">
                            <div className="w-1/3 h-2 bg-slate-600 rounded-sm"></div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="w-full h-4 bg-slate-700 rounded-md"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-4">
              <div className="flex bg-slate-800 p-1 rounded-md">
                <button 
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${
                    previewDevice === 'desktop' ? 'text-white bg-indigo-500' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Monitor className="h-3 w-3" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${
                    previewDevice === 'tablet' ? 'text-white bg-indigo-500' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Tablet className="h-3 w-3" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${
                    previewDevice === 'mobile' ? 'text-white bg-indigo-500' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Smartphone className="h-3 w-3" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 