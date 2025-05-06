"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToBottom = scrollToBottom;
exports.isNearBottom = isNearBottom;
exports.toggleProductionMode = toggleProductionMode;
/**
 * Smoothly scrolls an element to the bottom
 */
function scrollToBottom(element) {
  element.scrollIntoView({ behavior: "smooth", block: "end" });
}
/**
 * Checks if an element is near the bottom
 */
function isNearBottom(element, threshold) {
  if (threshold === void 0) {
    threshold = 50;
  }
  return (
    element.scrollHeight - element.scrollTop - element.clientHeight < threshold
  );
}
/**
 * Force toggles production mode in the local environment
 * This is used for testing and development purposes only
 */
function toggleProductionMode(force) {
  if (force === void 0) {
    force = true;
  }
  if (force) {
    localStorage.setItem("allora_force_production_mode", "true");
    // Reload the page to apply changes
    window.location.reload();
  } else {
    localStorage.removeItem("allora_force_production_mode");
    // Reload the page to apply changes
    window.location.reload();
  }
}
