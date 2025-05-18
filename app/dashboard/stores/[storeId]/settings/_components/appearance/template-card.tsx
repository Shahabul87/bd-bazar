"use client";

import { motion } from "framer-motion";
import { Check, Store, ShoppingCart, Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import { storeTemplates } from "@/components/store-templates/templates";

interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  suitableFor?: string[];
  preview?: string;
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
  storeType?: string; // Optional store type to show compatibility
}

export const TemplateCard = ({ 
  template, 
  isSelected, 
  onSelect,
  storeType
}: TemplateCardProps) => {
  // Early return if template is undefined
  if (!template) {
    return null;
  }

  // Calculate template suitability if store type is provided
  const getSuitabilityLabel = () => {
    if (!storeType) return null;
    
    const isHighlySuitable = template.suitableFor?.some(type => 
      type.toLowerCase().includes(storeType.toLowerCase())
    );

    if (isHighlySuitable) {
      return (
        <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs rounded-full px-2 py-1 font-medium flex items-center">
          <Star className="w-3 h-3 mr-1 fill-white" />
          Recommended
        </div>
      );
    }
    
    return null;
  };

  // Create a mock store preview based on the template
  const renderMockPreview = () => {
    const primary = template.colors?.primary || "#4f46e5";
    const background = template.colors?.background || "#ffffff";
    const isDark = background.toLowerCase() === "#111827";
    
    return (
      <div className="relative w-full h-full" style={{ backgroundColor: background }}>
        {/* Mock header */}
        <div className="h-4 w-full flex items-center justify-between px-2" 
             style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
          <div className="flex space-x-1">
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          </div>
          <div className="flex space-x-1">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: primary }}></div>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: primary }}></div>
          </div>
        </div>
        
        {/* Mock hero */}
        <div className="h-16 w-full" style={{ 
          background: `linear-gradient(to right, ${primary}, ${template.colors?.secondary || primary})`,
          opacity: 0.8
        }}>
          <div className="flex items-center h-full px-2">
            <div className="w-4 h-4 rounded-full bg-white mr-2 flex items-center justify-center">
              <Store className="w-2 h-2" style={{ color: primary }} />
            </div>
            <div>
              <div className="h-1 w-10 bg-white rounded-full mb-1 opacity-80"></div>
              <div className="h-0.5 w-16 bg-white/70 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Mock product grid */}
        <div className="p-2">
          <div className="flex justify-between items-center mb-1">
            <div className="h-1 w-10 rounded-full" style={{ backgroundColor: isDark ? 'white' : '#111' }}></div>
            <ChevronRight className="w-2 h-2" style={{ color: primary }} />
          </div>
          
          <div className={`grid grid-cols-3 gap-1`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-sm">
                <div className="h-full w-full flex flex-col p-0.5">
                  <div className="flex-grow bg-gray-300 rounded-sm mb-0.5 relative">
                    {i === 0 && (
                      <div 
                        className="absolute top-0 right-0 w-1.5 h-1" 
                        style={{ backgroundColor: primary }}
                      ></div>
                    )}
                  </div>
                  <div className="h-0.5 w-3 bg-gray-400 rounded-sm mb-0.5"></div>
                  <div className="h-0.5 w-2" style={{ backgroundColor: primary }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        relative overflow-hidden rounded-xl border shadow-sm cursor-pointer
        transition-all duration-200
        ${isSelected 
          ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
          : 'border-slate-700 hover:border-slate-600'
        }
      `}
      onClick={onSelect}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 bg-indigo-500 text-white rounded-full p-1.5 shadow-md">
          <Check className="h-4 w-4" />
        </div>
      )}
      
      {/* Suitability indicator */}
      {getSuitabilityLabel()}
      
      {/* Image preview */}
      <div className="relative h-40 bg-slate-900 overflow-hidden">
        {template.preview ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10" />
            <Image 
              src={template.preview} 
              alt={template.name} 
              width={300} 
              height={160} 
              className="object-cover w-full h-full"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10" />
        )}
        
        <div className="relative h-full w-full">
          {!template.preview && renderMockPreview()}
          
          <div className="absolute left-3 bottom-3 z-20">
            <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-slate-700 text-xs font-medium text-white">
              {template.name} Template
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 bg-slate-800">
        <h3 className="font-medium text-white mb-1 flex items-center">
          <span 
            className="inline-block w-2 h-2 rounded-full mr-2" 
            style={{ backgroundColor: template.colors?.primary || '#4f46e5' }}
          ></span>
          {template.name}
        </h3>
        <p className="text-sm text-slate-400 mb-3 line-clamp-2">
          {template.description}
        </p>
        
        {/* Features */}
        <div className="space-y-1 mb-4">
          {(template.features || []).slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-xs text-slate-300">
              <div 
                className="w-1.5 h-1.5 rounded-full mr-2"
                style={{ backgroundColor: template.colors?.accent || '#4f46e5' }}
              ></div>
              {feature}
            </div>
          ))}
        </div>
        
        {/* Color swatches */}
        <div className="flex space-x-2">
          {Object.values(template.colors || {}).slice(0, 4).map((color, index) => (
            <div 
              key={index}
              className="w-6 h-6 rounded-full border border-slate-600"
              style={{ backgroundColor: color || '#4f46e5' }}
              title={`Template color ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 