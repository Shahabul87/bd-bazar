// Store template definitions
// These templates define the visual styles and behavior for different store types

export const storeTemplates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, modern design with focus on product images",
    features: [
      "Spacious layout",
      "Minimalist navigation",
      "Product-focused design",
      "Subtle animations",
      "Fast loading"
    ],
    colors: {
      primary: "#4f46e5",
      secondary: "#a5b4fc",
      background: "#ffffff",
      text: "#111827",
      accent: "#f9fafb"
    },
    typography: {
      headingFont: "Inter",
      bodyFont: "Inter",
      baseFontSize: 16,
      headingWeight: "medium",
      bodyWeight: "normal"
    },
    layout: {
      heroStyle: "centered",
      productGridLayout: "grid-3x3",
      roundedCorners: "medium",
      spacing: "comfortable",
      navStyle: "simple"
    },
    suitableFor: [
      "Luxury products",
      "Fashion",
      "Jewelry",
      "Home decor",
      "Photography"
    ],
    preview: "/images/templates/minimal-preview.jpg"
  },
  {
    id: "boutique",
    name: "Boutique",
    description: "Elegant, sophisticated design for premium brands",
    features: [
      "Stylish typography",
      "Elegant spacing",
      "Curated product presentation",
      "Editorial-style layout",
      "Premium feel"
    ],
    colors: {
      primary: "#8b5cf6",
      secondary: "#c4b5fd",
      background: "#f8f9fa",
      text: "#1f2937",
      accent: "#ede9fe"
    },
    typography: {
      headingFont: "Playfair Display",
      bodyFont: "Lato",
      baseFontSize: 16,
      headingWeight: "bold",
      bodyWeight: "normal"
    },
    layout: {
      heroStyle: "full-width",
      productGridLayout: "grid-2x2",
      roundedCorners: "none",
      spacing: "spacious",
      navStyle: "elegant"
    },
    suitableFor: [
      "Fashion boutiques",
      "Handcrafted goods",
      "Limited collections",
      "Beauty products",
      "Artisanal food"
    ],
    preview: "/images/templates/boutique-preview.jpg"
  },
  {
    id: "vibrant",
    name: "Vibrant",
    description: "Bold, colorful design for creative brands",
    features: [
      "Dynamic layout",
      "Vibrant color accents",
      "Bold typography",
      "Eye-catching components",
      "Creative elements"
    ],
    colors: {
      primary: "#ec4899",
      secondary: "#f472b6",
      background: "#fafafa",
      text: "#111827",
      accent: "#fce7f3"
    },
    typography: {
      headingFont: "Montserrat",
      bodyFont: "Roboto",
      baseFontSize: 16,
      headingWeight: "bold",
      bodyWeight: "normal"
    },
    layout: {
      heroStyle: "dynamic",
      productGridLayout: "grid-3x3",
      roundedCorners: "none",
      spacing: "compact",
      navStyle: "creative"
    },
    suitableFor: [
      "Creative businesses",
      "Art supplies",
      "Children's products",
      "Stationery",
      "Gift shops"
    ],
    preview: "/images/templates/vibrant-preview.jpg"
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern dark mode design for tech and electronics",
    features: [
      "Dark mode by default",
      "Sleek component design",
      "Tech-focused layout",
      "Specifications-friendly",
      "Modern UI elements"
    ],
    colors: {
      primary: "#06b6d4",
      secondary: "#22d3ee",
      background: "#111827",
      text: "#f9fafb",
      accent: "#164e63"
    },
    typography: {
      headingFont: "SF Pro Display",
      bodyFont: "SF Pro Text",
      baseFontSize: 16,
      headingWeight: "semibold",
      bodyWeight: "normal"
    },
    layout: {
      heroStyle: "split",
      productGridLayout: "grid-4x4",
      roundedCorners: "large",
      spacing: "compact",
      navStyle: "modern"
    },
    suitableFor: [
      "Electronics",
      "Software",
      "Gadgets",
      "Digital products",
      "Gaming equipment"
    ],
    preview: "/images/templates/tech-preview.jpg"
  },
  {
    id: "artisan",
    name: "Artisan",
    description: "Warm, organic design for handmade and natural products",
    features: [
      "Warm color palette",
      "Rustic elements",
      "Organic spacing",
      "Story-focused layout",
      "Handcrafted feel"
    ],
    colors: {
      primary: "#d97706",
      secondary: "#f59e0b",
      background: "#fffbeb",
      text: "#422006",
      accent: "#fef3c7"
    },
    typography: {
      headingFont: "Merriweather",
      bodyFont: "Source Sans Pro",
      baseFontSize: 16,
      headingWeight: "bold",
      bodyWeight: "normal"
    },
    layout: {
      heroStyle: "story",
      productGridLayout: "grid-2x2",
      roundedCorners: "small",
      spacing: "relaxed",
      navStyle: "simple"
    },
    suitableFor: [
      "Handmade products",
      "Natural cosmetics",
      "Sustainable goods",
      "Organic food",
      "Craft supplies"
    ],
    preview: "/images/templates/artisan-preview.jpg"
  }
];

// Helper functions to work with templates
export function getTemplateById(id: string) {
  return storeTemplates.find(template => template.id === id) || storeTemplates[0];
}

export function getRecommendedTemplateForType(storeType: string) {
  const typeMap: Record<string, string> = {
    "electronics": "tech",
    "gadgets": "tech",
    "software": "tech",
    "fashion": "boutique",
    "clothing": "boutique",
    "jewelry": "minimal",
    "handmade": "artisan",
    "crafts": "artisan",
    "art": "vibrant",
    "toys": "vibrant",
    "gifts": "vibrant",
    "home": "minimal",
    "furniture": "minimal",
    "beauty": "boutique",
    "food": "artisan",
    "organic": "artisan"
  };
  
  const normalizedType = storeType.toLowerCase().trim();
  const templateId = typeMap[normalizedType] || "minimal";
  
  return getTemplateById(templateId);
}

export function getAllTemplateIds() {
  return storeTemplates.map(template => template.id);
}

export function getTemplateSuitabilityScore(templateId: string, storeType: string) {
  const template = getTemplateById(templateId);
  const normalizedType = storeType.toLowerCase().trim();
  
  // Check if the store type is explicitly listed in the template's suitableFor array
  if (template.suitableFor.some(type => type.toLowerCase().includes(normalizedType))) {
    return 100;
  }
  
  // Otherwise, return the recommended template based on type
  const recommendedTemplate = getRecommendedTemplateForType(storeType);
  return recommendedTemplate.id === templateId ? 80 : 50;
} 