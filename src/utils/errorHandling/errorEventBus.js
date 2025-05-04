/**
 * Simple event bus for error events to enable communication
 * between different parts of the application about errors
 */
class ErrorEventBus {
    handlers = [];
    /**
     * Subscribe to error events
     */
    subscribe(handler) {
        this.handlers.push(handler);
    }
    /**
     * Unsubscribe from error events
     */
    unsubscribe(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    /**
     * Publish an error event to all subscribers
     */
    publish(error) {
        this.handlers.forEach(handler => {
            try {
                handler(error);
            }
            catch (e) {
                console.error('Error in error handler:', e);
            }
        });
    }
}
// Create a singleton instance
export const errorEventBus = new ErrorEventBus();
