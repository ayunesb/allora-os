"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorEventBus = void 0;
/**
 * Simple event bus for error events to enable communication
 * between different parts of the application about errors
 */
var ErrorEventBus = /** @class */ (function () {
  function ErrorEventBus() {
    this.handlers = [];
  }
  /**
   * Subscribe to error events
   */
  ErrorEventBus.prototype.subscribe = function (handler) {
    this.handlers.push(handler);
  };
  /**
   * Unsubscribe from error events
   */
  ErrorEventBus.prototype.unsubscribe = function (handler) {
    this.handlers = this.handlers.filter(function (h) {
      return h !== handler;
    });
  };
  /**
   * Publish an error event to all subscribers
   */
  ErrorEventBus.prototype.publish = function (error) {
    this.handlers.forEach(function (handler) {
      try {
        handler(error);
      } catch (e) {
        console.error("Error in error handler:", e);
      }
    });
  };
  return ErrorEventBus;
})();
// Create a singleton instance
exports.errorEventBus = new ErrorEventBus();
