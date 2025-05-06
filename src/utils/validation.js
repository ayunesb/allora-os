"use strict";
/**
 * Common validation utilities
 *
 * This module provides reusable validation functions that can be used
 * across different parts of the application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = isValidEmail;
exports.isNonEmptyString = isNonEmptyString;
exports.isValidUuid = isValidUuid;
exports.validateAll = validateAll;
exports.isValidUrl = isValidUrl;
exports.isValidIsoDate = isValidIsoDate;
exports.isPositiveNumber = isPositiveNumber;
exports.isWithinRange = isWithinRange;
exports.isValidPhoneNumber = isValidPhoneNumber;
exports.isStrongPassword = isStrongPassword;
/**
 * Validates if an email is in the correct format
 * @example
 * // Check if email is valid
 * if (!isValidEmail(userEmail)) {
 *   return errorResponse("Invalid email format");
 * }
 *
 * @param email Email to validate
 * @returns Boolean indicating if the email is valid
 */
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  // Basic email validation regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
/**
 * Validates if a string is not empty or undefined
 * @example
 * // Check if name is provided
 * if (!isNonEmptyString(name)) {
 *   return errorResponse("Name is required");
 * }
 *
 * @param value String to validate
 * @returns Boolean indicating if the string is valid
 */
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
/**
 * Validates if a value is a valid UUID
 * @example
 * // Check if ID is a valid UUID
 * if (!isValidUuid(userId)) {
 *   return errorResponse("Invalid user ID format");
 * }
 *
 * @param value Value to validate
 * @returns Boolean indicating if the value is a valid UUID
 */
function isValidUuid(value) {
  if (typeof value !== "string") return false;
  var uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}
/**
 * Validates that a value meets all provided validation functions
 * @example
 * // Validate multiple conditions
 * if (!validateAll(
 *   userId,
 *   [isNonEmptyString, isValidUuid],
 *   "Invalid user ID"
 * )) {
 *   return errorResponse("Invalid user ID format");
 * }
 *
 * @param value Value to validate
 * @param validationFns Array of validation functions to apply
 * @returns Boolean indicating if the value passes all validations
 */
function validateAll(value, validationFns) {
  return validationFns.every(function (fn) {
    return fn(value);
  });
}
/**
 * Validates if a value is a valid URL
 * @param url URL to validate
 * @returns Boolean indicating if the URL is valid
 */
function isValidUrl(url) {
  if (typeof url !== "string") return false;
  try {
    new URL(url);
    return true;
  } catch (_a) {
    return false;
  }
}
/**
 * Validates if a date string is in ISO format
 * @param date Date string to validate
 * @returns Boolean indicating if the date string is valid
 */
function isValidIsoDate(date) {
  if (typeof date !== "string") return false;
  var isoDateRegex =
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/;
  return isoDateRegex.test(date) && !isNaN(Date.parse(date));
}
/**
 * Validates if a value is a positive number
 * @param value Value to validate
 * @returns Boolean indicating if the value is a positive number
 */
function isPositiveNumber(value) {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  return typeof value === "number" && !isNaN(value) && value > 0;
}
/**
 * Validates if a value is within a specified range
 * @param value Value to validate
 * @param min Minimum allowed value
 * @param max Maximum allowed value
 * @returns Boolean indicating if the value is within range
 */
function isWithinRange(value, min, max) {
  return value >= min && value <= max;
}
/**
 * Validates if a value is a valid phone number
 * Uses a basic regex that accepts common formats
 * @param phone Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
function isValidPhoneNumber(phone) {
  if (typeof phone !== "string") return false;
  // This is a simple regex for demonstration - production systems
  // should use a more robust solution like libphonenumber-js
  var phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}
/**
 * Validates a strong password
 * @param password Password to validate
 * @returns Boolean indicating if the password meets security requirements
 */
function isStrongPassword(password) {
  if (typeof password !== "string" || password.length < 8) return false;
  // Check for at least one uppercase letter, one lowercase letter,
  // one number, and one special character
  var hasUppercase = /[A-Z]/.test(password);
  var hasLowercase = /[a-z]/.test(password);
  var hasNumber = /[0-9]/.test(password);
  var hasSpecial = /[^A-Za-z0-9]/.test(password);
  return hasUppercase && hasLowercase && hasNumber && hasSpecial;
}
