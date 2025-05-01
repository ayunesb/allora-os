
export interface AccessibilityContextType {
  preferences: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
    screenReaderFriendly: boolean;
    [key: string]: any;
  };
  updatePreference: (key: string, value: any) => void;
  applyAccessibilityClasses: () => void;
  fontSize: number;
  setFontSize: (v: number) => void;
  checkForUpdates?: () => void;
  setAutoUpdate?: (enabled: boolean) => void;
  isCheckingUpdates?: boolean;
  lastChecked?: string;
}
