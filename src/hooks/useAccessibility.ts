
import { useState, useEffect, useCallback } from 'react';
import { ExtendedAccessibilityContextType } from '@/types/unified-types';

export function useAccessibility(): ExtendedAccessibilityContextType {
  const [fontSize, setFontSize] = useState<number>(16);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [screenReaderFriendly, setScreenReaderFriendly] = useState<boolean>(false);
  const [invertColors, setInvertColors] = useState<boolean>(false);

  // Toggle functions
  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => !prev);
  }, []);

  const toggleLargeText = useCallback(() => {
    setLargeText(prev => !prev);
    setFontSize(prev => prev === 16 ? 20 : 16);
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion(prev => !prev);
  }, []);

  const toggleScreenReaderFriendly = useCallback(() => {
    setScreenReaderFriendly(prev => !prev);
  }, []);

  const toggleInvertColors = useCallback(() => {
    setInvertColors(prev => !prev);
  }, []);

  return {
    fontSize,
    setFontSize,
    highContrast,
    reducedMotion,
    screenReaderFriendly,
    largeText,
    invertColors,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleScreenReaderFriendly,
    toggleInvertColors
  };
}
