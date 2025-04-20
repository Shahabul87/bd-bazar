"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, Save, ArrowLeft, Sparkles, Building, Mail, MapPin, ChevronDown } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define store types
const STORE_TYPES = [
  { id: "retail", name: "Retail Store" },
  { id: "ecommerce", name: "E-Commerce" },
  { id: "hybrid", name: "Hybrid" },
  { id: "service", name: "Service Provider" },
];

// Define business types
const BUSINESS_TYPES = [
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion & Apparel" },
  { id: "food", name: "Food & Grocery" },
  { id: "health", name: "Health & Beauty" },
  { id: "home", name: "Home & Furniture" },
  { id: "books", name: "Books & Stationery" },
  { id: "other", name: "Other" },
];

// Define Bangladesh divisions
const BANGLADESH_DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh"
];

// Create a schema for store form validation
const storeSchema = z.object({
  name: z.string().min(2, "Store name must be at least 2 characters"),
  type: z.string().min(1, "Please select a store type"),
  businessType: z.string().min(1, "Please select a business category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().optional(),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  fullAddress: z.string().optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  thana: z.string().optional(),
  roadNo: z.string().optional(),
});

type StoreFormValues = z.infer<typeof storeSchema>;

interface StoreFormProps {
  storeId: string;
  preferredLanguage?: string;
}

// Simple custom select component to avoid Radix UI issues
function SimpleSelect({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder, 
  error 
}: { 
  label: string, 
  value: string, 
  onChange: (value: string) => void, 
  options: {id: string, name: string}[] | string[], 
  placeholder: string,
  error?: string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get display name
  const getDisplayName = () => {
    if (!value) return placeholder;
    
    if (typeof options[0] === 'string') {
      return value;
    } else {
      const option = (options as {id: string, name: string}[]).find(opt => opt.id === value);
      return option ? option.name : placeholder;
    }
  };

  return (
    <div ref={selectRef} className="relative">
      <div 
        className={`bg-white/5 border ${error ? "border-red-400" : "border-white/10"} rounded-md p-2 flex justify-between items-center cursor-pointer text-white`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-white/60"}>
          {getDisplayName()}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-white/10 rounded-md shadow-lg max-h-60 overflow-auto">
          {Array.isArray(options) && options.map((option, index) => {
            const optionValue = typeof option === 'string' ? option : option.id;
            const optionName = typeof option === 'string' ? option : option.name;
            
            return (
              <div
                key={index}
                className={`p-2 hover:bg-slate-700 cursor-pointer ${optionValue === value ? 'bg-indigo-600' : ''}`}
                onClick={() => {
                  onChange(optionValue);
                  setIsOpen(false);
                }}
              >
                {optionName}
              </div>
            );
          })}
        </div>
      )}
      
      {error && <p className="text-pink-400 text-sm mt-1">{error}</p>}
    </div>
  );
}

// Custom hook for fetching store data
function useStoreData(storeId: string, errorMessage: string) {
  const [isFetching, setIsFetching] = useState(true);
  const [storeData, setStoreData] = useState<any>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchStore = async () => {
      try {
        // First, check if we have this store in localStorage
        let data = null;
        
        try {
          // Try to get data from localStorage first
          const storedStores = localStorage.getItem('createdStores');
          if (storedStores) {
            const stores = JSON.parse(storedStores);
            if (stores[storeId]) {
              data = stores[storeId];
              console.log("Found store in localStorage:", data);
            }
          }
        } catch (storageError) {
          console.error("Error reading from localStorage:", storageError);
          // Continue to API call if localStorage fails
        }
        
        // If not in localStorage, fetch from API
        if (!data) {
          const response = await axios.get(`/api/stores/${storeId}`);
          data = response.data;
          console.log("Fetched store from API:", data);
        }
        
        // Update state if component is still mounted
        if (isMounted) {
          setStoreData(data);
          setIsFetching(false);
        }
      } catch (error) {
        console.error("Error fetching store:", error);
        if (isMounted) {
          toast.error(errorMessage);
          setIsFetching(false);
        }
      }
    };

    fetchStore();
    
    return () => {
      isMounted = false;
    };
  }, [storeId, errorMessage]); // These dependencies are stable primitives
  
  return { isFetching, storeData };
}

