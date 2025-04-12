
/**
 * Centralized logging service for consistent logging across the application
 */

// Configure environment-based logging levels
const ENV = process.env.NODE_ENV || 'development';
const LOG_LEVEL = ENV === 'production' ? 'error' : 'debug';

// Log levels in order of severity
const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Determine if a message should be logged based on configured level
const shouldLog = (level: keyof typeof LOG_LEVELS) => {
  return LOG_LEVELS[level] >= LOG_LEVELS[LOG_LEVEL as keyof typeof LOG_LEVELS];
};

// Format log metadata as a string for console output
const formatMetadata = (meta?: Record<string, any>): string => {
  if (!meta) return '';
  try {
    return JSON.stringify(meta, null, 2);
  } catch (e) {
    return `[Unserializable metadata: ${Object.keys(meta).join(', ')}]`;
  }
};

// Create the logger object with methods for each log level
export const logger = {
  debug: (message: string, meta?: Record<string, any>) => {
    if (!shouldLog('debug')) return;
    console.debug(`🔍 DEBUG: ${message}`, meta ? formatMetadata(meta) : '');
  },

  info: (message: string, meta?: Record<string, any>) => {
    if (!shouldLog('info')) return;
    console.info(`ℹ️ INFO: ${message}`, meta ? formatMetadata(meta) : '');
  },

  warn: (message: string, meta?: Record<string, any>) => {
    if (!shouldLog('warn')) return;
    console.warn(`⚠️ WARNING: ${message}`, meta ? formatMetadata(meta) : '');
  },

  error: (message: string, error?: any, meta?: Record<string, any>) => {
    if (!shouldLog('error')) return;
    console.error(`❌ ERROR: ${message}`, error, meta ? formatMetadata(meta) : '');

    // In a real app, you might also send errors to a monitoring service here
    // e.g., Sentry.captureException(error, { extra: meta });
  },

  // Track elapsed time for performance monitoring
  time: (label: string) => {
    if (!shouldLog('debug')) return () => {};
    
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      console.debug(`⏱️ TIMER: ${label} completed in ${duration.toFixed(2)}ms`);
      return duration;
    };
  }
};
