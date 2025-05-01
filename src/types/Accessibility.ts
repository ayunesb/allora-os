
export interface AccessibilityContextType {
  highContrast?: boolean;
  reducedMotion?: boolean;
  fontSize: number;
  textToSpeech?: boolean;
  setFontSize: (v: number) => void;
  updatePreference?: (key: string, value: any) => void;
}
