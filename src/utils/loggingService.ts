/**
 * Centralized logging service for consistent logging across the application
 * Enhanced with better structured logs and monitoring capabilities
 */

// Configure environment-based logging levels
const ENV = process.env.NODE_ENV || 'development';
const LOG_LEVEL = ENV === 'production' ? 'info' : 'debug';

// Log levels in order of severity
const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  none: 4 // For completely disabling logs
};

// Enhanced metadata types
interface LogMetadata {
  [key: string]: any;
  
  // Optional common fields
  userId?: string;
  requestId?: string;
  component?: string;
  tags?: string[];
  duration?: number; // For performance logs
}

// Get current log level from local storage or use default
const getCurrentLogLevel = (): keyof typeof LOG_LEVELS => {
  if (typeof window !== 'undefined') {
    const savedLevel = localStorage.getItem('log_level');
    if (savedLevel && savedLevel in LOG_LEVELS) {
      return savedLevel as keyof typeof LOG_LEVELS;
    }
  }
  return LOG_LEVEL as keyof typeof LOG_LEVELS;
};

// Allow runtime log level changes
export const setLogLevel = (level: keyof typeof LOG_LEVELS): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('log_level', level);
  }
};

// Get the current log level
export const getLogLevel = (): keyof typeof LOG_LEVELS => {
  return getCurrentLogLevel();
};

// Determine if a message should be logged based on configured level
const shouldLog = (level: keyof typeof LOG_LEVELS): boolean => {
  const currentLevel = getCurrentLogLevel();
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
};

// Format log metadata as a string for console output
const formatMetadata = (meta?: LogMetadata): string => {
  if (!meta) return '';
  try {
    return JSON.stringify(meta, null, 2);
  } catch (e) {
    return `[Unserializable metadata: ${Object.keys(meta).join(', ')}]`;
  }
};

// Generate a unique request ID for grouping related logs
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
};

// Keep track of the current request ID
let currentRequestId: string | null = null;

// Set the current request ID for a series of related logs
export const setRequestContext = (requestId?: string): string => {
  currentRequestId = requestId || generateRequestId();
  return currentRequestId;
};

// Clear the current request context
export const clearRequestContext = (): void => {
  currentRequestId = null;
};

// Format date for logging
const formatDate = (): string => {
  return new Date().toISOString();
};

// Add monitoring integration - in a real app, this would send logs to a service
const sendToMonitoring = (
  level: keyof typeof LOG_LEVELS,
  message: string,
  meta?: LogMetadata,
  error?: any
): void => {
  // This is a placeholder for real monitoring service integration
  // In a production app, you would send logs to Sentry, LogRocket, etc.
  if (ENV === 'production' && level === 'error') {
    // Example integration with window.onerror
    if (typeof window !== 'undefined' && error) {
      console.error('Would send to monitoring service:', {
        level,
        message,
        meta,
        error,
        timestamp: formatDate()
      });
      
      // In production, you would integrate with a real service like:
      // Sentry.captureException(error, { extra: meta });
    }
  }
};

// Create the enhanced logger object with methods for each log level
export const logger = {
  debug: (message: string, meta?: LogMetadata): void => {
    if (!shouldLog('debug')) return;
    
    const enrichedMeta = {
      ...meta,
      requestId: meta?.requestId || currentRequestId || undefined,
      timestamp: formatDate()
    };
    
    console.debug(`🔍 DEBUG: ${message}`, meta ? formatMetadata(enrichedMeta) : '');
  },

  info: (message: string, meta?: LogMetadata): void => {
    if (!shouldLog('info')) return;
    
    const enrichedMeta = {
      ...meta,
      requestId: meta?.requestId || currentRequestId || undefined,
      timestamp: formatDate()
    };
    
    console.info(`ℹ️ INFO: ${message}`, meta ? formatMetadata(enrichedMeta) : '');
  },

  warn: (message: string, meta?: LogMetadata): void => {
    if (!shouldLog('warn')) return;
    
    const enrichedMeta = {
      ...meta,
      requestId: meta?.requestId || currentRequestId || undefined,
      timestamp: formatDate()
    };
    
    console.warn(`⚠️ WARNING: ${message}`, meta ? formatMetadata(enrichedMeta) : '');
    
    // Send warnings to monitoring in production
    if (ENV === 'production') {
      sendToMonitoring('warn', message, enrichedMeta);
    }
  },

  error: (message: string, error?: any, meta?: LogMetadata): void => {
    if (!shouldLog('error')) return;
    
    const enrichedMeta = {
      ...meta,
      requestId: meta?.requestId || currentRequestId || undefined,
      timestamp: formatDate(),
      stack: error?.stack
    };
    
    console.error(`❌ ERROR: ${message}`, error, meta ? formatMetadata(enrichedMeta) : '');
    
    // Send errors to monitoring service
    sendToMonitoring('error', message, enrichedMeta, error);
  },

  // Track elapsed time for performance monitoring
  time: (label: string, meta?: Omit<LogMetadata, 'duration'>): (() => number) => {
    if (!shouldLog('debug')) return () => 0;
    
    const start = performance.now();
    const timeRequestId = currentRequestId || generateRequestId();
    
    // Use optional chaining to safely access logger.debug
    logger?.debug(`⏱️ TIMER START: ${label}`, {
      ...meta,
      requestId: timeRequestId,
      timerLabel: label,
      action: 'timer_start'
    });
    
    return () => {
      const duration = performance.now() - start;
      
      // Use optional chaining to safely access logger.debug
      logger?.debug(`⏱️ TIMER END: ${label} completed in ${duration.toFixed(2)}ms`, {
        ...meta,
        requestId: timeRequestId,
        timerLabel: label,
        duration,
        action: 'timer_end'
      });
      
      return duration;
    };
  },
  
  // Group related logs
  group: (groupName: string, fn: () => void): void => {
    if (!shouldLog('debug')) {
      fn();
      return;
    }
    
    const groupRequestId = currentRequestId || generateRequestId();
    const prevRequestId = currentRequestId;
    currentRequestId = groupRequestId;
    
    console.group(`📑 ${groupName} [${groupRequestId}]`);
    try {
      fn();
    } finally {
      console.groupEnd();
      currentRequestId = prevRequestId;
    }
  },
  
  // Create a child logger with predefined metadata
  createChildLogger: (defaultMeta: LogMetadata) => {
    return {
      debug: (message: string, meta?: LogMetadata) => 
        logger.debug(message, { ...defaultMeta, ...meta }),
      
      info: (message: string, meta?: LogMetadata) => 
        logger.info(message, { ...defaultMeta, ...meta }),
      
      warn: (message: string, meta?: LogMetadata) => 
        logger.warn(message, { ...defaultMeta, ...meta }),
      
      error: (message: string, error?: any, meta?: LogMetadata) => 
        logger.error(message, error, { ...defaultMeta, ...meta }),
      
      time: (label: string, meta?: Omit<LogMetadata, 'duration'>) => 
        logger.time(label, { ...defaultMeta, ...meta })
    };
  }
};

// Export a request-scoped logger for components that need it
export const useRequestLogger = (componentName: string, extraMeta?: Omit<LogMetadata, 'component'>) => {
  // In a real app, you might use a React context for this
  return logger.createChildLogger({
    component: componentName,
    ...extraMeta,
    requestId: currentRequestId || undefined
  });
};
