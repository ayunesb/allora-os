
export interface AccessibilityContextType {
  fontSize: number;
  setFontSize: (v: number) => void;
  updatePreference?: (key: string, value: any) => void;
  checkForUpdates?: () => void;
  isCheckingUpdates?: boolean;
  lastChecked?: string;
  setAutoUpdate?: (enabled: boolean) => void;
  highContrast?: boolean;
  reducedMotion?: boolean;
  textToSpeech?: boolean;
  screenReaderFriendly?: boolean;
}
