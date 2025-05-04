import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
import { ErrorType } from "./errorTypes";
export function handleError(error, options = {}) {
    const { showToast = true, logToConsole = true, logToService = true, context = {}, friendlyMessage = "An error occurred. Please try again.", type } = options;
    // Extract error message
    const errorMessage = error?.message || String(error);
    const errorDetails = {
        message: errorMessage,
        stack: error?.stack,
        type: type || (error?.type || ErrorType.UNEXPECTED_ERROR),
        ...context
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
            description: errorMessage.length > 100
                ? errorMessage.substring(0, 100) + "..."
                : errorMessage
        });
    }
}
