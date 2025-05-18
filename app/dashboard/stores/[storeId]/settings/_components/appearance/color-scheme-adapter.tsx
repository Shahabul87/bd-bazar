import { ColorSchemeSettings as OriginalColorSchemeSettings } from "./color-scheme-settings";

type ColorSchemeType = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  mode: "light" | "dark" | "auto";
};

interface ColorSchemeSettingsProps {
  colorScheme: ColorSchemeType;
  onChange: (colorScheme: ColorSchemeType) => void;
}

export function ColorSchemeSettings({ colorScheme, onChange }: ColorSchemeSettingsProps) {
  return (
    <OriginalColorSchemeSettings
      colorScheme={colorScheme}
      onChange={onChange}
    />
  );
} 