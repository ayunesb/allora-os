
/**
 * Applies accessibility classes based on user preferences
 */
export function applyAccessibilityClasses(preferences: {
  highContrast?: boolean;
  largeText?: boolean;
  reducedMotion?: boolean;
  enhancedFocus?: boolean;
  screenReaderFriendly?: boolean;
  improvedTextSpacing?: boolean;
}) {
  const { 
    highContrast, 
    largeText, 
    reducedMotion, 
    enhancedFocus, 
    screenReaderFriendly,
    improvedTextSpacing
  } = preferences;

  const html = document.documentElement;
  const body = document.body;

  // High contrast mode
  if (highContrast) {
    html.classList.add('high-contrast');
    body.classList.add('high-contrast');
  } else {
    html.classList.remove('high-contrast');
    body.classList.remove('high-contrast');
  }

  // Large text mode
  if (largeText) {
    html.classList.add('large-text');
    body.classList.add('large-text');
  } else {
    html.classList.remove('large-text');
    body.classList.remove('large-text');
  }

  // Reduced motion
  if (reducedMotion) {
    html.classList.add('reduced-motion');
    body.classList.add('reduced-motion');
  } else {
    html.classList.remove('reduced-motion');
    body.classList.remove('reduced-motion');
  }

  // Enhanced focus outlines
  if (enhancedFocus) {
    html.classList.add('enhanced-focus');
    body.classList.add('enhanced-focus');
  } else {
    html.classList.remove('enhanced-focus');
    body.classList.remove('enhanced-focus');
  }

  // Screen reader friendly mode
  if (screenReaderFriendly) {
    html.classList.add('screen-reader-friendly');
    body.classList.add('screen-reader-friendly');
  } else {
    html.classList.remove('screen-reader-friendly');
    body.classList.remove('screen-reader-friendly');
  }

  // Improved text spacing
  if (improvedTextSpacing) {
    html.classList.add('improved-spacing');
    body.classList.add('improved-spacing');
  } else {
    html.classList.remove('improved-spacing');
    body.classList.remove('improved-spacing');
  }
}
