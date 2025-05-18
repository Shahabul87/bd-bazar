import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { Metadata } from "next"
import { StoreTemplateRenderer } from "@/components/store-templates/template-renderer"
import Link from "next/link"

// Define interfaces for appearance settings
interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  mode: "light" | "dark" | "auto";
}

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

interface Layout {
  displayDensity: string;
  sidebarStyle: string;
  productGridLayout: string;
  contentWidth: string;
}

interface AppearanceSettings {
  colorScheme: ColorScheme;
  typography: Typography;
  layout: Layout;
  template: "minimal" | "boutique" | "vibrant" | "tech" | "artisan" | string;
}

// Default appearance settings
const defaultAppearanceSettings: AppearanceSettings = {
  colorScheme: {
    primary: "#4f46e5",
    secondary: "#8b5cf6",
    accent: "#ec4899",
    background: "#ffffff",
    text: "#374151",
    mode: "light"
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    baseFontSize: 16,
    lineHeight: 1.5,
    fontWeights: {
      heading: "bold",
      body: "normal"
    }
  },
  layout: {
    displayDensity: "comfortable",
    sidebarStyle: "expanded",
    productGridLayout: "grid-3x3",
    contentWidth: "contained"
  },
  template: "minimal"
};

interface StorePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { slug } = await params;

  const store = await db.store.findFirst({
    where: { 
      name: {
        equals: slug.replace(/-/g, " "),
        mode: "insensitive"
      }
    }
  })

  if (!store) {
    return {
      title: "Store Not Found",
      description: "The store you're looking for doesn't exist"
    }
  }

  return {
    title: `${store.name} | Bazar E-Commerce`,
    description: store.description || `Shop at ${store.name}`,
    openGraph: {
      title: store.name,
      description: store.description || `Shop at ${store.name}`,
      type: "website",
      siteName: "Bazar E-Commerce"
    }
  }
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;

  // Find store by slug or normalize name
  const store = await db.store.findFirst({
    where: { 
      OR: [
        { name: { equals: slug.replace(/-/g, " "), mode: "insensitive" } },
        { name: { equals: slug, mode: "insensitive" } },
        { slug: { equals: slug, mode: "insensitive" } }
      ]
    },
    include: {
      products: {
        include: {
          images: true,
          categories: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      user: {
        select: {
          name: true,
          image: true
        }
      },
      _count: {
        select: {
          products: true
        }
      }
    }
  })

  if (!store) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Store not found</h1>
          <p className="text-gray-600 dark:text-gray-400">The store you're looking for doesn't exist.</p>
          <Link href="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
            Return to home
          </Link>
        </div>
      </div>
    )
  }
  
  // Convert Decimal fields to numbers for serialization to client components
  const serializedStore = {
    ...store,
    totalRevenue: store.totalRevenue ? parseFloat(store.totalRevenue.toString()) : 0,
  };
  
  // Parse appearance settings if they exist
  let appearanceSettings: AppearanceSettings = defaultAppearanceSettings;
  
  if (serializedStore.appearanceSettings) {
    try {
      console.log("Raw appearance settings:", serializedStore.appearanceSettings);
      const parsedSettings = JSON.parse(serializedStore.appearanceSettings);
      console.log("Parsed appearance settings:", parsedSettings);
      
      // Validate template value
      if (parsedSettings.template) {
        // Make sure the template is one of our valid options
        const validTemplates = ["minimal", "boutique", "vibrant", "tech", "artisan"];
        if (!validTemplates.includes(parsedSettings.template)) {
          console.warn(`Invalid template value: ${parsedSettings.template}. Using default.`);
          parsedSettings.template = "minimal";
        }
      }
      
      appearanceSettings = {
        ...defaultAppearanceSettings,
        ...parsedSettings
      };
      
      console.log("Final appearance settings:", appearanceSettings);
    } catch (error) {
      console.error("Error parsing appearance settings:", error);
      // Keep default settings if parsing fails
    }
  }
  
  // Extract settings from the appearance settings
  const { colorScheme, typography, layout, template } = appearanceSettings;

  // Prepare the store data for the template renderer
  const storeData = {
    name: store.name,
    description: store.description || undefined,
    logo: store.logo || undefined,
    imageUrl: store.imageUrl || undefined,
    type: store.type || undefined,
    businessType: store.businessType || undefined,
    contactEmail: store.contactEmail || undefined, 
    contactPhone: store.contactPhone || undefined,
    productCount: store._count.products
  };

  // Log information for debugging
  console.log("Current template:", template);
  
  // Render the store using the shared template renderer
  return (
    <StoreTemplateRenderer
      template={template as "minimal" | "boutique" | "vibrant" | "tech" | "artisan"}
      colorScheme={colorScheme}
      typography={typography}
      layout={layout}
      store={storeData}
      isPreview={false}
    />
  )
}