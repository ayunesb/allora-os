
/**
 * Type definitions for the accessibility system
 */

export interface AccessibilityContextType {
  screenReaderFriendly?: boolean;
  highContrast?: boolean;
  reducedMotion?: boolean;
  largeText?: boolean;
  fontSize?: number;
}

// Extended accessibility context with additional properties
export interface ExtendedAccessibilityContextType extends AccessibilityContextType {
  screenReaderFriendly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  invertColors: boolean;
  fontSize: number;
  setFontSize: (size: number) => void;
  toggleScreenReaderFriendly: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  toggleInvertColors: () => void;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
  autoUpdate: boolean;
  updatePreference: (key: string, value: any) => void;
}
