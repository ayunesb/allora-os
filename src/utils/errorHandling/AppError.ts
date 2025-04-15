
import { AppError, ErrorType } from './errorTypes';

/**
 * Creates an application error with standardized structure
 */
export class ApplicationError implements AppError {
  message: string;
  code?: string;
  data?: any;
  timestamp: Date;
  source?: string;
  isCritical: boolean;

  constructor({
    message,
    code = ErrorType.UNKNOWN,
    data,
    source,
    isCritical = false
  }: {
    message: string;
    code?: string;
    data?: any;
    source?: string;
    isCritical?: boolean;
  }) {
    this.message = message;
    this.code = code;
    this.data = data;
    this.timestamp = new Date();
    this.source = source;
    this.isCritical = isCritical;
  }

  toString(): string {
    return `[${this.code}] ${this.message}`;
  }
}

/**
 * Factory function to create an AppError instance
 */
export function createAppError(
  message: string,
  code: string = ErrorType.UNKNOWN,
  data?: any,
  source?: string,
  isCritical: boolean = false
): AppError {
  return new ApplicationError({
    message,
    code,
    data,
    source,
    isCritical
  });
}
