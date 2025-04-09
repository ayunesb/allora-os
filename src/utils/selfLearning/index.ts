
/**
 * Self-Learning Engine
 * Main entry point for the self-learning functionality
 */

// Re-export all functionality from the self-learning modules
export * from './types';
export * from './trackingService';
export * from './recommendationService';

// Internal services not directly exported to consumers
// These are used internally by the tracking service
// export * from './analyticsService';
// export * from './preferencesService';
