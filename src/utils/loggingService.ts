
/**
 * Centralized logging service for the application
 */

interface LogContext {
  component?: string;
  user?: string;
  [key: string]: any;
}

class Logger {
  /**
   * Log an informational message
   */
  info(message: string, context: LogContext = {}) {
    this.log('INFO', message, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context: LogContext = {}) {
    this.log('WARN', message, context);
  }

  /**
   * Log an error message
   */
  error(message: string, error: any = null, context: LogContext = {}) {
    const errorContext = {
      ...context,
      errorMessage: error?.message || String(error),
      stack: error?.stack,
    };
    
    this.log('ERROR', message, errorContext);
  }

  /**
   * Log a debug message
   */
  debug(message: string, context: LogContext = {}) {
    // Only log in development environment
    if (process.env.NODE_ENV !== 'production') {
      this.log('DEBUG', message, context);
    }
  }

  /**
   * Start a timer to measure performance
   * Returns a function that, when called, stops the timer and logs the result
   */
  time(label: string, context: LogContext = {}): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.info(`Timer [${label}] completed in ${duration.toFixed(2)}ms`, {
        ...context,
        duration,
        timerLabel: label
      });
    };
  }

  /**
   * Internal logging method
   */
  private log(level: string, message: string, context: LogContext = {}) {
    const timestamp = new Date().toISOString();
    const contextString = Object.keys(context).length ? JSON.stringify(context) : '';
    
    // For now, just use console, but this could be extended to use a logging service
    switch (level) {
      case 'ERROR':
        console.error(`[${timestamp}] ${level}: ${message}`, contextString);
        break;
      case 'WARN':
        console.warn(`[${timestamp}] ${level}: ${message}`, contextString);
        break;
      case 'DEBUG':
        console.debug(`[${timestamp}] ${level}: ${message}`, contextString);
        break;
      default:
        console.log(`[${timestamp}] ${level}: ${message}`, contextString);
    }
    
    // In the future, we could send logs to a service like Logtail, DataDog, etc.
  }
}

export const logger = new Logger();
