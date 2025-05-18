"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Paintbrush, Check, Palette, Layout, Type, 
  Image as ImageIcon, Save, ShoppingCart, Search,
  Menu, User, Heart, ChevronRight, Star,
  Monitor, Smartphone, Tablet, ExternalLink,
  Loader2
} from "lucide-react";
import { TemplateCard } from "./template-card";
import { ColorPicker } from "./color-picker";
import Image from "next/image";
import { TypographySettings } from "./typography-settings";
import { LayoutSettings } from "./layout-settings";
import { ColorSchemeSettings } from "./color-scheme-settings";
import { TypographyAdapter } from "../../_components/typography-adapter";
import { ColorSchemeAdapter } from "../../_components/color-scheme-adapter";
import { LayoutAdapter } from "../../_components/layout-adapter";
import { StoreTemplateRenderer } from "@/components/store-templates/template-renderer";

interface AppearanceSettingsProps {
  storeId: string;
}

export const AppearanceSettings = ({ storeId }: AppearanceSettingsProps) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'colors' | 'fonts' | 'layout'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal");
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [colorScheme, setColorScheme] = useState({
    primary: "#4f46e5",
    secondary: "#8b5cf6",
    accent: "#ec4899",
    background: "#ffffff",
    text: "#374151",
    mode: "light" as "light" | "dark" | "auto"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [storeSlug, setStoreSlug] = useState<string>("");
  const [isLoadingStoreUrl, setIsLoadingStoreUrl] = useState(false);
  const [typography, setTypography] = useState({
    headingFont: "Inter",
    bodyFont: "Inter",
    baseFontSize: 16,
    lineHeight: 1.5,
    fontWeights: {
      heading: "medium",
      body: "normal"
    }
  });
  const [layout, setLayout] = useState({
    displayDensity: "comfortable",
    sidebarStyle: "expanded",
    productGridLayout: "grid-3x3",
    contentWidth: "contained"
  });

  // Fetch existing appearance settings on component mount
  useEffect(() => {
    const fetchAppearanceSettings = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/stores/${storeId}/appearance`);
        
        console.log("API response:", response.data);
        
        if (response.data?.appearanceSettings) {
          try {
            const settings = JSON.parse(response.data.appearanceSettings);
            console.log("Parsed settings:", settings);
            
            // Apply the settings to our state
            if (settings.template) {
              console.log("Setting template to:", settings.template);
              setSelectedTemplate(settings.template);
            }
            if (settings.colorScheme) {
              setColorScheme(settings.colorScheme);
            }
            if (settings.typography) {
              setTypography(settings.typography);
            }
            if (settings.layout) {
              setLayout(settings.layout);
            }
          } catch (error) {
            console.error("Error parsing appearance settings:", error);
          }
        }

        // Fetch the store slug for the Visit Store button
        const storeResponse = await axios.get(`/api/stores/${storeId}`);
        if (storeResponse.data) {
          setStoreSlug(storeResponse.data.slug || storeResponse.data.name.replace(/\s+/g, '-').toLowerCase());
        }
      } catch (error) {
        console.error("Failed to fetch appearance settings:", error);
        toast.error("Failed to load appearance settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppearanceSettings();
  }, [storeId]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    try {
      // Create a consolidated appearance settings object
      const appearanceSettings = {
        template: selectedTemplate,
        colorScheme,
        typography,
        layout
      };
      
      console.log("Saving appearance settings:", appearanceSettings);
      console.log("Selected template:", selectedTemplate);
      
      // Save to the API
      const response = await axios.patch(
        `/api/stores/${storeId}/appearance`, 
        { 
          appearanceSettings: JSON.stringify(appearanceSettings)
        }
      );
      
      console.log("Save response:", response.data);
      
      if (response.status === 200) {
        toast.success("Appearance settings saved successfully");
      }
    } catch (error) {
      console.error("Failed to save appearance settings:", error);
      toast.error("Failed to save appearance settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLayoutUpdate = (newLayout: any) => {
    setLayout({
      ...layout,
      ...newLayout
    });
  };

  const handleTypographyUpdate = (newTypography: any) => {
    setTypography(newTypography);
  };

  const handleColorSchemeUpdate = (newColorScheme: any) => {
    setColorScheme(newColorScheme);
  };

  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean, modern design with focus on product images",
      image: "/default-image.webp",
      features: ["Simple navigation", "Product focus", "Fast loading"],
      colors: ["#ffffff", "#f3f4f6", "#374151", colorScheme.primary],
    },
    {
      id: "boutique",
      name: "Boutique",
      description: "Elegant design for fashion and luxury products",
      image: "/default-image.webp",
      features: ["Large hero images", "Sophisticated typography", "Animated transitions"],
      colors: ["#f8f9fa", "#e9ecef", "#212529", colorScheme.primary],
    },
    {
      id: "vibrant",
      name: "Vibrant",
      description: "Bold, colorful design for creative brands",
      image: "/default-image.webp",
      features: ["Bold typography", "Vibrant colors", "Interactive elements"],
      colors: ["#fafafa", "#f0f0f0", "#1a1a1a", colorScheme.primary],
    },
    {
      id: "tech",
      name: "Tech",
      description: "Modern design for tech and gadget stores",
      image: "/default-image.webp",
      features: ["Dark mode", "Grid layout", "Sleek animations"],
      colors: ["#18181b", "#27272a", "#fafafa", colorScheme.primary],
    },
    {
      id: "artisan",
      name: "Artisan",
      description: "Warm, rustic design for handmade and craft products",
      image: "/default-image.webp",
      features: ["Warm color palette", "Textured backgrounds", "Story-focused"],
      colors: ["#fffbeb", "#fef3c7", "#422006", colorScheme.primary],
    },
  ];

  const getSelectedTemplate = () => {
    return templates.find(t => t.id === selectedTemplate) || templates[0];
  };

  const renderTemplatePreview = () => {
    const template = getSelectedTemplate();
    
    // Setup dummy store data for the preview
    const previewStore = {
      name: "Your Store",
      logo: "", // No logo for the preview
      type: template.id === "tech" ? "Tech Store" : 
           template.id === "boutique" ? "Fashion Store" :
           template.id === "vibrant" ? "Creative Store" :
           template.id === "artisan" ? "Artisan Store" : "Retail Store",
      productCount: 24
    };
    
    // Pass current settings to the template renderer
    return (
      <StoreTemplateRenderer
        template={template.id as "minimal" | "boutique" | "vibrant" | "tech" | "artisan"}
        colorScheme={colorScheme}
        typography={typography}
        layout={layout}
        store={previewStore}
        isPreview={true}
        previewDevice={previewDevice}
      />
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-50 flex items-center">
            <Paintbrush className="h-6 w-6 mr-2 text-indigo-500" />
            Store Appearance
          </h2>
          <p className="text-slate-400 mt-1">
            Customize how your store looks to your customers
          </p>
        </div>
        
        <button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all ${
            isSaving 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white min-w-[120px]`}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
        
        {storeSlug && (
          <a 
            href={`/store/${storeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center ml-2 text-sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Store
          </a>
        )}
      </div>
      
      {/* Navigation tabs */}
      <div className="bg-slate-800/90 rounded-xl p-1 flex space-x-1">
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'templates' 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Layout className="h-4 w-4 mr-2" />
          Templates
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'colors' 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Palette className="h-4 w-4 mr-2" />
          Colors
        </button>
        <button
          onClick={() => setActiveTab('fonts')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'fonts' 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Type className="h-4 w-4 mr-2" />
          Typography
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'layout' 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Layout
        </button>
      </div>
      
      {/* Content area */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                Choose a template for your store
              </h3>
              <p className="text-slate-400 mb-6">
                Select a template that best fits your brand and products. You can customize colors and other elements after selecting a template.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplate === template.id}
                    onSelect={() => setSelectedTemplate(template.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'colors' && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                Customize your store colors
              </h3>
              <p className="text-slate-400 mb-6">
                Choose colors that reflect your brand identity. These colors will be applied across your store.
              </p>
              
              <ColorSchemeAdapter
                initialValue={colorScheme}
                onUpdate={handleColorSchemeUpdate}
              />
            </motion.div>
          )}
          
          {activeTab === 'fonts' && (
            <motion.div
              key="fonts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                Typography Settings
              </h3>
              <p className="text-slate-400 mb-6">
                Choose fonts and typography settings for your store.
              </p>
              
              <TypographyAdapter
                initialValue={typography}
                onUpdate={handleTypographyUpdate}
              />
            </motion.div>
          )}
          
          {activeTab === 'layout' && (
            <motion.div
              key="layout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                Layout Settings
              </h3>
              <p className="text-slate-400 mb-6">
                Customize the layout of your store pages.
              </p>
              
              <LayoutAdapter
                initialValue={layout}
                onUpdate={handleLayoutUpdate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Template preview */}
      {activeTab === 'templates' && selectedTemplate && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">
                Preview: {templates.find(t => t.id === selectedTemplate)?.name}
              </h3>
              <p className="text-sm text-slate-400">
                This is how your store will look with the selected template.
              </p>
            </div>
            
            <div className="flex bg-slate-900 p-1 rounded-lg">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                  previewDevice === 'desktop' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                  previewDevice === 'mobile' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mobile
              </button>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 p-6">
            {renderTemplatePreview()}
          </div>
          
          <div className="flex items-center justify-center mt-6">
            <p className="text-xs text-slate-500">
              Note: This is a simplified preview. The actual store will have more features and content.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 