import { LayoutSettings as OriginalLayoutSettings } from "./layout-settings";

type LayoutType = {
  displayDensity: string;
  sidebarStyle: string;
  productGridLayout: string;
  contentWidth: string;
};

interface LayoutSettingsProps {
  layout: LayoutType;
  onChange: (layout: LayoutType) => void;
}

export function LayoutSettings({ layout, onChange }: LayoutSettingsProps) {
  const { displayDensity, sidebarStyle, productGridLayout } = layout;
  
  const handleDisplayDensityChange = (density: string) => {
    onChange({
      ...layout,
      displayDensity: density
    });
  };
  
  const handleSidebarStyleChange = (style: string) => {
    onChange({
      ...layout,
      sidebarStyle: style
    });
  };
  
  const handleProductGridLayoutChange = (gridLayout: string) => {
    onChange({
      ...layout,
      productGridLayout: gridLayout
    });
  };
  
  return (
    <OriginalLayoutSettings
      displayDensity={displayDensity}
      sidebarStyle={sidebarStyle}
      productGridLayout={productGridLayout}
      onChangeDisplayDensity={handleDisplayDensityChange}
      onChangeSidebarStyle={handleSidebarStyleChange}
      onChangeProductGridLayout={handleProductGridLayoutChange}
    />
  );
} 