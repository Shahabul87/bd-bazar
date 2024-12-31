export interface CategoryOption {
  id: string;
  label: string;
  parent?: string;
  children?: CategoryOption[];
  specifications?: {
    dimensions?: boolean;
    weight?: boolean;
    size?: boolean;
    color?: boolean;
    material?: boolean;
    assemblyRequired?: boolean;
    warranty?: boolean;
    technicalSpecs?: boolean;
    sizeChart?: boolean;
    powerRequirements?: boolean;
    compatibility?: boolean;
    ageGroup?: boolean;
    gender?: boolean;
    season?: boolean;
  };
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
        children: [
          {
            id: "beds",
            label: "Beds",
            specifications: {
              dimensions: true,
              weight: true,
              material: true,
              color: true,
              assemblyRequired: true,
              warranty: true
            },
            sizeOptions: ["Twin", "Full", "Queen", "King", "California King"]
          },
          {
            id: "mattresses",
            label: "Mattresses",
            specifications: {
              dimensions: true,
              weight: true,
              material: true,
              warranty: true
            },
            sizeOptions: ["Twin", "Full", "Queen", "King", "California King"]
          },
          {
            id: "wardrobes",
            label: "Wardrobes",
            specifications: {
              dimensions: true,
              material: true,
              color: true,
              assemblyRequired: true
            }
          }
        ]
      },
      {
        id: "living-room",
        label: "Living Room",
        children: [
          {
            id: "sofas",
            label: "Sofas",
            specifications: {
              dimensions: true,
              material: true,
              color: true,
              assemblyRequired: true
            },
            sizeOptions: ["2-Seater", "3-Seater", "4-Seater", "Sectional"]
          },
          {
            id: "tables",
            label: "Tables",
            specifications: {
              dimensions: true,
              material: true,
              color: true,
              assemblyRequired: true
            }
          }
        ]
      }
    ]
  },
  {
    id: "electronics",
    label: "Electronics",
    children: [
      {
        id: "computers",
        label: "Computers",
        children: [
          {
            id: "laptops",
            label: "Laptops",
            specifications: {
              dimensions: true,
              weight: true,
              technicalSpecs: true,
              warranty: true,
              powerRequirements: true,
              compatibility: true
            }
          },
          {
            id: "desktops",
            label: "Desktops",
            specifications: {
              dimensions: true,
              technicalSpecs: true,
              warranty: true,
              powerRequirements: true
            }
          }
        ]
      },
      {
        id: "phones",
        label: "Phones & Tablets",
        children: [
          {
            id: "smartphones",
            label: "Smartphones",
            specifications: {
              dimensions: true,
              weight: true,
              technicalSpecs: true,
              warranty: true,
              compatibility: true
            }
          },
          {
            id: "tablets",
            label: "Tablets",
            specifications: {
              dimensions: true,
              weight: true,
              technicalSpecs: true,
              warranty: true,
              compatibility: true
            }
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
        children: [
          {
            id: "mens-shirts",
            label: "Shirts",
            specifications: {
              size: true,
              color: true,
              material: true,
              sizeChart: true,
              gender: true
            },
            sizeOptions: ["XS", "S", "M", "L", "XL", "XXL"]
          },
          {
            id: "mens-pants",
            label: "Pants",
            specifications: {
              size: true,
              color: true,
              material: true,
              sizeChart: true,
              gender: true
            },
            sizeOptions: ["28", "30", "32", "34", "36", "38", "40"]
          }
        ]
      },
      {
        id: "womens",
        label: "Women's",
        children: [
          {
            id: "womens-dresses",
            label: "Dresses",
            specifications: {
              size: true,
              color: true,
              material: true,
              sizeChart: true,
              gender: true,
              season: true
            },
            sizeOptions: ["XS", "S", "M", "L", "XL"]
          },
          {
            id: "womens-shoes",
            label: "Shoes",
            specifications: {
              size: true,
              color: true,
              material: true,
              sizeChart: true,
              gender: true
            },
            sizeOptions: ["5", "6", "7", "8", "9", "10"]
          }
        ]
      }
    ]
  }
]; 