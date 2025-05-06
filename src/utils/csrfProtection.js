"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCsrfToFormData =
  exports.clearCsrfToken =
  exports.getCsrfToken =
  exports.validateCsrfToken =
  exports.generateCsrfToken =
    void 0;
/**
 * Generate a CSRF token and store it in localStorage
 */
var generateCsrfToken = function () {
  var token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  localStorage.setItem("csrf_token", token);
  return token;
};
exports.generateCsrfToken = generateCsrfToken;
/**
 * Validate CSRF token
 */
var validateCsrfToken = function () {
  var token = localStorage.getItem("csrf_token");
  // In a real implementation, you would validate against a token from the server
  // This is a simplified version for demo purposes
  return !!token;
};
exports.validateCsrfToken = validateCsrfToken;
/**
 * Get the current CSRF token
 */
var getCsrfToken = function () {
  return localStorage.getItem("csrf_token");
};
exports.getCsrfToken = getCsrfToken;
/**
 * Clear the CSRF token
 */
var clearCsrfToken = function () {
  localStorage.removeItem("csrf_token");
};
exports.clearCsrfToken = clearCsrfToken;
/**
 * Add CSRF token to form data
 */
var addCsrfToFormData = function (formData) {
  var token = (0, exports.getCsrfToken)();
  if (token) {
    formData.append("csrf_token", token);
  }
  return formData;
};
exports.addCsrfToFormData = addCsrfToFormData;
