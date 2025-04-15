
export interface AppError extends Error {
  isCritical?: boolean;
  code?: string;
}
