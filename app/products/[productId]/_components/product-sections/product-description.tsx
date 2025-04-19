interface ProductDescriptionProps {
  description: string;
  descriptionPoints: string[];
}

export const ProductDescription = ({ description, descriptionPoints }: ProductDescriptionProps) => {
  if (!description) return null;
  
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">About this item</h3>
      </div>

      {descriptionPoints.length > 0 && (
        <div className="space-y-4">
          <ul className="space-y-2 list-disc list-inside text-gray-400">
            {descriptionPoints.map((point, index) => (
              <li key={index} className="leading-relaxed pl-1">
                <span className="pl-2">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}; 