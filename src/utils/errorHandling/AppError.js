import { ErrorType } from './errorTypes';
/**
 * Creates an application error with standardized structure
 */
export class ApplicationError {
    message;
    code;
    data;
    timestamp;
    source;
    isCritical;
    constructor({ message, code = ErrorType.UNKNOWN, data, source, isCritical = false }) {
        this.message = message;
        this.code = code;
        this.data = data;
        this.timestamp = new Date();
        this.source = source;
        this.isCritical = isCritical;
    }
    toString() {
        return `[${this.code}] ${this.message}`;
    }
}
/**
 * Factory function to create an AppError instance
 */
export function createAppError(message, code = ErrorType.UNKNOWN, data, source, isCritical = false) {
    return new ApplicationError({
        message,
        code,
        data,
        source,
        isCritical
    });
}
