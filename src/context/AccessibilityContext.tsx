
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  largeText: boolean;
  toggleLargeText: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  screenReaderFriendly: boolean;
  toggleScreenReaderFriendly: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [highContrast, setHighContrast] = useState(() => {
    try {
      return localStorage.getItem('accessibility-high-contrast') === 'true';
    } catch {
      return false;
    }
  });

  const [largeText, setLargeText] = useState(() => {
    try {
      return localStorage.getItem('accessibility-large-text') === 'true';
    } catch {
      return false;
    }
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    try {
      // Also check system preference
      const systemPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return localStorage.getItem('accessibility-reduced-motion') === 'true' || systemPreference;
    } catch {
      return false;
    }
  });

  const [screenReaderFriendly, setScreenReaderFriendly] = useState(() => {
    try {
      return localStorage.getItem('accessibility-screen-reader') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('accessibility-high-contrast', highContrast.toString());
      if (highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    } catch (e) {
      console.error('Failed to save high contrast setting', e);
    }
  }, [highContrast]);

  useEffect(() => {
    try {
      localStorage.setItem('accessibility-large-text', largeText.toString());
      if (largeText) {
        document.documentElement.classList.add('large-text');
      } else {
        document.documentElement.classList.remove('large-text');
      }
    } catch (e) {
      console.error('Failed to save large text setting', e);
    }
  }, [largeText]);

  useEffect(() => {
    try {
      localStorage.setItem('accessibility-reduced-motion', reducedMotion.toString());
      if (reducedMotion) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
    } catch (e) {
      console.error('Failed to save reduced motion setting', e);
    }
  }, [reducedMotion]);

  useEffect(() => {
    try {
      localStorage.setItem('accessibility-screen-reader', screenReaderFriendly.toString());
      if (screenReaderFriendly) {
        document.documentElement.classList.add('screen-reader-friendly');
      } else {
        document.documentElement.classList.remove('screen-reader-friendly');
      }
    } catch (e) {
      console.error('Failed to save screen reader setting', e);
    }
  }, [screenReaderFriendly]);

  // Listen for system preference changes to reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      setReducedMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleLargeText = () => setLargeText(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);
  const toggleScreenReaderFriendly = () => setScreenReaderFriendly(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      toggleHighContrast,
      largeText,
      toggleLargeText,
      reducedMotion,
      toggleReducedMotion,
      screenReaderFriendly,
      toggleScreenReaderFriendly
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
