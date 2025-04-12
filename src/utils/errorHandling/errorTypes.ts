/**
 * Centralized Error Types
 * Provides consistent error types across the application
 */

// Application error type
export enum ErrorType {
  // API related errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  
  // Data related errors
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  DATA_INVALID = 'DATA_INVALID',
  DATA_STALE = 'DATA_STALE',
  
  // UI related errors
  UI_ERROR = 'UI_ERROR',
  RENDERING_ERROR = 'RENDERING_ERROR',
  
  // Other errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INITIALIZATION_ERROR = 'INITIALIZATION_ERROR'
}

// Structured application error
export interface AppError {
  type: ErrorType;
  message: string;
  code?: string | number;
  originalError?: unknown;
  context?: Record<string, unknown>;
  timestamp: number;
  isCritical: boolean;
}

// Error with HTTP status
export interface HttpError extends AppError {
  status: number;
  url?: string;
  method?: string;
}

// Error with field validation details
export interface ValidationError extends AppError {
  fieldErrors?: Record<string, string[]>;
}

// Factory function to create application errors
export function createAppError(
  type: ErrorType,
  message: string,
  options?: {
    code?: string | number;
    originalError?: unknown;
    context?: Record<string, unknown>;
    isCritical?: boolean;
  }
): AppError {
  return {
    type,
    message,
    code: options?.code,
    originalError: options?.originalError,
    context: options?.context,
    timestamp: Date.now(),
    isCritical: options?.isCritical ?? false
  };
}
