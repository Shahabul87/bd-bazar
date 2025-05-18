"use client";

import React from 'react';
import { 
  Store as StoreIcon, 
  ShoppingCart, 
  Search, 
  User, 
  Menu, 
  Star, 
  ChevronRight, 
  Mail, 
  PhoneCall
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export interface StoreTemplateProps {
  // Template and styling
  template: "minimal" | "boutique" | "vibrant" | "tech" | "artisan";
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    mode: "light" | "dark" | "auto";
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseFontSize: number;
    lineHeight: number;
    fontWeights: {
      heading: string;
      body: string;
    };
  };
  layout: {
    displayDensity: string;
    sidebarStyle: string;
    productGridLayout: string;
    contentWidth: string;
  };
  
  // Store data (can be actual or dummy)
  store: {
    name: string;
    description?: string;
    logo?: string;
    imageUrl?: string;
    type?: string;
    businessType?: string;
    contactEmail?: string;
    contactPhone?: string;
    productCount: number;
  };
  
  // Additional options
  isPreview?: boolean;
  previewDevice?: 'desktop' | 'mobile';
}

export const StoreTemplateRenderer: React.FC<StoreTemplateProps> = ({
  template,
  colorScheme,
  typography,
  layout,
  store,
  isPreview = false,
  previewDevice = 'desktop'
}) => {
  // Generate color scheme based on template and appearance settings
  const getColorScheme = () => {
    // Safe hex color handling - ensure it's a properly formatted hex color
    const safeHexColor = (color: string) => {
      if (!color || typeof color !== 'string') return '#4f46e5';
      return color.startsWith('#') ? color : `#${color}`;
    };
    
    const primaryColorHex = safeHexColor(colorScheme.primary);
    const secondaryColorHex = safeHexColor(colorScheme.secondary);
    const accentColorHex = safeHexColor(colorScheme.accent);
    
    // Define color schemes for each template
    const colorSchemes = {
      minimal: {
        gradient: `from-white to-gray-50`,
        accent: `bg-[${primaryColorHex}]`,
        text: `text-[${primaryColorHex}]`,
        light: `bg-gray-50`,
        border: `border-gray-100`,
        hover: `hover:bg-[${primaryColorHex}]/90`
      },
      boutique: {
        gradient: `from-[${secondaryColorHex}] to-[${primaryColorHex}]`,
        accent: `bg-[${primaryColorHex}]`,
        text: `text-[${primaryColorHex}]`,
        light: `bg-[${primaryColorHex}]/5`,
        border: `border-[${primaryColorHex}]/10`,
        hover: `hover:bg-[${primaryColorHex}]/90`
      },
      vibrant: {
        gradient: `from-[${primaryColorHex}] to-[${accentColorHex}]`,
        accent: `bg-[${accentColorHex}]`,
        text: `text-[${accentColorHex}]`,
        light: `bg-[${accentColorHex}]/10`,
        border: `border-[${accentColorHex}]/20`,
        hover: `hover:bg-[${accentColorHex}]/90`
      },
      tech: {
        gradient: `from-gray-800 to-gray-900`,
        accent: `bg-[${primaryColorHex}]`,
        text: `text-[${primaryColorHex}]`,
        light: `bg-[${primaryColorHex}]/10`,
        border: `border-gray-800`,
        hover: `hover:bg-[${primaryColorHex}]/90`
      },
      artisan: {
        gradient: `from-amber-50 to-amber-100`,
        accent: `bg-[${primaryColorHex}]`,
        text: `text-[${primaryColorHex}]`,
        light: `bg-amber-50`,
        border: `border-amber-100`,
        hover: `hover:bg-[${primaryColorHex}]/90`
      }
    };
    
    // Return color scheme based on template, or default
    return colorSchemes[template] || colorSchemes.minimal;
  };

  const colors = getColorScheme();
  
  // Set dynamic styling based on typography settings
  const fontStyles = {
    heading: {
      fontFamily: typography.headingFont || 'Inter, sans-serif',
      weight: typography.fontWeights.heading === 'bold' ? 'font-bold' : 
             typography.fontWeights.heading === 'semibold' ? 'font-semibold' :
             typography.fontWeights.heading === 'medium' ? 'font-medium' :
             typography.fontWeights.heading === 'light' ? 'font-light' : 'font-normal'
    },
    body: {
      fontFamily: typography.bodyFont || 'Inter, sans-serif',
      size: `text-[${typography.baseFontSize}px]`,
      weight: typography.fontWeights.body === 'bold' ? 'font-bold' : 
             typography.fontWeights.body === 'semibold' ? 'font-semibold' :
             typography.fontWeights.body === 'medium' ? 'font-medium' :
             typography.fontWeights.body === 'light' ? 'font-light' : 'font-normal'
    }
  };

  const layoutConfig = {
    productGrid: layout.productGridLayout === 'grid-2x2' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' :
                 layout.productGridLayout === 'grid-4x4' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
                 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3', // Default 3x3
    contentWidth: layout.contentWidth === 'full' ? 'max-w-full' :
                 layout.contentWidth === 'narrow' ? 'max-w-5xl' :
                 'max-w-7xl', // Default contained
    density: layout.displayDensity === 'compact' ? 'gap-3 py-6' :
            layout.displayDensity === 'spacious' ? 'gap-8 py-14' :
            'gap-6 py-10' // Default comfortable
  };

  // Template-specific classes
  const templateClasses = {
    pageBackground: 
      template === 'minimal' ? 'bg-white' : 
      template === 'tech' ? 'bg-gray-900' :
      template === 'artisan' ? 'bg-amber-50' :
      template === 'vibrant' ? 'bg-white' :
      template === 'boutique' ? 'bg-gray-50' :
      colorScheme.mode === 'dark' ? 'bg-gray-950' : 'bg-white',

    textColor: 
      template === 'tech' ? 'text-white' : 
      colorScheme.mode === 'dark' ? 'text-white' : 
      'text-gray-900'
  };

  // Set up template-specific variables
  const isDark = template === "tech";
  const isWarm = template === "artisan";
  const isVibrant = template === "vibrant";
  const isBoutique = template === "boutique";
  
  const textColor = isDark ? "text-white" : "text-gray-900";
  const textMutedColor = isDark ? "text-gray-400" : "text-gray-600";

  // Set up container classes based on preview mode
  const containerClasses = isPreview 
    ? `w-full rounded-lg ${previewDevice === 'mobile' ? 'h-[500px] max-w-[320px] mx-auto' : 'h-[400px]'} border border-slate-700 overflow-hidden shadow-xl`
    : 'min-h-screen';

  return (
    <div 
      className={`${containerClasses} ${templateClasses.pageBackground} ${colorScheme.mode === 'dark' ? 'dark' : ''}`}
      style={{ 
        fontFamily: fontStyles.body.fontFamily,
        fontSize: `${typography.baseFontSize}px`,
        lineHeight: typography.lineHeight
      }}
    >
      {/* Hero Banner */}
      <div className={`relative bg-gradient-to-r ${colors.gradient} ${isPreview ? 'h-36' : 'h-80 lg:h-96'} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className={`${layoutConfig.contentWidth} mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-center`}>
          <div className="sm:flex items-center gap-8">
            {/* Store Logo */}
            <div className={`${isPreview ? 'w-16 h-16' : 'w-24 h-24 md:w-32 md:h-32'} rounded-2xl bg-white dark:bg-gray-900 p-2 shadow-xl flex items-center justify-center mb-4 sm:mb-0`}>
              {store.logo ? (
                <Image 
                  src={store.logo} 
                  alt={store.name} 
                  width={isPreview ? 50 : 120} 
                  height={isPreview ? 50 : 120} 
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : store.imageUrl ? (
                <Image 
                  src={store.imageUrl} 
                  alt={store.name} 
                  width={isPreview ? 50 : 120} 
                  height={isPreview ? 50 : 120} 
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <StoreIcon className={`${isPreview ? 'w-8 h-8' : 'w-16 h-16'} text-gray-400`} />
              )}
            </div>
            
            {/* Store Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm mb-3">
                <span className="block w-2 h-2 rounded-full bg-green-500"></span>
                {store.type || "Retail Store"}
              </div>
              <h1 className={`${isPreview ? 'text-xl' : 'text-3xl md:text-4xl lg:text-5xl'} ${fontStyles.heading.weight} text-white mb-2`}
                  style={{ fontFamily: fontStyles.heading.fontFamily }}>
                {store.name}
              </h1>
              {!isPreview && (
                <p className="text-white/80 max-w-xl line-clamp-2">
                  {store.description || `Welcome to ${store.name}, your destination for ${store.businessType || "quality products"}.`}
                </p>
              )}
              
              {/* Stats */}
              <div className="flex gap-6 mt-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                  <span className="font-bold">{store.productCount}</span> Products
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`${isPreview ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-300 fill-yellow-300`} />
                    ))}
                  </div>
                  <span>5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 100" 
            className="w-full h-auto"
            style={{ fill: template === 'minimal' ? 'white' : 
                          template === 'tech' ? '#111827' : 
                          template === 'artisan' ? '#fffbeb' : 
                          template === 'vibrant' ? 'white' :
                          template === 'boutique' ? '#f9fafb' :
                          colorScheme.mode === 'dark' ? '#111827' : 'white' }}
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
          </svg>
        </div>
      </div>

      {/* Store Content */}
      <div className={`${layoutConfig.contentWidth} mx-auto px-4 sm:px-6 lg:px-8 ${isPreview ? 'gap-2 py-4' : layoutConfig.density}`}>
        {/* Products Grid Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 
              className={`font-semibold ${isBoutique ? "italic" : ""} ${isVibrant ? "uppercase text-xs tracking-wider" : ""} ${templateClasses.textColor}`}
              style={{ 
                borderBottom: isVibrant ? `2px solid ${colorScheme.primary}` : undefined,
                display: isVibrant ? "inline-block" : undefined,
                paddingBottom: isVibrant ? "2px" : undefined
              }}
            >
              Featured Products
            </h2>
            <ChevronRight size={16} style={{ color: colorScheme.primary }} />
          </div>
          
          <div className={`grid ${isPreview ? (previewDevice === 'mobile' ? 'grid-cols-2' : 'grid-cols-3') : layoutConfig.productGrid} gap-4`}>
            {[...Array(isPreview ? (previewDevice === 'mobile' ? 4 : 6) : 6)].map((_, i) => (
              <div 
                key={i} 
                className={`${templateClasses.pageBackground} rounded-md overflow-hidden border ${colors.border} ${isVibrant ? "rounded-none" : isDark ? "rounded-lg" : ""}`}
                style={isBoutique ? {
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                } : {}}
              >
                <div 
                  className="aspect-square mb-2 bg-gray-100" 
                >
                  {isPreview ? null : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <p className="text-gray-400">Product Image</p>
                    </div>
                  )}
                  
                  {isVibrant && (
                    <div 
                      className="absolute top-0 right-0 text-[8px] uppercase tracking-wider font-bold px-1 py-0.5"
                      style={{backgroundColor: i % 2 === 0 ? colorScheme.primary : colorScheme.secondary, color: 'white'}}
                    >
                      New
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div 
                        className={`text-sm font-medium ${isBoutique ? "italic" : ""} ${isVibrant ? "uppercase text-xs tracking-wider" : ""} ${templateClasses.textColor}`}
                      >
                        Product Name
                      </div>
                      <div 
                        className={`text-sm ${isBoutique ? "italic" : ""} ${colors.text}`}
                      >
                        $99.99
                      </div>
                    </div>
                    <ShoppingCart size={14} className={colors.text} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Section (for non-preview only) */}
        {!isPreview && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-8">
            <div className={`${colorScheme.mode === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-md p-6 ${colorScheme.mode === 'dark' ? 'border-gray-800' : 'border-gray-100'} border`}>
              <h3 className={`text-lg ${fontStyles.heading.weight} ${templateClasses.textColor} mb-4`}
                  style={{ fontFamily: fontStyles.heading.fontFamily }}>
                Contact Information
              </h3>
              <div className="space-y-4">
                {store.contactEmail && (
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${colors.light} flex items-center justify-center flex-shrink-0`}>
                      <Mail className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <a href={`mailto:${store.contactEmail}`} className={`${templateClasses.textColor} hover:underline`}>
                        {store.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
                {store.contactPhone && (
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${colors.light} flex items-center justify-center flex-shrink-0`}>
                      <PhoneCall className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <a href={`tel:${store.contactPhone}`} className={`${templateClasses.textColor} hover:underline`}>
                        {store.contactPhone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 