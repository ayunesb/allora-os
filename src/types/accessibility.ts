
export interface AccessibilityContextType {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: number;
  textToSpeech: boolean;
  setHighContrast: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setFontSize: (value: number) => void;
  setTextToSpeech: (value: boolean) => void;
  updatePreference?: (key: string, value: any) => void;
}
