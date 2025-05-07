import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
export function handleError(error, options = {}) {
    const { showToast = true, logToConsole = true, logToService = true, context = {}, friendlyMessage = "An error occurred. Please try again.", type, } = options;
    // Extract error message
    const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || String(error);
    const errorType = (error === null || error === void 0 ? void 0 : error.type) || "UNEXPECTED_ERROR";
    const errorDetails = Object.assign({ message: errorMessage, stack: error === null || error === void 0 ? void 0 : error.stack, type: type || errorType }, context);
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
                : errorMessage,
        });
    }
}
