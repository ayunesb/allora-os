
export interface AccessibilityContextType {
  highContrast?: boolean;
  reducedMotion?: boolean;
  fontSize: number;
  textToSpeech?: boolean;
  screenReaderFriendly?: boolean;
  setFontSize: (v: number) => void;
  updatePreference?: (key: string, value: any) => void;
  // Additional properties for compliance
  checkForUpdates?: () => void;
  setAutoUpdate?: (value: boolean) => void;
  isCheckingUpdates?: boolean;
  lastChecked?: string | null;
}
