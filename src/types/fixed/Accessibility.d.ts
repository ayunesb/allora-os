export interface ExtendedAccessibilityContextType {
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
}
