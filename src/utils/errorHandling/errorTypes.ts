
export interface AppError extends Error {
  isCritical?: boolean;
  code?: string;
}

// Add a function to convert any error to AppError
export function toAppError(error: unknown, isCritical: boolean = false): AppError {
  if (error instanceof Error) {
    const appError = error as AppError;
    appError.isCritical = isCritical;
    return appError;
  } else {
    const appError = new Error(String(error)) as AppError;
    appError.isCritical = isCritical;
    return appError;
  }
}
