
import { FEATURES } from '@/config/appConfig';

// Log levels enum
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Interface for structured log entries
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  user?: string;
  // Add more structured fields as needed
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
    }
  }
};

// In-memory store for recent logs (useful for development and debugging)
let recentLogs: LogEntry[] = [];
const MAX_LOGS = 100;

// Core logging function
const logMessage = (
  level: LogLevel,
  message: string,
  context?: Record<string, any>,
  user?: string
) => {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    user
  };

  // Add to in-memory store
  recentLogs.unshift(entry);
  if (recentLogs.length > MAX_LOGS) {
    recentLogs.pop();
  }

  // Send to external service if we're in production
  if (process.env.NODE_ENV === 'production' || FEATURES.enableDetailedLogging) {
    sendToExternalService(entry);
  }

  return entry;
};

// Exported logger functions
export const logger = {
  debug: (message: string, context?: Record<string, any>, user?: string) => 
    logMessage(LogLevel.DEBUG, message, context, user),
    
  info: (message: string, context?: Record<string, any>, user?: string) => 
    logMessage(LogLevel.INFO, message, context, user),
    
  warn: (message: string, context?: Record<string, any>, user?: string) => 
    logMessage(LogLevel.WARN, message, context, user),
    
  error: (message: string, context?: Record<string, any>, user?: string) => 
    logMessage(LogLevel.ERROR, message, context, user),
    
  critical: (message: string, context?: Record<string, any>, user?: string) => 
    logMessage(LogLevel.CRITICAL, message, context, user),
    
  // Get recent logs for debugging
  getRecentLogs: () => [...recentLogs],
  
  // Clear logs (useful for testing)
  clearLogs: () => {
    recentLogs = [];
  }
};
