
import { AccessibilityPreferences } from '@/context/AccessibilityContext';

/**
 * Applies accessibility classes to the document body based on user preferences
 * @param preferences The user's accessibility preferences
 */
export function applyAccessibilityClasses(preferences: AccessibilityPreferences) {
  if (!preferences) {
    console.warn('No accessibility preferences provided');
    return;
  }

  const classList = document.body.classList;
  
  // Apply or remove classes based on preferences
  toggleClass(classList, 'high-contrast', preferences.highContrast);
  toggleClass(classList, 'large-text', preferences.largeText);
  toggleClass(classList, 'reduced-motion', preferences.reducedMotion);
  toggleClass(classList, 'enhanced-focus', preferences.enhancedFocus);
  toggleClass(classList, 'screen-reader-friendly', preferences.screenReaderFriendly);
  toggleClass(classList, 'improved-text-spacing', preferences.improvedTextSpacing);
}

/**
 * Helper function to toggle a class on an element
 */
function toggleClass(classList: DOMTokenList, className: string, shouldAdd: boolean) {
  if (shouldAdd) {
    classList.add(className);
  } else {
    classList.remove(className);
  }
}
