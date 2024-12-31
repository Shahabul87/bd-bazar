"use client"

import { SpecificationsForm } from "../../_components/specifications-form"

interface ProductTechnicalDetailsProps {
  specifications: any;
  value: {
    dimensions: { length: string; width: string; height: string; unit: string };
    weight: { value: string; unit: string };
    selectedSizes: string[];
    color: string;
    material: string;
    assemblyRequired: boolean;
    warranty: string;
    technicalSpecs: string;
    productCare: string;
    includedComponents: string;
  };
  onChange: (specs: any) => void;
  sizeOptions: string[];
  productId: string;
}

export const ProductTechnicalDetails = ({
  specifications,
  value,
  onChange,
  sizeOptions,
  productId
}: ProductTechnicalDetailsProps) => {
  if (!specifications) return null;

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Technical Details</h2>
          <p className="text-sm text-gray-400">Specify the technical specifications of your product</p>
        </div>
      </div>

      <SpecificationsForm
        specifications={specifications}
        value={value}
        onChange={onChange}
        sizeOptions={sizeOptions}
      />
    </div>
  );
}; 