import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  statusCode: number;
  errorMessage: string;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const errorMessage: string = (err as any)?.errorMessage ?? 'Unknown error';

  const errorResponse: ErrorResponse = {
    statusCode,
    errorMessage,
  };

  res.status(statusCode).json(errorResponse);
};