export interface CategoryOption {
  id: string;
  label: string;
  parent?: string;
  children?: CategoryOption[];
  sizeOptions?: string[];
}

export const categoryStructure: CategoryOption[] = [
  {
    id: "furniture",
    label: "Furniture",
    children: [
      {
        id: "bedroom",
        label: "Bedroom",
        parent: "furniture",
        children: [
          {
            id: "beds",
            label: "Beds",
            parent: "bedroom",
            sizeOptions: ["Twin", "Full", "Queen", "King", "California King"]
          },
          {
            id: "mattresses",
            label: "Mattresses",
            parent: "bedroom",
            sizeOptions: ["Twin", "Full", "Queen", "King", "California King"]
          }
        ]
      },
      {
        id: "living-room",
        label: "Living Room",
        parent: "furniture",
        children: [
          {
            id: "sofas",
            label: "Sofas",
            parent: "living-room",
            sizeOptions: ["2-Seater", "3-Seater", "4-Seater", "Sectional"]
          }
        ]
      }
    ]
  },
  {
    id: "clothing",
    label: "Clothing",
    children: [
      {
        id: "mens",
        label: "Men's",
        parent: "clothing",
        children: [
          {
            id: "mens-shirts",
            label: "Shirts",
            parent: "mens",
            sizeOptions: ["XS", "S", "M", "L", "XL", "XXL"]
          },
          {
            id: "mens-pants",
            label: "Pants",
            parent: "mens",
            sizeOptions: ["28", "30", "32", "34", "36", "38", "40"]
          }
        ]
      },
      {
        id: "womens",
        label: "Women's",
        parent: "clothing",
        children: [
          {
            id: "womens-dresses",
            label: "Dresses",
            parent: "womens",
            sizeOptions: ["XS", "S", "M", "L", "XL"]
          }
        ]
      }
    ]
  }
]; 

export interface TechnicalDetails {
  size: string;
  material: string;
  color: string;
  includedComponents: string;
  productCare: string;
  assemblyRequired: boolean;
  manufacturer: string;
  itemWeight: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

export interface AdditionalInformation {
  asin: string;
  customerReviews: {
    rating: number;
    count: number;
  };
  bestSellersRank: {
    rank: number;
    category: string;
    subRank?: {
      rank: number;
      category: string;
    }[];
  }[];
  dateFirstAvailable: string;
}

export interface WarrantySupport {
  warrantyInfo: string;
  supportInfo: string;
} 