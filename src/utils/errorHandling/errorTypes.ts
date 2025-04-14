
export enum ErrorType {
  NETWORK_ERROR = "NETWORK_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  API_ERROR = "API_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR" // Add the missing UNKNOWN_ERROR type
}

export interface ApiErrorResponse {
  status: number;
  code?: string;
  message: string;
  details?: any;
}

export function mapHttpStatusToErrorType(status: number): ErrorType {
  if (status >= 500) return ErrorType.API_ERROR;
  if (status === 401) return ErrorType.AUTHENTICATION_ERROR;
  if (status === 403) return ErrorType.AUTHORIZATION_ERROR;
  if (status === 400 || status === 422) return ErrorType.VALIDATION_ERROR;
  if (status === 404) return ErrorType.API_ERROR;
  return ErrorType.UNEXPECTED_ERROR;
}

// Add the AppError class
export class AppError extends Error {
  type: ErrorType;
  statusCode?: number;
  details?: any;
  
  constructor(
    message: string, 
    type: ErrorType = ErrorType.UNKNOWN_ERROR, 
    statusCode?: number,
    details?: any
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
  }
}
