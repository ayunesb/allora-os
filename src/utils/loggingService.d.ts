type LogLevel = "debug" | "info" | "warn" | "error";
interface LoggerOptions {
  minLevel: LogLevel;
  includeTimestamps: boolean;
  namespace?: string;
}
declare class Logger {
  private options;
  constructor(options?: Partial<LoggerOptions>);
  private formatMessage;
  private shouldLog;
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  createSubLogger(namespace: string): Logger;
  setMinLevel(level: LogLevel): void;
}
export declare const logger: Logger;
export {};
