
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  // High contrast mode
  highContrast: boolean;
  toggleHighContrast: () => void;
  
  // Font size controls
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  
  // Motion reduction
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  
  // Screen reader optimizations
  screenReaderFriendly: boolean;
  toggleScreenReaderFriendly: () => void;
  
  // Large text mode (simpler toggle than fontSize)
  largeText: boolean;
  toggleLargeText: () => void;
  
  // Focus indicator enhancement
  enhancedFocus: boolean;
  toggleEnhancedFocus: () => void;
  
  // Keyboard navigation
  keyboardFocusVisible: boolean;
  
  // Text spacing for dyslexia
  improvedTextSpacing: boolean;
  toggleImprovedTextSpacing: () => void;
  
  // Apply all accessibility features to document
  applyAccessibilityClasses: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  // Load settings from localStorage or use defaults
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('accessibility-high-contrast');
    return saved === 'true';
  });
  
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>(() => {
    const saved = localStorage.getItem('accessibility-font-size');
    return (saved as 'small' | 'medium' | 'large') || 'medium';
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem('accessibility-reduced-motion');
    return saved === 'true';
  });
  
  const [screenReaderFriendly, setScreenReaderFriendly] = useState(() => {
    const saved = localStorage.getItem('accessibility-screen-reader');
    return saved !== 'false'; // Default to true
  });
  
  const [largeText, setLargeText] = useState(() => {
    const saved = localStorage.getItem('accessibility-large-text');
    return saved === 'true';
  });
  
  const [enhancedFocus, setEnhancedFocus] = useState(() => {
    const saved = localStorage.getItem('accessibility-enhanced-focus');
    return saved === 'true';
  });
  
  const [keyboardFocusVisible, setKeyboardFocusVisible] = useState(false);
  
  const [improvedTextSpacing, setImprovedTextSpacing] = useState(() => {
    const saved = localStorage.getItem('accessibility-text-spacing');
    return saved === 'true';
  });

  // Toggle functions
  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const newValue = !prev;
      localStorage.setItem('accessibility-high-contrast', String(newValue));
      return newValue;
    });
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => {
      const newValue = !prev;
      localStorage.setItem('accessibility-reduced-motion', String(newValue));
      return newValue;
    });
  };

  const toggleScreenReaderFriendly = () => {
    setScreenReaderFriendly(prev => {
      const newValue = !prev;
      localStorage.setItem('accessibility-screen-reader', String(newValue));
      return newValue;
    });
  };

  const toggleLargeText = () => {
    setLargeText(prev => {
      const newValue = !prev;
      localStorage.setItem('accessibility-large-text', String(newValue));
      return newValue;
    });
  };

  const toggleEnhancedFocus = () => {
    setEnhancedFocus(prev => {
      const newValue = !prev;
      localStorage.setItem('accessibility-enhanced-focus', String(newValue));
      return newValue;
    });
  };

  const toggleImprovedTextSpacing = () => {
    setImprovedTextSpacing(prev => {
      const newValue = !prev;
      localStorage.setItem('accessibility-text-spacing', String(newValue));
      return newValue;
    });
  };

  // Detect keyboard navigation
  useEffect(() => {
    const handleKeyDown = () => setKeyboardFocusVisible(true);
    const handleMouseDown = () => setKeyboardFocusVisible(false);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Apply CSS classes based on accessibility settings
  const applyAccessibilityClasses = () => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // High contrast mode
    if (highContrast) {
      bodyElement.classList.add('high-contrast');
    } else {
      bodyElement.classList.remove('high-contrast');
    }
    
    // Large text
    if (largeText) {
      bodyElement.classList.add('large-text');
    } else {
      bodyElement.classList.remove('large-text');
    }
    
    // Reduced motion
    if (reducedMotion) {
      bodyElement.classList.add('reduced-motion');
    } else {
      bodyElement.classList.remove('reduced-motion');
    }
    
    // Screen reader optimizations
    if (screenReaderFriendly) {
      bodyElement.classList.add('screen-reader-friendly');
    } else {
      bodyElement.classList.remove('screen-reader-friendly');
    }
    
    // Enhanced focus indicators
    if (enhancedFocus || keyboardFocusVisible) {
      bodyElement.classList.add('enhanced-focus');
    } else {
      bodyElement.classList.remove('enhanced-focus');
    }
    
    // Improved text spacing
    if (improvedTextSpacing) {
      bodyElement.classList.add('improved-text-spacing');
    } else {
      bodyElement.classList.remove('improved-text-spacing');
    }
    
    // Font size adjustments
    bodyElement.classList.remove('text-size-small', 'text-size-medium', 'text-size-large');
    bodyElement.classList.add(`text-size-${fontSize}`);
  };
  
  // Apply accessibility classes whenever settings change
  useEffect(() => {
    applyAccessibilityClasses();
  }, [
    highContrast, 
    fontSize, 
    reducedMotion, 
    screenReaderFriendly, 
    largeText, 
    enhancedFocus, 
    keyboardFocusVisible,
    improvedTextSpacing
  ]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        reducedMotion,
        toggleReducedMotion,
        screenReaderFriendly,
        toggleScreenReaderFriendly,
        largeText,
        toggleLargeText,
        enhancedFocus,
        toggleEnhancedFocus,
        keyboardFocusVisible,
        improvedTextSpacing,
        toggleImprovedTextSpacing,
        applyAccessibilityClasses
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
