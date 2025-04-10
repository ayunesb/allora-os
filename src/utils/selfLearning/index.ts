
/**
 * Self-Learning Engine
 * Main entry point for the self-learning functionality
 */

// Re-export all functionality from the self-learning modules
export * from './types';
export * from './trackingService';
export * from './recommendationService';
export * from './preferencesService';
export * from './analyticsService';

// We're no longer using the internal comment since we're now properly exporting analyticsService
