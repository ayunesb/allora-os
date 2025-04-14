
import { logger } from '@/utils/loggingService';

// Define allowed event types for type safety
export type AnalyticsEventType = 
  | 'page_view'
  | 'feature_interaction'
  | 'login'
  | 'signup'
  | 'strategy_view'
  | 'strategy_created'
  | 'executive_consultation'
  | 'lead_management'
  | 'campaign_action'
  | 'settings_changed'
  | 'api_error'
  | 'subscription_event';

interface AnalyticsEvent {
  type: AnalyticsEventType;
  properties?: Record<string, any>;
  timestamp?: number;
}

// Track if analytics are initialized
let analyticsInitialized = false;

/**
 * Initialize analytics services based on user consent
 */
export function initializeAnalytics(): boolean {
  try {
    // Check for analytics consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      logger.info('Analytics not initialized: No cookie consent found');
      return false;
    }
    
    const cookieSettings = JSON.parse(consent);
    if (!cookieSettings.analytics) {
      logger.info('Analytics not initialized: User declined analytics cookies');
      return false;
    }
    
    // In a production app, you would initialize actual analytics services here
    // such as Google Analytics, Segment, Mixpanel, etc.
    logger.info('Analytics initialized successfully');
    analyticsInitialized = true;
    
    // Track initial page view
    trackEvent({
      type: 'page_view',
      properties: {
        path: window.location.pathname,
        title: document.title
      }
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to initialize analytics:', error);
    return false;
  }
}

/**
 * Track an analytics event
 */
export function trackEvent(event: AnalyticsEvent): void {
  // Skip if analytics are not initialized
  if (!analyticsInitialized) {
    return;
  }
  
  try {
    const eventToTrack = {
      ...event,
      timestamp: event.timestamp || Date.now()
    };
    
    // In a production app, you would send this to your analytics service
    logger.debug('Analytics event tracked:', eventToTrack);
    
    // Dispatch custom event for testing and debugging
    window.dispatchEvent(new CustomEvent('analytics-event', {
      detail: eventToTrack
    }));
  } catch (error) {
    logger.warn('Failed to track analytics event:', error);
  }
}

/**
 * Track page views automatically
 */
export function setupPageViewTracking(): void {
  if (!analyticsInitialized) return;
  
  // Use the History API to track navigation changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    handleLocationChange();
  };
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    handleLocationChange();
  };
  
  window.addEventListener('popstate', handleLocationChange);
  
  // Initial page load
  handleLocationChange();
  
  function handleLocationChange() {
    const path = window.location.pathname + window.location.search;
    
    trackEvent({
      type: 'page_view',
      properties: {
        path,
        title: document.title,
        referrer: document.referrer
      }
    });
  }
}

/**
 * Get analytics consent status
 */
export function getAnalyticsConsent(): boolean {
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    const cookieSettings = JSON.parse(consent);
    return cookieSettings.analytics === true;
  } catch (error) {
    return false;
  }
}

/**
 * Reset analytics - useful when user revokes consent
 */
export function resetAnalytics(): void {
  analyticsInitialized = false;
  logger.info('Analytics tracking reset');
}
