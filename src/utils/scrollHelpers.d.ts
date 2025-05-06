/**
 * Smoothly scrolls an element to the bottom
 */
export declare function scrollToBottom(element: HTMLElement): void;
/**
 * Checks if an element is near the bottom
 */
export declare function isNearBottom(
  element: HTMLElement,
  threshold?: number,
): boolean;
/**
 * Force toggles production mode in the local environment
 * This is used for testing and development purposes only
 */
export declare function toggleProductionMode(force?: boolean): void;
