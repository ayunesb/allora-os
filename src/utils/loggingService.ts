
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class LoggingService {
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;
  private loggingEnabled: boolean;
  private remoteLoggingEnabled: boolean;
  private remoteLoggingEndpoint?: string;

  constructor() {
    this.loggingEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_LOGGING === 'true';
    this.remoteLoggingEnabled = import.meta.env.VITE_ENABLE_REMOTE_LOGGING === 'true';
    this.remoteLoggingEndpoint = import.meta.env.VITE_LOGGING_ENDPOINT;
  }

  private log(level: LogLevel, message: string, data?: any) {
    if (!this.loggingEnabled && level !== 'error') return;

    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      data
    };

    // Add to in-memory logs
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // Remove oldest log if we exceed max
    }

    // Console output
    const consoleMethod = level === 'debug' ? 'log' : level;
    if (data) {
      console[consoleMethod as keyof Console](`[${timestamp}] [${level.toUpperCase()}] ${message}`, data);
    } else {
      console[consoleMethod as keyof Console](`[${timestamp}] [${level.toUpperCase()}] ${message}`);
    }

    // Send to remote logging service if enabled
    if (this.remoteLoggingEnabled && this.remoteLoggingEndpoint) {
      this.sendLogToRemote(logEntry);
    }
  }

  private async sendLogToRemote(logEntry: LogEntry) {
    if (!this.remoteLoggingEndpoint) return;

    try {
      await fetch(this.remoteLoggingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logEntry),
        keepalive: true // Ensure logs are sent even when page is unloading
      });
    } catch (err) {
      // Silent fail for logging errors to avoid infinite loops
      console.error('Failed to send log to remote endpoint', err);
    }
  }

  public debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  public info(message: string, data?: any) {
    this.log('info', message, data);
  }

  public warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  public error(message: string, error?: any) {
    this.log('error', message, error);
    
    // Additional error handling like reporting to monitoring service
    if (import.meta.env.PROD && error instanceof Error) {
      // Report to error monitoring in production
      this.reportErrorToMonitoring(message, error);
    }
  }

  private reportErrorToMonitoring(message: string, error: Error) {
    // This would integrate with services like Sentry, LogRocket, etc.
    // Implementation depends on which service is being used
    const monitoringEndpoint = import.meta.env.VITE_ERROR_MONITORING_ENDPOINT;
    if (!monitoringEndpoint) return;

    try {
      fetch(monitoringEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          name: error.name,
          stack: error.stack,
          timestamp: new Date().toISOString()
        }),
        keepalive: true
      });
    } catch (err) {
      // Silent fail to avoid loops
      console.error('Failed to report error to monitoring', err);
    }
  }

  public getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  public clearLogs() {
    this.logs = [];
  }
}

export const logger = new LoggingService();
