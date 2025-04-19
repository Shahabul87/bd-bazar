interface ProductDimensionsProps {
  dimensions: Record<string, any> | null | undefined;
}

export const ProductDimensions = ({ dimensions }: ProductDimensionsProps) => {
  if (!dimensions) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Dimensions</h3>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(dimensions).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">{key}</span>
            <span className="text-white">{value as string}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 