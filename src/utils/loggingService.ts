// Base logger implementation

type LogLevel = "debug" | "info" | "warn" | "error";

interface LoggerOptions {
  minLevel: LogLevel;
  includeTimestamps: boolean;
  namespace?: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const DEFAULT_OPTIONS: LoggerOptions = {
  minLevel: process.env.NODE_ENV === "development" ? "debug" : "info",
  includeTimestamps: true,
};

class Logger {
  [x: string]: any;
  private options: LoggerOptions;

  constructor(options: Partial<LoggerOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    ...args: any[]
  ): string {
    let formattedMessage = message;

    // Add namespace if configured
    if (this.options.namespace) {
      formattedMessage = `[${this.options.namespace}] ${formattedMessage}`;
    }

    // Add timestamp if configured
    if (this.options.includeTimestamps) {
      const timestamp = new Date().toISOString();
      formattedMessage = `${timestamp} ${formattedMessage}`;
    }

    return formattedMessage;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.options.minLevel];
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog("debug")) {
      console.debug(this.formatMessage("debug", message), ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", message), ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog("error")) {
      console.error(this.formatMessage("error", message), ...args);
    }
  }

  createSubLogger(namespace: string): Logger {
    return new Logger({
      ...this.options,
      namespace: this.options.namespace
        ? `${this.options.namespace}:${namespace}`
        : namespace,
    });
  }

  setMinLevel(level: LogLevel): void {
    this.options.minLevel = level;
  }
}

// Export singleton instance
export const logger = new Logger();
