
import { useContext } from 'react';
import { AccessibilityContext } from '@/context/AccessibilityContext';
import { ExtendedAccessibilityContextType } from '@/types/unified-types';

export const useAccessibility = (): ExtendedAccessibilityContextType => {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }

  // Provide default implementations for missing functions
  const extendedContext: ExtendedAccessibilityContextType = {
    ...context,
    // Add missing properties with default implementations
    screenReaderFriendly: context.screenReaderFriendly || false,
    highContrast: context.highContrast || false,
    reducedMotion: context.reducedMotion || false,
    largeText: context.largeText || false,
    invertColors: context.invertColors || false,
    fontSize: context.fontSize || 16,
    setFontSize: context.setFontSize || ((v: number) => console.warn('setFontSize not implemented', v)),
    toggleScreenReader: context.toggleScreenReader || (() => console.warn('toggleScreenReader not implemented')),
    toggleHighContrast: context.toggleHighContrast || (() => console.warn('toggleHighContrast not implemented')),
    toggleReducedMotion: context.toggleReducedMotion || (() => console.warn('toggleReducedMotion not implemented')),
    toggleLargeText: context.toggleLargeText || (() => console.warn('toggleLargeText not implemented')),
    toggleInvertColors: context.toggleInvertColors || (() => console.warn('toggleInvertColors not implemented')),
    checkForUpdates: context.checkForUpdates || (() => console.warn('checkForUpdates not implemented')),
    setAutoUpdate: context.setAutoUpdate || ((v: boolean) => console.warn('setAutoUpdate not implemented', v)),
    isCheckingUpdates: context.isCheckingUpdates || false,
    lastChecked: context.lastChecked || null,
    autoUpdate: context.autoUpdate || false,
    updatePreference: context.updatePreference || ((key: string, value: any) => console.warn('updatePreference not implemented', key, value))
  };

  return extendedContext;
};
