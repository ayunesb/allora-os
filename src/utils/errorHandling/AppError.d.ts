import { AppError } from "./errorTypes";
/**
 * Creates an application error with standardized structure
 */
export declare class ApplicationError implements AppError {
  message: string;
  code?: string;
  data?: any;
  timestamp: Date;
  source?: string;
  isCritical: boolean;
  constructor({
    message,
    code,
    data,
    source,
    isCritical,
  }: {
    message: string;
    code?: string;
    data?: any;
    source?: string;
    isCritical?: boolean;
  });
  toString(): string;
}
/**
 * Factory function to create an AppError instance
 */
export declare function createAppError(
  message: string,
  code?: string,
  data?: any,
  source?: string,
  isCritical?: boolean,
): AppError;
