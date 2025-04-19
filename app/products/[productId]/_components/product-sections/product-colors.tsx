interface ProductColorsProps {
  colors: Record<string, string> | null | undefined;
}

export const ProductColors = ({ colors }: ProductColorsProps) => {
  if (!colors) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Available Colors</h3>
      <div className="flex gap-2">
        {Object.entries(colors).map(([color, value]) => (
          <div
            key={color}
            className="w-8 h-8 rounded-full border-2 border-gray-700 cursor-pointer"
            style={{ backgroundColor: value }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}; 