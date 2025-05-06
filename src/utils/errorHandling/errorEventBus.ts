import { AppError } from "./errorTypes";

type ErrorHandler = (error: AppError) => void;

/**
 * Simple event bus for error events to enable communication
 * between different parts of the application about errors
 */
class ErrorEventBus {
  private handlers: ErrorHandler[] = [];

  /**
   * Subscribe to error events
   */
  subscribe(handler: ErrorHandler): void {
    this.handlers.push(handler);
  }

  /**
   * Unsubscribe from error events
   */
  unsubscribe(handler: ErrorHandler): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  /**
   * Publish an error event to all subscribers
   */
  publish(error: AppError): void {
    this.handlers.forEach((handler) => {
      try {
        handler(error);
      } catch (e) {
        console.error("Error in error handler:", e);
      }
    });
  }
}

// Create a singleton instance
export const errorEventBus = new ErrorEventBus();
