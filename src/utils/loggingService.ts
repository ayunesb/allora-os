
import { FEATURES, PERFORMANCE_CONFIG } from '@/config/appConfig';

// Log levels enum
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  CRITICAL = 'critical',
  PERF = 'performance'
}

// Interface for structured log entries
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  user?: string;
  sessionId?: string;
  url?: string;
  component?: string;
}

// In a production app, this might send logs to a service like Sentry, LogRocket, etc.
const sendToExternalService = (entry: LogEntry) => {
  // This would be implemented to send to your logging service
  if (typeof window !== 'undefined' && window.console) {
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(entry);
        break;
      case LogLevel.INFO:
        console.info(entry);
        break;
      case LogLevel.WARN:
        console.warn(entry);
        break;
      case LogLevel.ERROR:
      case LogLevel.CRITICAL:
        console.error(entry);
        break;
      case LogLevel.PERF:
        console.info(`[PERF] ${entry.message}`, entry.context);
        break;
    }
  }
};

// Generate a session ID for grouping logs
const generateSessionId = () => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('log_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('log_session_id', sessionId);
  }
  return sessionId;
};

// Get current URL for context
const getCurrentUrl = () => {
  if (typeof window === 'undefined') return '';
  return window.location.href;
};

// In-memory store for recent logs (useful for development and debugging)
let recentLogs: LogEntry[] = [];
const MAX_LOGS = 100;

// Core logging function
const logMessage = (
  level: LogLevel,
  message: string,
  context?: Record<string, any>,
  user?: string,
  component?: string
) => {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    user,
    sessionId: generateSessionId(),
    url: getCurrentUrl(),
    component
  };

  // Add to in-memory store
  recentLogs.unshift(entry);
  if (recentLogs.length > MAX_LOGS) {
    recentLogs.pop();
  }

  // Send to external service if we're in production or detailed logging is enabled
  if (process.env.NODE_ENV === 'production' || FEATURES.enableDetailedLogging) {
    sendToExternalService(entry);
  }

  return entry;
};

// Performance monitoring for long tasks
if (typeof window !== 'undefined' && PERFORMANCE_CONFIG.logLongTasks) {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > PERFORMANCE_CONFIG.longTaskThreshold) {
            logger.perf(
              `Long task detected: ${entry.duration.toFixed(2)}ms`, 
              { entryType: entry.entryType, name: entry.name, duration: entry.duration }
            );
          }
        });
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('Performance observer error:', e);
    }
  }
}

// Exported logger functions
export const logger = {
  debug: (message: string, context?: Record<string, any>, user?: string, component?: string) => 
    logMessage(LogLevel.DEBUG, message, context, user, component),
    
  info: (message: string, context?: Record<string, any>, user?: string, component?: string) => 
    logMessage(LogLevel.INFO, message, context, user, component),
    
  warn: (message: string, context?: Record<string, any>, user?: string, component?: string) => 
    logMessage(LogLevel.WARN, message, context, user, component),
    
  error: (message: string, context?: Record<string, any>, user?: string, component?: string) => 
    logMessage(LogLevel.ERROR, message, context, user, component),
    
  critical: (message: string, context?: Record<string, any>, user?: string, component?: string) => 
    logMessage(LogLevel.CRITICAL, message, context, user, component),
    
  perf: (message: string, context?: Record<string, any>, user?: string, component?: string) => 
    logMessage(LogLevel.PERF, message, context, user, component),
  
  // Get recent logs for debugging
  getRecentLogs: () => [...recentLogs],
  
  // Clear logs (useful for testing)
  clearLogs: () => {
    recentLogs = [];
  },
  
  // Measure function execution time
  measure: async <T>(name: string, fn: () => Promise<T> | T): Promise<T> => {
    const startTime = performance.now();
    try {
      const result = await fn();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (PERFORMANCE_CONFIG.enablePerformanceMetrics) {
        logMessage(
          LogLevel.PERF, 
          `Function "${name}" execution time: ${duration.toFixed(2)}ms`,
          { duration, function: name }
        );
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      logMessage(
        LogLevel.ERROR,
        `Error in function "${name}" after ${duration.toFixed(2)}ms`,
        { duration, function: name, error }
      );
      
      throw error;
    }
  }
};

// Add window error handler
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logger.error(
      `Uncaught error: ${event.message}`,
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      }
    );
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    logger.error(
      `Unhandled promise rejection: ${event.reason}`,
      {
        reason: event.reason,
        stack: event.reason?.stack
      }
    );
  });
}
