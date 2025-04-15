
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  CONFLICT = 'CONFLICT_ERROR',
  SERVER = 'SERVER_ERROR',
  NETWORK = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC_ERROR',
  INTEGRATION = 'INTEGRATION_ERROR',
  DATABASE = 'DATABASE_ERROR',
  API = 'API_ERROR'
}

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  type?: ErrorType;
  context?: Record<string, unknown>;
  originalError?: Error;
}

export class ValidationError extends Error implements AppError {
  statusCode = 400;
  type = ErrorType.VALIDATION;
  context?: Record<string, unknown>;
  originalError?: Error;
  
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(message);
    this.name = 'ValidationError';
    this.context = context;
    this.originalError = originalError;
  }
}

export class AuthenticationError extends Error implements AppError {
  statusCode = 401;
  type = ErrorType.AUTHENTICATION;
  context?: Record<string, unknown>;
  originalError?: Error;
  
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(message);
    this.name = 'AuthenticationError';
    this.context = context;
    this.originalError = originalError;
  }
}

export class AuthorizationError extends Error implements AppError {
  statusCode = 403;
  type = ErrorType.AUTHORIZATION;
  context?: Record<string, unknown>;
  originalError?: Error;
  
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(message);
    this.name = 'AuthorizationError';
    this.context = context;
    this.originalError = originalError;
  }
}

export class NotFoundError extends Error implements AppError {
  statusCode = 404;
  type = ErrorType.NOT_FOUND;
  context?: Record<string, unknown>;
  originalError?: Error;
  
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(message);
    this.name = 'NotFoundError';
    this.context = context;
    this.originalError = originalError;
  }
}

export class ServerError extends Error implements AppError {
  statusCode = 500;
  type = ErrorType.SERVER;
  context?: Record<string, unknown>;
  originalError?: Error;
  
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(message);
    this.name = 'ServerError';
    this.context = context;
    this.originalError = originalError;
  }
}
