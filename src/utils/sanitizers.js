"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInput = sanitizeInput;
exports.sanitizeHtml = sanitizeHtml;
exports.isValidEmail = isValidEmail;
exports.normalizeInput = normalizeInput;
exports.parseNumericInput = parseNumericInput;
exports.sanitizeFormData = sanitizeFormData;
exports.sanitizeUrl = sanitizeUrl;
exports.generateNonce = generateNonce;
exports.isSecurePassword = isSecurePassword;
exports.getCSPDirectives = getCSPDirectives;
/**
 * Sanitizes user input to prevent XSS attacks
 * @param input The user input to sanitize
 * @returns Sanitized string
 */
function sanitizeInput(input) {
  if (!input) return "";
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/`/g, "&#x60;")
    .replace(/{/g, "&#x7B;")
    .replace(/}/g, "&#x7D;")
    .replace(/eval\(/gi, "blocked(")
    .replace(/javascript:/gi, "blocked:");
}
/**
 * Sanitizes HTML content for safe display
 * @param html HTML content to sanitize
 * @returns Sanitized HTML string
 */
function sanitizeHtml(html) {
  if (!html) return "";
  // In a production app, you should use a library like DOMPurify
  // This is a simple implementation that handles common attack vectors
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/on\w+='[^']*'/g, "")
    .replace(/on\w+=\S+/g, "")
    .replace(/onerror/gi, "data-blocked")
    .replace(/onload/gi, "data-blocked")
    .replace(/onclick/gi, "data-blocked");
}
/**
 * Validates an email address format
 * @param email Email to validate
 * @returns Boolean indicating if the email is valid
 */
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
/**
 * Trims and normalizes whitespace in user input
 * @param input User input to normalize
 * @returns Normalized string
 */
function normalizeInput(input) {
  if (!input) return "";
  return input.trim().replace(/\s+/g, " ");
}
/**
 * Safely parses a numeric input
 * @param input Numeric input as string
 * @param defaultValue Default value if parsing fails
 * @returns Parsed number or default value
 */
function parseNumericInput(input, defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = 0;
  }
  var parsed = parseFloat(input);
  return isNaN(parsed) ? defaultValue : parsed;
}
/**
 * Helper function to safely sanitize form data
 * @param formData Object containing form data to sanitize
 * @returns Sanitized form data object
 */
function sanitizeFormData(formData) {
  var sanitized = __assign({}, formData);
  Object.keys(sanitized).forEach(function (key) {
    var value = sanitized[key];
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    }
  });
  return sanitized;
}
/**
 * Sanitizes a URL to prevent open redirect vulnerabilities
 * @param url URL to sanitize
 * @param allowedDomains Array of allowed domains (optional)
 * @returns Sanitized URL or empty string if invalid
 */
function sanitizeUrl(url, allowedDomains) {
  if (!url) return "";
  try {
    var urlObj_1 = new URL(url);
    // If allowedDomains is provided, check if the URL's domain is in the list
    if (allowedDomains && allowedDomains.length > 0) {
      if (
        !allowedDomains.some(function (domain) {
          return (
            urlObj_1.hostname === domain ||
            urlObj_1.hostname.endsWith(".".concat(domain))
          );
        })
      ) {
        return "";
      }
    }
    // Only allow http and https protocols
    if (urlObj_1.protocol !== "http:" && urlObj_1.protocol !== "https:") {
      return "";
    }
    return url;
  } catch (e) {
    // If the URL is invalid, return an empty string
    return "";
  }
}
/**
 * Generates a nonce for CSP headers
 * @returns Random nonce string
 */
function generateNonce() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
/**
 * Checks if a password meets security requirements
 * @param password Password to check
 * @returns Boolean indicating if password is secure
 */
function isSecurePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
}
/**
 * Content Security Policy helper
 * @returns CSP directives as a string
 */
function getCSPDirectives() {
  return "\n    default-src 'self';\n    script-src 'self' https://cdn.gpteng.co https://supabase.com;\n    style-src 'self' 'unsafe-inline';\n    img-src 'self' data: https://*;\n    connect-src 'self' https://*.supabase.co wss://*.supabase.co;\n    font-src 'self';\n    object-src 'none';\n    frame-src 'self';\n    base-uri 'self';\n    form-action 'self';\n  "
    .replace(/\s+/g, " ")
    .trim();
}
