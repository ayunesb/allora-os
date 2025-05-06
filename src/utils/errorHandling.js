"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
function handleError(err) {
  var message = err instanceof Error ? err.message : "Unknown error";
  var stack = err instanceof Error ? err.stack : "No stack trace available";
  console.error("Error:", message);
  console.error("Stack trace:", stack);
}
