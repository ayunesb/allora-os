/**
 * Apply accessibility classes to the document based on user preferences
 */
export declare function applyAccessibilityClasses(preferences?: {
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
    enhancedFocus?: boolean;
    screenReaderFriendly?: boolean;
    improvedTextSpacing?: boolean;
}): void;
/**
 * Announce a message to screen readers
 */
export declare function announceToScreenReader(message: string, assertive?: boolean): void;
/**
 * Create a keyboard accessible function that activates on Enter and Space
 */
export declare function makeKeyboardAccessible(callback: () => void): (event: React.KeyboardEvent) => void;
/**
 * Focus an element with proper management for screen readers
 */
export declare function focusElement(elementId: string, preventScroll?: boolean): void;
