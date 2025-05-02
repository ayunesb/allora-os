
export interface ExtendedAccessibilityContextType {
  screenReaderFriendly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  invertColors: boolean;
  fontSize: number; // Changed to number as expected by components
  setFontSize: (size: number) => void; // Changed to number as expected by components
  toggleScreenReaderFriendly: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  toggleInvertColors: () => void;
}
