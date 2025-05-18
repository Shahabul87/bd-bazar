import { TypographySettings as OriginalTypographySettings } from "./typography-settings";

type TypographyType = {
  headingFont: string;
  bodyFont: string;
  baseFontSize: number;
  lineHeight: number;
  fontWeights: {
    heading: string;
    body: string;
  };
};

interface TypographySettingsProps {
  typography: TypographyType;
  onChange: (typography: TypographyType) => void;
}

export function TypographySettings({ typography, onChange }: TypographySettingsProps) {
  // Assume the original component has props like:
  // headingFont, bodyFont, onHeadingFontChange, onBodyFontChange, etc.
  
  return (
    <OriginalTypographySettings
      typography={typography}
      onChange={onChange}
    />
  );
} 