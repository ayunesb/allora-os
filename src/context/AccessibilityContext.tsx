
import React, { createContext, useState, useContext, useEffect } from 'react';
import { applyAccessibilityClasses as applyClasses } from '@/utils/accessibilityHelpers';

export type AccessibilityPreferences = {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  enhancedFocus: boolean;
  screenReaderFriendly: boolean;
  improvedTextSpacing: boolean;
};

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreference: <K extends keyof AccessibilityPreferences>(
    key: K, 
    value: AccessibilityPreferences[K]
  ) => void;
  resetPreferences: () => void;
  applyAccessibilityClasses: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  enhancedFocus: false,
  screenReaderFriendly: false,
  improvedTextSpacing: false,
};

const AccessibilityContext = createContext<AccessibilityContextType>({
  preferences: defaultPreferences,
  updatePreference: () => {},
  resetPreferences: () => {},
  applyAccessibilityClasses: () => {},
});

export const AccessibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    const savedPrefs = typeof window !== 'undefined' 
      ? localStorage.getItem('accessibility-preferences') 
      : null;
    return savedPrefs ? JSON.parse(savedPrefs) : defaultPreferences;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
    }
    
    // Apply classes to body element
    applyClasses(preferences);
    
  }, [preferences]);

  const updatePreference = <K extends keyof AccessibilityPreferences>(
    key: K, 
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };
  
  const applyAccessibilityClasses = () => {
    applyClasses(preferences);
  };

  return (
    <AccessibilityContext.Provider value={{ 
      preferences, 
      updatePreference, 
      resetPreferences,
      applyAccessibilityClasses
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
