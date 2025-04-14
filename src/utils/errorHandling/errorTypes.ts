
/**
 * Standardized error types for application-wide use
 */

export enum ErrorType {
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  BUSINESS_LOGIC_ERROR = 'BUSINESS_LOGIC_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  API_ERROR = 'API_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  INTEGRATION_ERROR = 'INTEGRATION_ERROR'
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string | number;
  timestamp: number;
  originalError?: unknown;
  context?: Record<string, unknown>;
  isCritical?: boolean;
}

// Error factory functions for consistent error creation
export function createAuthenticationError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.AUTHENTICATION_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: true
  };
}

export function createAuthorizationError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.AUTHORIZATION_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: true
  };
}

export function createValidationError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.VALIDATION_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: false
  };
}

export function createNetworkError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.NETWORK_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: true
  };
}

export function createTimeoutError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.TIMEOUT_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: false
  };
}

export function createServerError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.SERVER_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: true
  };
}

export function createNotFoundError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.NOT_FOUND_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: false
  };
}

export function createApiError(message: string, code?: string | number, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.API_ERROR,
    message,
    code,
    timestamp: Date.now(),
    context,
    isCritical: false
  };
}

export function createDatabaseError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.DATABASE_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: true
  };
}

export function createRateLimitError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.RATE_LIMIT_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: false
  };
}

export function createIntegrationError(message: string, context?: Record<string, unknown>): AppError {
  return {
    type: ErrorType.INTEGRATION_ERROR,
    message,
    timestamp: Date.now(),
    context,
    isCritical: true
  };
}

export function createUnknownError(message: string, error?: unknown): AppError {
  return {
    type: ErrorType.UNKNOWN_ERROR,
    message,
    timestamp: Date.now(),
    originalError: error,
    isCritical: true
  };
}