export function StoreForm({ storeId, preferredLanguage = 'en' }: StoreFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Text content translations
  const translations = {
    en: {
      basicInfo: "Basic Information",
      contactLocation: "Contact & Location",
      contactInfo: "Contact Info",
      address: "Address",
      storeName: "Store Name",
      storeType: "Store Type",
      businessCategory: "Business Category",
      storeDescription: "Store Description",
      storeLogoUrl: "Store Logo URL",
      logoPlaceholder: "Paste image URL (e.g., https://example.com/logo.png)",
      logoHelper: "Enter a URL for your store logo. Leave blank to use the default logo.",
      storeEmail: "Store Email",
      emailPlaceholder: "store@example.com",
      emailHelper: "The email where customers can contact you.",
      phoneNumber: "Store Phone Number",
      phonePlaceholder: "+880 1XXX-XXXXXX",
      phoneHelper: "A phone number for customer inquiries.",
      fullAddress: "Full Address",
      addressPlaceholder: "Street address",
      division: "Division",
      district: "District",
      districtPlaceholder: "District",
      thana: "Thana/Upazilla",
      thanaPlaceholder: "Thana/Upazilla",
      roadNo: "Road No./Area",
      roadNoPlaceholder: "Road No./Area",
      selectType: "Select store type",
      selectCategory: "Select business category",
      selectDivision: "Select division",
      backToStores: "Back to Stores",
      saving: "Saving...",
      saveChanges: "Save Changes",
      loadingError: "Failed to load store details",
      updateSuccess: "Store details updated successfully!",
      updateError: "Failed to update store. Please try again."
    },
    bn: {
      basicInfo: "মৌলিক তথ্য",
      contactLocation: "যোগাযোগ এবং অবস্থান",
      contactInfo: "যোগাযোগের তথ্য",
      address: "ঠিকানা",
      storeName: "স্টোরের নাম",
      storeType: "স্টোরের ধরন",
      businessCategory: "ব্যবসার বিভাগ",
      storeDescription: "স্টোরের বিবরণ",
      storeLogoUrl: "স্টোরের লোগো URL",
      logoPlaceholder: "ইমেজ URL পেস্ট করুন (উদাহরণ: https://example.com/logo.png)",
      logoHelper: "আপনার স্টোরের লোগোর জন্য একটি URL দিন। ডিফল্ট লোগো ব্যবহার করতে খালি রাখুন।",
      storeEmail: "স্টোরের ইমেইল",
      emailPlaceholder: "store@example.com",
      emailHelper: "গ্রাহকরা যেখানে আপনার সাথে যোগাযোগ করতে পারবেন।",
      phoneNumber: "স্টোরের ফোন নম্বর",
      phonePlaceholder: "+880 1XXX-XXXXXX",
      phoneHelper: "গ্রাহক অনুসন্ধানের জন্য একটি ফোন নম্বর।",
      fullAddress: "সম্পূর্ণ ঠিকানা",
      addressPlaceholder: "সড়কের ঠিকানা",
      division: "বিভাগ",
      district: "জেলা",
      districtPlaceholder: "জেলা",
      thana: "থানা/উপজেলা",
      thanaPlaceholder: "থানা/উপজেলা",
      roadNo: "রোড নং/এলাকা",
      roadNoPlaceholder: "রোড নং/এলাকা",
      selectType: "স্টোরের ধরন নির্বাচন করুন",
      selectCategory: "ব্যবসার বিভাগ নির্বাচন করুন",
      selectDivision: "বিভাগ নির্বাচন করুন",
      backToStores: "স্টোরগুলিতে ফিরে যান",
      saving: "সংরক্ষণ করা হচ্ছে...",
      saveChanges: "পরিবর্তনগুলি সংরক্ষণ করুন",
      loadingError: "স্টোরের বিবরণ লোড করতে ব্যর্থ হয়েছে",
      updateSuccess: "স্টোরের বিবরণ সফলভাবে আপডেট করা হয়েছে!",
      updateError: "আপডেট করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
    }
  };

  // Use the preferred language
  const t = translations[preferredLanguage as 'en' | 'bn'];
  
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      type: "",
      businessType: "",
      description: "",
      imageUrl: "",
      email: "",
      phone: "",
      fullAddress: "",
      division: "",
      district: "",
      thana: "",
      roadNo: "",
    }
  });

  const { register, handleSubmit, formState: { errors, isDirty }, setValue, watch, reset } = form;
  
  // Fetch store data using custom hook
  const { isFetching, storeData } = useStoreData(storeId, t.loadingError);
  
  // Set form values when store data is loaded
  useEffect(() => {
    if (storeData && !isFetching) {
      Object.entries(storeData).forEach(([key, value]) => {
        // @ts-ignore - dynamically setting form values
        setValue(key as any, value as any);
      });
    }
  }, [storeData, isFetching, setValue]);

  const onSubmit = async (data: StoreFormValues) => {
    try {
      setIsLoading(true);
      
      // In a real app, you would update via API:
      // const response = await axios.patch(`/api/stores/${storeId}`, data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update localStorage with new values
      try {
        const storedStores = localStorage.getItem('createdStores');
        if (storedStores) {
          const stores = JSON.parse(storedStores);
          if (stores[storeId]) {
            // Update with new data
            stores[storeId] = {
              ...stores[storeId],
              ...data,
              lastUpdated: new Date()
            };
            localStorage.setItem('createdStores', JSON.stringify(stores));
            console.log("Updated store in localStorage:", stores[storeId]);
          }
        }
      } catch (storageError) {
        console.error("Error updating localStorage:", storageError);
        // Continue even if localStorage fails
      }
      
      toast.success(t.updateSuccess);
      router.refresh();
    } catch (error: any) {
      console.error("Error updating store:", error);
      toast.error(error?.response?.data?.error || t.updateError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/stores");
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-purple-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-2 border-l-2 border-blue-500 animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full border-t-2 border-l-2 border-indigo-500 animate-spin-slower"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-300" />
              <h3 className="text-lg font-medium">{t.basicInfo}</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">{t.storeName} <span className="text-pink-400">*</span></Label>
                <Input
                  id="name"
                  placeholder={preferredLanguage === 'en' ? "Enter your store name" : "আপনার স্টোরের নাম লিখুন"}
                  {...register("name")}
                  className={`bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500 transition-all ${errors.name ? "border-red-400" : ""}`}
                />
                {errors.name && (
                  <p className="text-pink-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-white/90">{t.storeType} <span className="text-pink-400">*</span></Label>
                  <SimpleSelect 
                    label={t.storeType}
                    value={watch("type")}
                    onChange={(value) => setValue("type", value)}
                    options={STORE_TYPES}
                    placeholder={t.selectType}
                    error={errors.type?.message}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-white/90">{t.businessCategory} <span className="text-pink-400">*</span></Label>
                  <SimpleSelect 
                    label={t.businessCategory}
                    value={watch("businessType")}
                    onChange={(value) => setValue("businessType", value)}
                    options={BUSINESS_TYPES}
                    placeholder={t.selectCategory}
                    error={errors.businessType?.message}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white/90">{t.storeDescription} <span className="text-pink-400">*</span></Label>
                <Textarea
                  id="description"
                  placeholder={preferredLanguage === 'en' ? "Describe your store and what you sell" : "আপনার স্টোর এবং আপনি কী বিক্রি করেন তা বর্ণনা করুন"}
                  rows={4}
                  {...register("description")}
                  className={`bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500 ${errors.description ? "border-red-400" : ""}`}
                />
                {errors.description && (
                  <p className="text-pink-400 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-white/90">{t.storeLogoUrl}</Label>
                <Input
                  id="imageUrl"
                  placeholder={t.logoPlaceholder}
                  {...register("imageUrl")}
                  className="bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="text-xs text-white/60">{t.logoHelper}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-blue-300" />
              <h3 className="text-lg font-medium">{t.contactLocation}</h3>
            </div>
            <div className="p-6">
              <Tabs 
                defaultValue={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 rounded-lg p-1 mb-5">
                  <TabsTrigger 
                    value="general" 
                    className={`${activeTab === 'general' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'text-white/70'} rounded-md`}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {t.contactInfo}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="address" 
                    className={`${activeTab === 'address' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'text-white/70'} rounded-md`}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {t.address}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">{t.storeEmail}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      {...register("email")}
                      className={`bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500 ${errors.email ? "border-red-400" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-pink-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                    <p className="text-xs text-white/60">{t.emailHelper}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white/90">{t.phoneNumber}</Label>
                    <Input
                      id="phone"
                      placeholder={t.phonePlaceholder}
                      {...register("phone")}
                      className="bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-white/60">{t.phoneHelper}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="address" className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullAddress" className="text-white/90">{t.fullAddress}</Label>
                    <Textarea
                      id="fullAddress"
                      placeholder={t.addressPlaceholder}
                      {...register("fullAddress")}
                      className="bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="division" className="text-white/90">{t.division}</Label>
                      <SimpleSelect 
                        label={t.division}
                        value={watch("division")}
                        onChange={(value) => setValue("division", value)}
                        options={BANGLADESH_DIVISIONS}
                        placeholder={t.selectDivision}
                        error={errors.division?.message}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-white/90">{t.district}</Label>
                      <Input
                        id="district"
                        placeholder={t.districtPlaceholder}
                        {...register("district")}
                        className="bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="thana" className="text-white/90">{t.thana}</Label>
                      <Input
                        id="thana"
                        placeholder={t.thanaPlaceholder}
                        {...register("thana")}
                        className="bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="roadNo" className="text-white/90">{t.roadNo}</Label>
                      <Input
                        id="roadNo"
                        placeholder={t.roadNoPlaceholder}
                        {...register("roadNo")}
                        className="bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex items-center border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToStores}
            </Button>
            
            <Button 
              type="submit" 
              disabled={isLoading || !isDirty} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.saving}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t.saveChanges}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 