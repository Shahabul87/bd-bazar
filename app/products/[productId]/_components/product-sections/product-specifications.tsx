interface Specification {
  name: string;
  value: string;
}

interface ProductSpecificationsProps {
  specifications: Specification[];
}

export const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
  if (!specifications || specifications.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Specifications</h3>
      <div className="grid grid-cols-1 gap-4">
        {specifications.map((spec, index) => {
          // Destructure name and value to ensure we're using strings
          const { name, value } = spec;
          
          return (
            <div key={index} className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">{name}</span>
              <span className="text-white">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 