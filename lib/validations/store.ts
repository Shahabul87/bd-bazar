import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters").max(50, "Store name can't exceed 50 characters"),
  type: z.string().min(1, "Please select a store type"),
  businessType: z.string().min(1, "Please select a business type"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description can't exceed 500 characters"),
  imageUrl: z.string().optional(),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  fullAddress: z.string().optional().or(z.literal("")),
  division: z.string().optional().or(z.literal("")),
  district: z.string().optional().or(z.literal("")),
  thana: z.string().optional().or(z.literal("")),
  roadNo: z.string().optional().or(z.literal("")),
});

export type StoreFormValues = z.infer<typeof storeSchema>;

// Define store types
export const STORE_TYPES = [
  { id: "retail", name: "Retail Store" },
  { id: "wholesale", name: "Wholesale Business" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "digital", name: "Digital Products" },
  { id: "services", name: "Services" },
  { id: "other", name: "Other" },
];

// Define business types
export const BUSINESS_TYPES = [
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion & Apparel" },
  { id: "home", name: "Home & Garden" },
  { id: "beauty", name: "Beauty & Cosmetics" },
  { id: "food", name: "Food & Grocery" },
  { id: "general", name: "General Merchandise" },
  { id: "other", name: "Other" },
];

// Bangladesh divisions
export const BANGLADESH_DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
]; 