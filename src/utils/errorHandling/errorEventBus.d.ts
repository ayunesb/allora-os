import { AppError } from './errorTypes';
type ErrorHandler = (error: AppError) => void;
/**
 * Simple event bus for error events to enable communication
 * between different parts of the application about errors
 */
declare class ErrorEventBus {
    private handlers;
    /**
     * Subscribe to error events
     */
    subscribe(handler: ErrorHandler): void;
    /**
     * Unsubscribe from error events
     */
    unsubscribe(handler: ErrorHandler): void;
    /**
     * Publish an error event to all subscribers
     */
    publish(error: AppError): void;
}
export declare const errorEventBus: ErrorEventBus;
export {};
