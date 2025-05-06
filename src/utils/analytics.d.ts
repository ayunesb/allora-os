/**
 * Initialize analytics tracking
 */
export declare function initializeAnalytics(): boolean;
/**
 * Track a user action
 */
export declare function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number,
): void;
