import React from "react";
type AccessibilityPreferences = {
  highContrast?: boolean;
  largeText?: boolean;
  reducedMotion?: boolean;
  enhancedFocus?: boolean;
  screenReaderFriendly?: boolean;
  improvedTextSpacing?: boolean;
  invertColors?: boolean;
};
export interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (preferences: Partial<AccessibilityPreferences>) => void;
  applyAccessibilityClasses: () => void;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  enhancedFocus: boolean;
  screenReaderFriendly: boolean;
  improvedTextSpacing: boolean;
  invertColors: boolean;
  fontSize: number;
  setFontSize: (v: number) => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleEnhancedFocus: () => void;
  toggleScreenReaderFriendly: () => void;
  toggleImprovedTextSpacing: () => void;
  toggleInvertColors: () => void;
  resetPreferences: () => void;
  updatePreference?: (key: string, value: any) => void;
  checkForUpdates?: () => void;
  setAutoUpdate?: (value: boolean) => void;
  isCheckingUpdates?: boolean;
  lastChecked?: string | null;
  autoUpdate?: boolean;
}
export declare const AccessibilityContext: import("react").Context<AccessibilityContextType>;
export declare function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element;
export declare const useAccessibility: () => AccessibilityContextType;
export {};
