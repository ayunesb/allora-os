
export interface ExtendedAccessibilityContextType {
  screenReaderFriendly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  invertColors: boolean;
  fontSize: string;
  setFontSize: (size: string) => void;
  toggleScreenReaderFriendly: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  toggleInvertColors: () => void;
}
