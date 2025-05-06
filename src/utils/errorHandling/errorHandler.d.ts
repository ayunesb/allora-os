import { ErrorType } from "./errorTypes";
export interface ErrorHandlingOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  logToService?: boolean;
  context?: Record<string, any>;
  friendlyMessage?: string;
  type?: ErrorType;
}
export declare function handleError(
  error: any,
  options?: ErrorHandlingOptions,
): void;
