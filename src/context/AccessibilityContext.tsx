
import React, { createContext, useContext, useState, useEffect } from 'react';
import { applyAccessibilityClasses as applyClasses } from '@/utils/accessibilityHelpers';

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

// Export the context so it can be imported elsewhere
export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  // Initialize preferences from localStorage if available
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    if (typeof window === 'undefined') return {}; // Server-side rendering check
    
    const savedPrefs = localStorage.getItem('accessibility-preferences');
    return savedPrefs ? JSON.parse(savedPrefs) : {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      enhancedFocus: false,
      screenReaderFriendly: false,
      improvedTextSpacing: false,
      invertColors: false,
    };
  });
  
  const [fontSize, setFontSize] = useState<number>(16);

  // Update preferences with new values
  const updatePreferences = (newPrefs: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPrefs };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessibility-preferences', JSON.stringify(updated));
      }
      
      return updated;
    });
  };

  // Apply classes based on current preferences
  const applyAccessibilityClasses = () => {
    applyClasses(preferences);
  };

  // Apply preferences when they change
  useEffect(() => {
    applyAccessibilityClasses();
  }, [preferences]);

  // Individual toggle functions
  const toggleHighContrast = () => updatePreferences({ highContrast: !preferences.highContrast });
  const toggleLargeText = () => updatePreferences({ largeText: !preferences.largeText });
  const toggleReducedMotion = () => updatePreferences({ reducedMotion: !preferences.reducedMotion });
  const toggleEnhancedFocus = () => updatePreferences({ enhancedFocus: !preferences.enhancedFocus });
  const toggleScreenReaderFriendly = () => updatePreferences({ screenReaderFriendly: !preferences.screenReaderFriendly });
  const toggleImprovedTextSpacing = () => updatePreferences({ improvedTextSpacing: !preferences.improvedTextSpacing });
  const toggleInvertColors = () => updatePreferences({ invertColors: !preferences.invertColors });
  
  // Reset all preferences
  const resetPreferences = () => updatePreferences({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    enhancedFocus: false,
    screenReaderFriendly: false,
    improvedTextSpacing: false,
    invertColors: false,
  });
  
  // Compatibility with older code - alias updatePreferences as updatePreference
  const updatePreference = (key: string, value: any) => {
    updatePreferences({ [key]: value });
  };
  
  // Mock implementation for checkForUpdates
  const checkForUpdates = () => {
    console.log('Checking for accessibility updates');
  };
  
  // Mock implementation for setAutoUpdate
  const setAutoUpdate = (value: boolean) => {
    console.log('Setting auto-update to', value);
  };

  const value: AccessibilityContextType = {
    preferences,
    updatePreferences,
    applyAccessibilityClasses,
    highContrast: preferences.highContrast || false,
    largeText: preferences.largeText || false,
    reducedMotion: preferences.reducedMotion || false,
    enhancedFocus: preferences.enhancedFocus || false,
    screenReaderFriendly: preferences.screenReaderFriendly || false,
    improvedTextSpacing: preferences.improvedTextSpacing || false,
    invertColors: preferences.invertColors || false,
    fontSize,
    setFontSize,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleEnhancedFocus,
    toggleScreenReaderFriendly,
    toggleImprovedTextSpacing,
    toggleInvertColors,
    resetPreferences,
    // Compatibility properties
    updatePreference,
    checkForUpdates,
    setAutoUpdate,
    isCheckingUpdates: false,
    lastChecked: null,
    autoUpdate: false,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
