
export interface AccessibilityContextType {
  highContrast?: boolean;
  reducedMotion?: boolean;
  textToSpeech?: boolean;
  screenReaderFriendly?: boolean;
  updatePreference?: (key: string, value: any) => void;
  fontSize: number;
  setFontSize: (v: number) => void;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
}
