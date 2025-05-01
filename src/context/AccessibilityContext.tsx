
import React, { createContext, useState, useContext, useEffect } from 'react';

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
    const classList = document.body.classList;
    
    if (preferences.highContrast) classList.add('high-contrast');
    else classList.remove('high-contrast');
    
    if (preferences.largeText) classList.add('large-text');
    else classList.remove('large-text');
    
    if (preferences.reducedMotion) classList.add('reduced-motion');
    else classList.remove('reduced-motion');
    
    if (preferences.enhancedFocus) classList.add('enhanced-focus');
    else classList.remove('enhanced-focus');
    
    if (preferences.screenReaderFriendly) classList.add('screen-reader-friendly');
    else classList.remove('screen-reader-friendly');
    
    if (preferences.improvedTextSpacing) classList.add('improved-text-spacing');
    else classList.remove('improved-text-spacing');

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

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreference, resetPreferences }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
