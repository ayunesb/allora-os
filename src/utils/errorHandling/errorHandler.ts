import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
import { ErrorType } from "./errorTypes";

export interface ErrorHandlingOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  logToService?: boolean;
  context?: Record<string, any>;
  friendlyMessage?: string;
  type?: ErrorType; // Add support for type property
}

export function handleError(
  error: any,
  options: ErrorHandlingOptions = {},
): void {
  const {
    showToast = true,
    logToConsole = true,
    logToService = true,
    context = {},
    friendlyMessage = "An error occurred. Please try again.",
    type,
  } = options;

  // Extract error message
  const errorMessage = error?.message || String(error);
  const errorType =
    (error?.type as keyof typeof ErrorType) || "UNEXPECTED_ERROR";
  const errorDetails = {
    message: errorMessage,
    stack: error?.stack,
    type: type || errorType,
    ...context,
  };

  // Log to console
  if (logToConsole) {
    console.error("Error:", errorMessage, errorDetails);
  }

  // Log to service
  if (logToService) {
    logger.error(errorMessage, errorDetails);
  }

  // Show toast notification
  if (showToast) {
    toast.error(friendlyMessage, {
      description:
        errorMessage.length > 100
          ? errorMessage.substring(0, 100) + "..."
          : errorMessage,
    });
  }
}
