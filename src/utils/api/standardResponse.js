var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Creates a success response with the given data and message
 */
export function successResponse(data, message = "Operation successful") {
    return {
        success: true,
        data,
        message,
    };
}
/**
 * Creates an error response with the given message and optional error details
 */
export function errorResponse(message, error, errorCode) {
    // Simpler error logging without depending on a logger
    if (error) {
        console.error(`API Error: ${message}`, { error, errorCode });
    }
    return {
        success: false,
        data: null,
        message,
        error,
        errorCode,
    };
}
/**
 * Safely executes a function and returns a standardized response
 */
export function safeExecute(fn_1) {
    return __awaiter(this, arguments, void 0, function* (fn, successMessage = "Operation successful", errorMessage = "Operation failed") {
        try {
            const result = yield fn();
            return successResponse(result, successMessage);
        }
        catch (error) {
            const errorDetail = error instanceof Error ? error.message : "Unknown error";
            return errorResponse(errorMessage, errorDetail);
        }
    });
}
